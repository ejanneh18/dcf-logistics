"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, Shield, CheckCircle, AlertCircle, Settings, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function PaymentGatewayPageClient() {
  const [showApiKeys, setShowApiKeys] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Gateway Configuration</h1>
          <p className="text-muted-foreground">Configure payment processing and gateway integrations</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Test Configuration
        </Button>
      </div>

      {/* Gateway Status Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Gateways</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Stripe, PayPal, Bank Transfer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$284K</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">Excellent performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Transactions</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.3%</div>
            <p className="text-xs text-muted-foreground">Within normal range</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Gateway Configuration */}
      <Tabs defaultValue="stripe" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stripe">Stripe</TabsTrigger>
          <TabsTrigger value="paypal">PayPal</TabsTrigger>
          <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
          <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
        </TabsList>

        {/* Stripe Configuration */}
        <TabsContent value="stripe">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Stripe Configuration
                  <Badge variant="default">Active</Badge>
                </CardTitle>
                <CardDescription>Configure Stripe payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Stripe</Label>
                    <div className="text-sm text-muted-foreground">Accept credit card payments</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe-publishable">Publishable Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stripe-publishable"
                      type={showApiKeys ? "text" : "password"}
                      defaultValue="pk_live_51234567890abcdef"
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={() => setShowApiKeys(!showApiKeys)}>
                      {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe-secret">Secret Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stripe-secret"
                      type={showApiKeys ? "text" : "password"}
                      defaultValue="sk_live_51234567890abcdef"
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={() => setShowApiKeys(!showApiKeys)}>
                      {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook">Webhook Endpoint</Label>
                  <Input id="stripe-webhook" defaultValue="https://dcflogistics.com/api/webhooks/stripe" readOnly />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Test Mode</Label>
                    <div className="text-sm text-muted-foreground">Use Stripe test environment</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stripe Settings</CardTitle>
                <CardDescription>Advanced Stripe configuration options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatic Capture</Label>
                    <div className="text-sm text-muted-foreground">Automatically capture payments</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Save Payment Methods</Label>
                    <div className="text-sm text-muted-foreground">Allow customers to save cards</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>3D Secure</Label>
                    <div className="text-sm text-muted-foreground">Enhanced security verification</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Statement Descriptor</Label>
                  <Input defaultValue="DCF LOGISTICS" maxLength={22} />
                  <div className="text-xs text-muted-foreground">
                    Appears on customer's bank statement (max 22 characters)
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Processing Fee</Label>
                  <div className="text-sm text-muted-foreground">2.9% + $0.30 per transaction</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* PayPal Configuration */}
        <TabsContent value="paypal">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-600 rounded"></div>
                  PayPal Configuration
                  <Badge variant="outline">Inactive</Badge>
                </CardTitle>
                <CardDescription>Configure PayPal payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable PayPal</Label>
                    <div className="text-sm text-muted-foreground">Accept PayPal payments</div>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paypal-client-id">Client ID</Label>
                  <Input id="paypal-client-id" placeholder="Enter PayPal Client ID" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paypal-secret">Client Secret</Label>
                  <Input id="paypal-secret" type="password" placeholder="Enter PayPal Client Secret" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sandbox Mode</Label>
                    <div className="text-sm text-muted-foreground">Use PayPal sandbox for testing</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PayPal Settings</CardTitle>
                <CardDescription>PayPal-specific configuration options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Express Checkout</Label>
                    <div className="text-sm text-muted-foreground">Enable PayPal Express Checkout</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>PayPal Credit</Label>
                    <div className="text-sm text-muted-foreground">Offer PayPal Credit option</div>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label>Brand Name</Label>
                  <Input defaultValue="DCF Logistics" />
                  <div className="text-xs text-muted-foreground">Displayed on PayPal checkout pages</div>
                </div>

                <div className="space-y-2">
                  <Label>Processing Fee</Label>
                  <div className="text-sm text-muted-foreground">2.9% + $0.30 per transaction</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bank Transfer Configuration */}
        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Bank Transfer Configuration
                <Badge variant="default">Active</Badge>
              </CardTitle>
              <CardDescription>Configure direct bank transfer payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Bank Transfers</Label>
                  <div className="text-sm text-muted-foreground">Accept direct bank payments</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Input defaultValue="Standard Chartered Bank Gambia" />
                </div>
                <div className="space-y-2">
                  <Label>Account Name</Label>
                  <Input defaultValue="DCF Logistics Ltd" />
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input defaultValue="0123456789" />
                </div>
                <div className="space-y-2">
                  <Label>SWIFT Code</Label>
                  <Input defaultValue="SCBLGMGX" />
                </div>
                <div className="space-y-2">
                  <Label>IBAN</Label>
                  <Input defaultValue="GM33SCBL01234567890123456789" />
                </div>
                <div className="space-y-2">
                  <Label>Sort Code</Label>
                  <Input defaultValue="12-34-56" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Instructions</Label>
                <textarea
                  className="w-full p-3 border rounded-md"
                  rows={4}
                  defaultValue="Please include your invoice number in the payment reference. Bank transfers typically take 1-3 business days to process. Contact us at finance@dcflogistics.com for any payment queries."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cryptocurrency Configuration */}
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
                Cryptocurrency Configuration
                <Badge variant="outline">Coming Soon</Badge>
              </CardTitle>
              <CardDescription>Accept Bitcoin and other cryptocurrency payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <div className="text-muted-foreground">
                  Cryptocurrency payment integration coming soon. This will support Bitcoin, Ethereum, and other major
                  cryptocurrencies.
                </div>
                <Button className="mt-4" disabled>
                  Configure Crypto Payments
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Analytics</CardTitle>
          <CardDescription>Payment processing statistics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Payment Method Distribution</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Credit Cards (Stripe)</span>
                  <span className="text-sm font-bold">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bank Transfers</span>
                  <span className="text-sm font-bold">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">PayPal</span>
                  <span className="text-sm font-bold">5%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Transaction Fees</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Fees (Monthly)</span>
                  <span className="text-sm font-bold">$8,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Fee Rate</span>
                  <span className="text-sm font-bold">2.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fee Savings Opportunity</span>
                  <span className="text-sm font-bold text-green-600">$1,200</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Performance Metrics</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Processing Time</span>
                  <span className="text-sm font-bold">2.3 seconds</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dispute Rate</span>
                  <span className="text-sm font-bold">0.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chargeback Rate</span>
                  <span className="text-sm font-bold">0.05%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
