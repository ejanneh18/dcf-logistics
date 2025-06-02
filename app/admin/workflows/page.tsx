import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Workflow,
  Play,
  Pause,
  Settings,
  Plus,
  Mail,
  Phone,
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Package,
  DollarSign,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Automated Workflows | DCF Logistics Admin",
  description: "Configure and manage automated business workflows",
}

const workflows = [
  {
    id: 1,
    name: "Payment Reminder Sequence",
    description: "Automated reminders for overdue invoices",
    status: "active",
    triggers: 247,
    success_rate: 73,
    category: "Finance",
    icon: DollarSign,
    steps: [
      { name: "First Reminder", delay: "3 days", action: "Email" },
      { name: "Second Reminder", delay: "7 days", action: "Email + SMS" },
      { name: "Final Notice", delay: "14 days", action: "Email + Call" },
    ],
  },
  {
    id: 2,
    name: "Customer Onboarding",
    description: "Welcome sequence for new customers",
    status: "active",
    triggers: 89,
    success_rate: 94,
    category: "Customer",
    icon: Users,
    steps: [
      { name: "Welcome Email", delay: "Immediate", action: "Email" },
      { name: "Setup Guide", delay: "1 day", action: "Email" },
      { name: "Check-in Call", delay: "7 days", action: "Task" },
    ],
  },
  {
    id: 3,
    name: "Shipment Status Updates",
    description: "Automatic customer notifications for shipment progress",
    status: "active",
    triggers: 1247,
    success_rate: 98,
    category: "Operations",
    icon: Package,
    steps: [
      { name: "Pickup Confirmation", delay: "On pickup", action: "Email + SMS" },
      { name: "In Transit Update", delay: "Daily", action: "Email" },
      { name: "Delivery Confirmation", delay: "On delivery", action: "Email + SMS" },
    ],
  },
  {
    id: 4,
    name: "Invoice Generation",
    description: "Automatic invoice creation after service completion",
    status: "active",
    triggers: 156,
    success_rate: 100,
    category: "Finance",
    icon: DollarSign,
    steps: [
      { name: "Service Completion Check", delay: "On completion", action: "System" },
      { name: "Generate Invoice", delay: "Immediate", action: "System" },
      { name: "Send to Customer", delay: "1 hour", action: "Email" },
    ],
  },
  {
    id: 5,
    name: "Maintenance Alerts",
    description: "Fleet maintenance scheduling and reminders",
    status: "paused",
    triggers: 23,
    success_rate: 87,
    category: "Operations",
    icon: AlertTriangle,
    steps: [
      { name: "Maintenance Due Alert", delay: "7 days before", action: "Notification" },
      { name: "Schedule Maintenance", delay: "3 days before", action: "Task" },
      { name: "Maintenance Reminder", delay: "1 day before", action: "Email" },
    ],
  },
]

