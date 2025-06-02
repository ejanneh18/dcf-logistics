"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FileText, DollarSign, Clock, CheckCircle, Search, Mail, Phone, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc/client'
import { formatDistanceToNow } from 'date-fns'
import { QuoteRequestStatus } from '@prisma/client'

interface QuoteRequest {
  id: string
  fullName: string
  email: string
  phone: string
  company?: string | null
  serviceType: string
  origin: string
  destination: string
  cargoType: string
  cargoDetails: string
  weight?: string | null
  dimensions?: string | null
  quotedAmount?: number | null
  currency: string
  status: QuoteRequestStatus
  validUntil?: Date | null
  createdAt: Date
  respondedAt?: Date | null
}

export default function QuotesManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<QuoteRequestStatus | 'all'>('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [quoteAmount, setQuoteAmount] = useState('')
  const [quoteNotes, setQuoteNotes] = useState('')
  const [page, setPage] = useState(1)

  // TRPC queries
  const { data: quotesData, isLoading, refetch } = trpc.quotes.getAll.useQuery({
    page,
    limit: 10,
    search: searchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    serviceType: serviceFilter !== 'all' ? serviceFilter : undefined,
  })

  const { data: stats } = trpc.quotes.getStats.useQuery()

  // TRPC mutations
  const respondToQuoteMutation = trpc.quotes.respondToQuote.useMutation({
    onSuccess: () => {
      toast.success('Quote sent successfully')
      setQuoteAmount('')
      setQuoteNotes('')
      setSelectedQuote(null)
      refetch()
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send quote')
    }
  })

  const updateQuoteMutation = trpc.quotes.update.useMutation({
    onSuccess: () => {
      toast.success('Quote status updated successfully')
      refetch()
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update quote status')
    }
  })

  const quotes = quotesData?.quotes || []

  const updateQuoteStatus = async (quoteId: string, newStatus: QuoteRequestStatus) => {
    updateQuoteMutation.mutate({
      id: quoteId,
      status: newStatus,
    })
  }

  const submitQuote = async () => {
    if (!selectedQuote || !quoteAmount) return

    const amount = parseFloat(quoteAmount)
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid quote amount')
      return
    }

    respondToQuoteMutation.mutate({
      id: selectedQuote.id,
      quotedAmount: amount,
      notes: quoteNotes || undefined,
      validDays: 30,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'QUOTED': return 'bg-blue-100 text-blue-800'
      case 'ACCEPTED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      case 'EXPIRED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quote Management</h1>
          <p className="text-gray-600">Manage and respond to quote requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalQuotes || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats?.pendingQuotes || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quoted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats?.quotedQuotes || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.acceptedQuotes || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${(stats?.totalValue || 0).toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quotes List */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Requests</CardTitle>
          <CardDescription>View and manage customer quote requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="QUOTED">Quoted</SelectItem>
                <SelectItem value="ACCEPTED">Accepted</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="Air Freight">Air Freight</SelectItem>
                <SelectItem value="Ground Transportation">Ground Transportation</SelectItem>
                <SelectItem value="Sea Freight">Sea Freight</SelectItem>
                <SelectItem value="Express Delivery">Express Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading quotes...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-mono text-sm">{quote.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{quote.fullName}</div>
                        <div className="text-sm text-gray-500">{quote.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{quote.serviceType}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{quote.origin}</div>
                        <div className="text-gray-500">→ {quote.destination}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {quote.quotedAmount ? (
                        <div className="font-medium">
                          ${quote.quotedAmount.toLocaleString()}
                        </div>
                      ) : (
                        <span className="text-gray-400">Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(quote.status)}>
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(quote.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedQuote(quote)}>
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Quote Request - {quote.id}</DialogTitle>
                            <DialogDescription>
                              Submitted on {new Date(quote.createdAt).toLocaleString()}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Customer Information */}
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Name</label>
                                  <p>{quote.fullName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Company</label>
                                  <p>{quote.company || 'N/A'}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Email</label>
                                  <p className="flex items-center gap-2">
                                    {quote.email}
                                    <Button variant="ghost" size="sm" asChild>
                                      <a href={`mailto:${quote.email}`}>
                                        <Mail className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Phone</label>
                                  <p className="flex items-center gap-2">
                                    {quote.phone}
                                    <Button variant="ghost" size="sm" asChild>
                                      <a href={`tel:${quote.phone}`}>
                                        <Phone className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Shipment Details */}
                            <div>
                              <h3 className="text-lg font-semibold mb-3">Shipment Details</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Service Type</label>
                                  <p>{quote.serviceType}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Cargo Type</label>
                                  <p>{quote.cargoType}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Origin</label>
                                  <p className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {quote.origin}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Destination</label>
                                  <p className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {quote.destination}
                                  </p>
                                </div>
                                {quote.weight && (
                                  <div>
                                    <label className="text-sm font-medium">Weight</label>
                                    <p>{quote.weight}</p>
                                  </div>
                                )}
                                {quote.dimensions && (
                                  <div>
                                    <label className="text-sm font-medium">Dimensions</label>
                                    <p>{quote.dimensions}</p>
                                  </div>
                                )}
                              </div>

                              <div className="mt-4">
                                <label className="text-sm font-medium">Cargo Details</label>
                                <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded mt-1">{quote.cargoDetails}</p>
                              </div>
                            </div>

                            {/* Quote Information */}
                            {quote.quotedAmount ? (
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Quote Information</h3>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="text-sm text-green-600">Quoted Amount</p>
                                      <p className="text-2xl font-bold text-green-800">
                                        ${quote.quotedAmount.toLocaleString()} {quote.currency}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-green-600">Valid Until</p>
                                      <p className="font-medium">
                                        {quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : 'N/A'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : quote.status === 'PENDING' && (
                              <div>
                                <h3 className="text-lg font-semibold mb-3">Provide Quote</h3>
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium">Quote Amount (USD)</label>
                                    <Input
                                      type="number"
                                      value={quoteAmount}
                                      onChange={(e) => setQuoteAmount(e.target.value)}
                                      placeholder="Enter quote amount"
                                      min="0"
                                      step="0.01"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Additional Notes</label>
                                    <Textarea
                                      value={quoteNotes}
                                      onChange={(e) => setQuoteNotes(e.target.value)}
                                      placeholder="Any additional notes or terms..."
                                      rows={3}
                                    />
                                  </div>
                                  <Button onClick={submitQuote} className="w-full">
                                    Send Quote
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {quotes.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500">
              No quotes found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
