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
import { MessageSquare, Clock, CheckCircle, AlertTriangle, Search, Mail, Phone, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc/client'

export default function InquiriesManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | 'GENERAL' | 'QUOTE' | 'SUPPORT' | 'PARTNERSHIP'>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null)
  const [response, setResponse] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch inquiries with filters
  const { data: inquiriesData, isLoading, refetch } = trpc.inquiries.getAll.useQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm || undefined,
    status: statusFilter,
    type: typeFilter,
    priority: priorityFilter,
  })

  // Fetch inquiry statistics
  const { data: stats, isLoading: statsLoading } = trpc.inquiries.getStats.useQuery()

  // Update inquiry mutation
  const updateInquiryMutation = trpc.inquiries.update.useMutation({
    onSuccess: () => {
      toast.success("Inquiry updated successfully")
      refetch()
      setSelectedInquiry(null)
      setResponse('')
    },
    onError: (error) => {
      toast.error(`Failed to update inquiry: ${error.message}`)
    }
  })

  // Delete inquiry mutation
  const deleteInquiryMutation = trpc.inquiries.delete.useMutation({
    onSuccess: () => {
      toast.success("Inquiry deleted successfully")
      refetch()
    },
    onError: (error) => {
      toast.error(`Failed to delete inquiry: ${error.message}`)
    }
  })

  const updateInquiryStatus = async (inquiryId: string, newStatus: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED') => {
    try {
      await updateInquiryMutation.mutateAsync({
        id: inquiryId,
        status: newStatus,
      })
    } catch (error) {
      console.error('Failed to update inquiry status:', error)
    }
  }

  const submitResponse = async () => {
    if (!selectedInquiry || !response.trim()) return

    try {
      await updateInquiryMutation.mutateAsync({
        id: selectedInquiry.id,
        status: 'RESOLVED',
        response: response.trim(),
      })
    } catch (error) {
      console.error('Failed to submit response:', error)
    }
  }

  const handleDeleteInquiry = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) {
      try {
        await deleteInquiryMutation.mutateAsync({ id })
      } catch (error) {
        console.error('Failed to delete inquiry:', error)
      }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-800'
      case 'HIGH': return 'bg-orange-100 text-orange-800'
      case 'NORMAL': return 'bg-blue-100 text-blue-800'
      case 'LOW': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800'
      case 'RESOLVED': return 'bg-green-100 text-green-800'
      case 'CLOSED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Inquiries</h1>
          <p className="text-gray-600">Manage and respond to customer inquiries</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold">{stats?.totalInquiries || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-yellow-600">{stats?.pendingInquiries || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-blue-600">{stats?.inProgressInquiries || 0}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-green-600">{stats?.resolvedInquiries || 0}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Inquiries List */}
      <Card>
        <CardHeader>
          <CardTitle>Inquiry Management</CardTitle>
          <CardDescription>View and respond to customer inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search inquiries..."
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
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="GENERAL">General</SelectItem>
                <SelectItem value="QUOTE">Quote</SelectItem>
                <SelectItem value="SUPPORT">Support</SelectItem>
                <SelectItem value="PARTNERSHIP">Partnership</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="NORMAL">Normal</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading inquiries...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiriesData?.inquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No inquiries found
                    </TableCell>
                  </TableRow>
                ) : (
                  inquiriesData?.inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-mono text-sm">{inquiry.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{inquiry.name}</div>
                          <div className="text-sm text-gray-500">{inquiry.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{inquiry.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{inquiry.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(inquiry.priority)}>
                          {inquiry.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedInquiry(inquiry)}>
                                View
                              </Button>
                            </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Inquiry Details - {inquiry.id}</DialogTitle>
                              <DialogDescription>
                                Submitted on {new Date(inquiry.createdAt).toLocaleString()}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Customer</label>
                                  <p>{inquiry.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Company</label>
                                  <p>{inquiry.company || 'N/A'}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Email</label>
                                  <p className="flex items-center gap-2">
                                    {inquiry.email}
                                    <Button variant="ghost" size="sm" asChild>
                                      <a href={`mailto:${inquiry.email}`}>
                                        <Mail className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Phone</label>
                                  <p className="flex items-center gap-2">
                                    {inquiry.phone || 'N/A'}
                                    {inquiry.phone && (
                                      <Button variant="ghost" size="sm" asChild>
                                        <a href={`tel:${inquiry.phone}`}>
                                          <Phone className="h-4 w-4" />
                                        </a>
                                      </Button>
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Subject</label>
                                <p>{inquiry.subject}</p>
                              </div>

                              <div>
                                <label className="text-sm font-medium">Message</label>
                                <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded">{inquiry.message}</p>
                              </div>

                              {inquiry.response && (
                                <div>
                                  <label className="text-sm font-medium">Response</label>
                                  <p className="whitespace-pre-wrap bg-green-50 p-3 rounded">{inquiry.response}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Responded on {inquiry.respondedAt ? new Date(inquiry.respondedAt).toLocaleString() : 'N/A'}
                                  </p>
                                </div>
                              )}

                              {inquiry.status !== 'RESOLVED' && (
                                <div>
                                  <label className="text-sm font-medium">Response</label>
                                  <Textarea
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    placeholder="Type your response here..."
                                    rows={4}
                                  />
                                  <div className="flex gap-2 mt-2">
                                    <Button
                                      onClick={submitResponse}
                                      disabled={updateInquiryMutation.isLoading}
                                    >
                                      {updateInquiryMutation.isLoading ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      ) : null}
                                      Send Response
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => updateInquiryStatus(inquiry.id, 'IN_PROGRESS')}
                                      disabled={updateInquiryMutation.isLoading}
                                    >
                                      Mark In Progress
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                          disabled={deleteInquiryMutation.isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
                )}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {inquiriesData && inquiriesData.pagination.pages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, inquiriesData.pagination.total)} of {inquiriesData.pagination.total} inquiries
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(inquiriesData.pagination.pages, prev + 1))}
                  disabled={currentPage === inquiriesData.pagination.pages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