export default function AutomatedWorkflowsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automated Workflows</h1>
          <p className="text-muted-foreground">Configure and manage automated business processes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Global Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Workflow
          </Button>
        </div>
      </div>

      {/* Workflow Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.filter((w) => w.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Running automatically</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Triggers</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workflows.reduce((sum, w) => sum + w.triggers, 0)}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(workflows.reduce((sum, w) => sum + w.success_rate, 0) / workflows.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Average across all workflows</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Management */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Workflows</TabsTrigger>
          <TabsTrigger value="templates">Workflow Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Active Workflows */}
        <TabsContent value="active">
          <div className="space-y-4">
            {workflows.map((workflow) => {
              const Icon = workflow.icon
              return (
                <Card key={workflow.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {workflow.name}
                        <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                          {workflow.status}
                        </Badge>
                        <Badge variant="outline">{workflow.category}</Badge>
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={workflow.status === "active" ? "text-red-600" : "text-green-600"}
                        >
                          {workflow.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{workflow.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{workflow.triggers}</div>
                        <div className="text-sm text-muted-foreground">Monthly Triggers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{workflow.success_rate}%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{workflow.steps.length}</div>
                        <div className="text-sm text-muted-foreground">Steps</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Workflow Steps:</div>
                      <div className="grid gap-2">
                        {workflow.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 border rounded-lg">
                            <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full text-xs font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{step.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {step.delay} • {step.action}
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {step.action.includes("Email") && <Mail className="mr-1 h-3 w-3" />}
                              {step.action.includes("SMS") && <Phone className="mr-1 h-3 w-3" />}
                              {step.action.includes("Call") && <Phone className="mr-1 h-3 w-3" />}
                              {step.action.includes("Notification") && <Bell className="mr-1 h-3 w-3" />}
                              {step.action}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Workflow Templates */}
        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Payment Collection
                </CardTitle>
                <CardDescription>Automated payment reminder and collection workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Send payment reminders</div>
                  <div>• Escalate to collections</div>
                  <div>• Generate reports</div>
                </div>
                <Button className="w-full mt-4">Use Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Lifecycle
                </CardTitle>
                <CardDescription>Complete customer journey automation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Welcome new customers</div>
                  <div>• Onboarding sequence</div>
                  <div>• Retention campaigns</div>
                </div>
                <Button className="w-full mt-4">Use Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Shipment Tracking
                </CardTitle>
                <CardDescription>Automated shipment status notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Pickup confirmations</div>
                  <div>• Transit updates</div>
                  <div>• Delivery notifications</div>
                </div>
                <Button className="w-full mt-4">Use Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Issue Resolution
                </CardTitle>
                <CardDescription>Automated issue detection and resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Detect issues automatically</div>
                  <div>• Assign to team members</div>
                  <div>• Follow up on resolution</div>
                </div>
                <Button className="w-full mt-4">Use Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Quality Assurance
                </CardTitle>
                <CardDescription>Automated quality checks and feedback collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Service quality checks</div>
                  <div>• Customer feedback requests</div>
                  <div>• Performance reporting</div>
                </div>
                <Button className="w-full mt-4">Use Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Maintenance Scheduling
                </CardTitle>
                <CardDescription>Automated fleet and equipment maintenance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• Schedule maintenance</div>
                  <div>• Send reminders</div>
                  <div>• Track completion</div>
                </div>
                <Button className="w-full mt-4">Use Template</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Performance</CardTitle>
                <CardDescription>Success rates and efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="flex justify-between items-center">
                      <span className="text-sm">{workflow.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${workflow.success_rate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{workflow.success_rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Savings</CardTitle>
                <CardDescription>Hours saved through automation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Payment Processing</span>
                    <span className="font-bold">89h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Communications</span>
                    <span className="font-bold">67h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status Updates</span>
                    <span className="font-bold">45h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Administrative Tasks</span>
                    <span className="font-bold">46h</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-sm">Total Monthly Savings</span>
                      <span>247h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Global Workflow Settings</CardTitle>
                <CardDescription>System-wide workflow configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Workflows</Label>
                    <div className="text-sm text-muted-foreground">Master switch for all workflows</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekend Execution</Label>
                    <div className="text-sm text-muted-foreground">Run workflows on weekends</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Holiday Pause</Label>
                    <div className="text-sm text-muted-foreground">Pause workflows during holidays</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Error Notifications</Label>
                    <div className="text-sm text-muted-foreground">Alert on workflow failures</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Settings</CardTitle>
                <CardDescription>Optimize workflow performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Parallel Execution</Label>
                    <div className="text-sm text-muted-foreground">Run multiple workflows simultaneously</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Retry Failed Steps</Label>
                    <div className="text-sm text-muted-foreground">Automatically retry failed workflow steps</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Detailed Logging</Label>
                    <div className="text-sm text-muted-foreground">Log all workflow activities</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Performance Monitoring</Label>
                    <div className="text-sm text-muted-foreground">Monitor workflow performance metrics</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
