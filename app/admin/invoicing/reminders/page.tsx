import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Mail, Phone, Settings, Edit, Eye, Plus, AlertCircle, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Payment Reminders | DCF Logistics Admin",
  description: "Automated payment reminder system configuration",
}

export default function PaymentRemindersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Reminders</h1>
          <p className="text-muted-foreground">Automated reminder system for overdue invoices</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Global Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Reminder
          </Button>
        </div>
      </div>

      {/* Reminder Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reminders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Automated sequences</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent This Month</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">Payment after reminder</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Collection Time</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5</div>
            <p className="text-xs text-muted-foreground">Days after reminder</p>
          </CardContent>
        </Card>
      </div>

      {/* Reminder Management */}
      <Tabs defaultValue="sequences" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sequences">Reminder Sequences</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Reminder Sequences */}
        <TabsContent value="sequences">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Standard Payment Reminder Sequence</CardTitle>
                <CardDescription>Default reminder sequence for all customers</CardDescription>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <Label>Active</Label>
                  <Badge variant="default">Default</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {/* Reminder 1 */}
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <span className="text-sm font-medium text-blue-600">1</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">First Reminder</div>
                      <div className="text-sm text-muted-foreground">3 days after due date</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        <Mail className="mr-1 h-3 w-3" />
                        Email
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Reminder 2 */}
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full">
                      <span className="text-sm font-medium text-amber-600">2</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Second Reminder</div>
                      <div className="text-sm text-muted-foreground">7 days after due date</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        <Mail className="mr-1 h-3 w-3" />
                        Email
                      </Badge>
                      <Badge variant="outline">
                        <Phone className="mr-1 h-3 w-3" />
                        SMS
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Reminder 3 */}
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                      <span className="text-sm font-medium text-red-600">3</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Final Notice</div>
                      <div className="text-sm text-muted-foreground">14 days after due date</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        <Mail className="mr-1 h-3 w-3" />
                        Email
                      </Badge>
                      <Badge variant="outline">
                        <Phone className="mr-1 h-3 w-3" />
                        Call
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Reminder Step
                  </Button>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Sequence
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* VIP Customer Sequence */}
            <Card>
              <CardHeader>
                <CardTitle>VIP Customer Sequence</CardTitle>
                <CardDescription>Gentle reminder sequence for VIP customers</CardDescription>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <Label>Active</Label>
                  <Badge variant="secondary">VIP Only</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Customized sequence with longer intervals and personalized messaging for VIP customers.
                </div>
                <Button variant="outline" className="mt-4">
                  Configure VIP Sequence
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Email Templates */}
        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>First Reminder Template</CardTitle>
                <CardDescription>Friendly reminder for recent overdue invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject1">Subject Line</Label>
                  <Input id="subject1" defaultValue="Friendly Reminder: Invoice {{invoice_number}} is now due" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template1">Email Content</Label>
                  <Textarea
                    id="template1"
                    rows={6}
                    defaultValue="Dear {{customer_name}},

We hope this message finds you well. This is a friendly reminder that invoice {{invoice_number}} for ${{amount}} was due on {{due_date}}.

If you have already processed this payment, please disregard this message. If you have any questions or need assistance, please don't hesitate to contact us.

Thank you for your business!

Best regards,
DCF Logistics Team"
                  />
                </div>
                <Button>Save Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Final Notice Template</CardTitle>
                <CardDescription>Urgent notice for significantly overdue invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject2">Subject Line</Label>
                  <Input id="subject2" defaultValue="URGENT: Final Notice for Invoice {{invoice_number}}" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template2">Email Content</Label>
                  <Textarea
                    id="template2"
                    rows={6}
                    defaultValue="Dear {{customer_name}},

This is a final notice regarding invoice {{invoice_number}} for ${{amount}}, which was due on {{due_date}} and is now {{days_overdue}} days overdue.

Immediate payment is required to avoid any service interruptions or additional fees. Please contact us immediately if there are any issues with this invoice.

Payment can be made via:
- Bank transfer
- Online payment portal
- Check

Please contact our accounts team at accounting@dcflogistics.com or call +220 123 456 789.

DCF Logistics Accounts Team"
                  />
                </div>
                <Button>Save Template</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Global Reminder Settings</CardTitle>
                <CardDescription>Configure system-wide reminder preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Automatic Reminders</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically send reminders based on configured sequences
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekend Sending</Label>
                    <div className="text-sm text-muted-foreground">Send reminders on weekends</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Holiday Pause</Label>
                    <div className="text-sm text-muted-foreground">Pause reminders during holidays</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Default Sending Time</Label>
                  <Select defaultValue="09:00">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive reminder notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">Get notified when reminders are sent</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Daily Summary</Label>
                    <div className="text-sm text-muted-foreground">Daily report of reminder activity</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Notification Email</Label>
                  <Input defaultValue="admin@dcflogistics.com" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Reminder Effectiveness</CardTitle>
                <CardDescription>Payment response rates by reminder type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">First Reminder</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Second Reminder</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                      </div>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Final Notice</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "73%" }}></div>
                      </div>
                      <span className="text-sm font-medium">73%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Reminder Activity</CardTitle>
                <CardDescription>Reminders sent and payments received</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Reminders Sent</span>
                    <span className="font-bold">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Payments Received</span>
                    <span className="font-bold text-green-600">180</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Still Outstanding</span>
                    <span className="font-bold text-red-600">67</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-bold">73%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
