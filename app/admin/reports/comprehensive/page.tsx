import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  Download,
  Calendar,
  Filter,
  DollarSign,
  Package,
  Users,
  Target,
  CheckCircle,
  Activity,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Comprehensive Analytics Report | DCF Logistics Admin",
  description: "Generate detailed business intelligence and analytics reports",
}

export default function ComprehensiveAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comprehensive Analytics Report</h1>
          <p className="text-muted-foreground">Generate detailed business intelligence and performance reports</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,847,392</div>
            <p className="text-xs text-muted-foreground">+12.5% vs last period</p>
            <div className="text-sm text-green-600 font-medium">↗ $318,743 increase</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+8.2% vs last period</p>
            <div className="text-sm text-blue-600 font-medium">94 new shipments</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Growth</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,942</div>
            <p className="text-xs text-muted-foreground">+3.1% vs last period</p>
            <div className="text-sm text-purple-600 font-medium">247 new customers</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <Target className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.7%</div>
            <p className="text-xs text-muted-foreground">+2.1% improvement</p>
            <div className="text-sm text-amber-600 font-medium">Excellent performance</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="executive">Executive</TabsTrigger>
        </TabsList>

        {/* Financial Analytics */}
        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Detailed revenue breakdown and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Air Freight Services</span>
                    <div className="text-right">
                      <div className="font-bold">$1,283,126</div>
                      <div className="text-xs text-green-600">+15.2%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ground Transportation</span>
                    <div className="text-right">
                      <div className="font-bold">$797,268</div>
                      <div className="text-xs text-green-600">+8.7%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ocean Freight</span>
                    <div className="text-right">
                      <div className="font-bold">$427,109</div>
                      <div className="text-xs text-green-600">+22.1%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customs & Compliance</span>
                    <div className="text-right">
                      <div className="font-bold">$339,889</div>
                      <div className="text-xs text-green-600">+18.9%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Margins</CardTitle>
                <CardDescription>Service profitability analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customs Clearance</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "35.7%" }}></div>
                      </div>
                      <span className="text-sm font-bold text-green-600">35.7%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ocean Freight</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "28.4%" }}></div>
                      </div>
                      <span className="text-sm font-bold text-green-600">28.4%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ground Transport</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "22.3%" }}></div>
                      </div>
                      <span className="text-sm font-bold text-green-600">22.3%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Air Freight</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "18.5%" }}></div>
                      </div>
                      <span className="text-sm font-bold text-green-600">18.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Operating expense breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Fuel & Transportation</span>
                    <span className="font-bold">$894,567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Staff & Operations</span>
                    <span className="font-bold">$672,340</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Facility & Equipment</span>
                    <span className="font-bold">$345,678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Insurance & Compliance</span>
                    <span className="font-bold">$258,901</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Flow</CardTitle>
                <CardDescription>Monthly cash flow analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Operating Cash Flow</span>
                    <span className="font-bold text-green-600">$1,247,892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Investment Cash Flow</span>
                    <span className="font-bold text-red-600">-$234,567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Financing Cash Flow</span>
                    <span className="font-bold text-blue-600">$89,234</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Net Cash Flow</span>
                    <span className="font-bold text-green-600">$1,102,559</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Ratios</CardTitle>
                <CardDescription>Key financial performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Gross Profit Margin</span>
                    <span className="font-bold">23.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Operating Margin</span>
                    <span className="font-bold">18.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Return on Assets</span>
                    <span className="font-bold">15.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Current Ratio</span>
                    <span className="font-bold">2.4</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Operational Analytics */}
        <TabsContent value="operational" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Performance</CardTitle>
                <CardDescription>Vehicle utilization and efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fleet Utilization Rate</span>
                    <div className="text-right">
                      <div className="font-bold">87.5%</div>
                      <div className="text-xs text-green-600">+3.2%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Fuel Efficiency</span>
                    <div className="text-right">
                      <div className="font-bold">12.5 MPG</div>
                      <div className="text-xs text-green-600">+0.8 MPG</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Maintenance Compliance</span>
                    <div className="text-right">
                      <div className="font-bold">98.2%</div>
                      <div className="text-xs text-green-600">+1.1%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vehicle Downtime</span>
                    <div className="text-right">
                      <div className="font-bold">2.3%</div>
                      <div className="text-xs text-red-600">-0.5%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
                <CardDescription>On-time delivery and service quality metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-Time Delivery Rate</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">99.2%</div>
                      <div className="text-xs text-green-600">+0.7%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Transit Time</span>
                    <div className="text-right">
                      <div className="font-bold">4.2 days</div>
                      <div className="text-xs text-green-600">-0.3 days</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Damage Rate</span>
                    <div className="text-right">
                      <div className="font-bold">0.08%</div>
                      <div className="text-xs text-green-600">-0.02%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">98.5%</div>
                      <div className="text-xs text-green-600">+2.1%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Route Optimization</CardTitle>
                <CardDescription>Most efficient shipping routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Banjul → London</span>
                    <Badge variant="default">98.7% efficiency</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Banjul → Dubai</span>
                    <Badge variant="default">97.3% efficiency</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Banjul → New York</span>
                    <Badge variant="default">96.8% efficiency</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Banjul → Paris</span>
                    <Badge variant="default">95.4% efficiency</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Warehouse Metrics</CardTitle>
                <CardDescription>Storage and handling performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Storage Utilization</span>
                    <span className="font-bold">78.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Processing Accuracy</span>
                    <span className="font-bold text-green-600">99.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg. Processing Time</span>
                    <span className="font-bold">2.3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Items Processed/Day</span>
                    <span className="font-bold">1,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety & Compliance</CardTitle>
                <CardDescription>Safety records and regulatory compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Safety Incidents</span>
                    <span className="font-bold text-green-600">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Compliance Score</span>
                    <span className="font-bold text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Training Completion</span>
                    <span className="font-bold">94.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Audit Results</span>
                    <Badge variant="default">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Analytics */}
        <TabsContent value="customer" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segmentation</CardTitle>
                <CardDescription>Customer base analysis by value and behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Enterprise Customers</span>
                    <div className="text-right">
                      <div className="font-bold">156</div>
                      <div className="text-xs text-muted-foreground">67% of revenue</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SME Customers</span>
                    <div className="text-right">
                      <div className="font-bold">2,847</div>
                      <div className="text-xs text-muted-foreground">28% of revenue</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Individual Customers</span>
                    <div className="text-right">
                      <div className="font-bold">5,939</div>
                      <div className="text-xs text-muted-foreground">5% of revenue</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
                <CardDescription>Average customer value and retention metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average CLV</span>
                    <div className="text-right">
                      <div className="font-bold">$18,450</div>
                      <div className="text-xs text-green-600">+15.3%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Retention Rate</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">94.2%</div>
                      <div className="text-xs text-green-600">+2.1%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Churn Rate</span>
                    <div className="text-right">
                      <div className="font-bold">5.8%</div>
                      <div className="text-xs text-red-600">-2.1%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. Order Value</span>
                    <div className="text-right">
                      <div className="font-bold">$2,847</div>
                      <div className="text-xs text-green-600">+12.4%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Customer distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">West Africa</span>
                    <span className="font-bold">45.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Europe</span>
                    <span className="font-bold">28.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">North America</span>
                    <span className="font-bold">15.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Asia</span>
                    <span className="font-bold">10.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Preferences</CardTitle>
                <CardDescription>Most popular services by customer segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Air Freight</span>
                    <Badge variant="default">45%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ground Transport</span>
                    <Badge variant="default">28%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ocean Freight</span>
                    <Badge variant="default">15%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Customs Services</span>
                    <Badge variant="default">12%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Satisfaction scores and feedback analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Overall Satisfaction</span>
                    <span className="font-bold text-green-600">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Service Quality</span>
                    <span className="font-bold text-green-600">97.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Communication</span>
                    <span className="font-bold text-green-600">96.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Value for Money</span>
                    <span className="font-bold text-green-600">95.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Analytics */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Critical business performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue Growth Rate</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">+12.5%</div>
                      <div className="text-xs text-muted-foreground">vs last period</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Operational Efficiency</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">94.7%</div>
                      <div className="text-xs text-green-600">+2.1%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Acquisition Cost</span>
                    <div className="text-right">
                      <div className="font-bold">$247</div>
                      <div className="text-xs text-red-600">-$23</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Employee Productivity</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">118%</div>
                      <div className="text-xs text-green-600">+8%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Technology and system performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Uptime</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">99.99%</div>
                      <div className="text-xs text-muted-foreground">Last 30 days</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Response Time</span>
                    <div className="text-right">
                      <div className="font-bold">45ms</div>
                      <div className="text-xs text-green-600">-5ms</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Error Rate</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">0.01%</div>
                      <div className="text-xs text-green-600">-0.02%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Accuracy</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">99.9%</div>
                      <div className="text-xs text-green-600">+0.1%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Predictive Analytics */}
        <TabsContent value="predictive" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Forecast</CardTitle>
                <CardDescription>Predicted revenue for next 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Next Month</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">$298,000</div>
                      <div className="text-xs text-muted-foreground">87% confidence</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Month 2</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">$312,000</div>
                      <div className="text-xs text-muted-foreground">84% confidence</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Month 3</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">$327,000</div>
                      <div className="text-xs text-muted-foreground">81% confidence</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">6-Month Total</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600">$1,847,000</div>
                      <div className="text-xs text-muted-foreground">78% confidence</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Potential business risks and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Market Expansion Opportunity</span>
                    <Badge variant="default">High</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fuel Price Volatility</span>
                    <Badge variant="destructive">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Regulatory Changes</span>
                    <Badge variant="outline">Low</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technology Disruption</span>
                    <Badge variant="outline">Low</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Executive Summary */}
        <TabsContent value="executive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
              <CardDescription>High-level business performance overview for leadership</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg bg-green-50">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="font-bold text-green-600">Strong Performance</div>
                    <div className="text-sm text-muted-foreground">Revenue up 12.5%</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-blue-50">
                    <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="font-bold text-blue-600">Growth Trajectory</div>
                    <div className="text-sm text-muted-foreground">All KPIs trending up</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-amber-50">
                    <Target className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                    <div className="font-bold text-amber-600">Efficiency Gains</div>
                    <div className="text-sm text-muted-foreground">94.7% operational efficiency</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Achievements</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Revenue increased by 12.5% compared to last period</li>
                      <li>• Customer satisfaction reached 98.5%, highest ever recorded</li>
                      <li>• On-time delivery rate improved to 99.2%</li>
                      <li>• Successfully onboarded 247 new customers</li>
                      <li>• Achieved 99.99% system uptime with zero security incidents</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Areas of Focus</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Continue expansion into new markets (West Africa focus)</li>
                      <li>• Optimize fuel costs through route efficiency improvements</li>
                      <li>• Enhance digital capabilities and automation</li>
                      <li>• Strengthen customer retention programs</li>
                      <li>• Invest in fleet modernization and sustainability</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Strategic Recommendations</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Accelerate digital transformation initiatives</li>
                      <li>• Expand service offerings in high-margin areas</li>
                      <li>• Implement predictive maintenance for fleet optimization</li>
                      <li>• Develop strategic partnerships in key markets</li>
                      <li>• Enhance data analytics capabilities for better decision making</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Report Actions</CardTitle>
          <CardDescription>Generate and export detailed reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export PDF Report
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Excel Data
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Report
            </Button>
            <Button variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              Real-time Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
