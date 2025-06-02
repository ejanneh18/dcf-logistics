"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, User, CheckCircle, XCircle, AlertTriangle, Play, RotateCcw, Eye, Lock, Unlock } from "lucide-react"
import { useState } from "react"

const testScenarios = [
  {
    id: 1,
    name: "Invoice Creation Access",
    description: "Test ability to create new invoices",
    category: "Financial",
    roles: {
      CEO: true,
      Administrator: true,
      "Operations Manager": false,
      "Finance Staff": true,
      "Customer Service": false,
    },
  },
  {
    id: 2,
    name: "Customer Data Access",
    description: "Test ability to view customer information",
    category: "Customer Management",
    roles: {
      CEO: true,
      Administrator: true,
      "Operations Manager": true,
      "Finance Staff": true,
      "Customer Service": true,
    },
  },
  {
    id: 3,
    name: "System Configuration",
    description: "Test ability to modify system settings",
    category: "System Administration",
    roles: {
      CEO: true,
      Administrator: false,
      "Operations Manager": false,
      "Finance Staff": false,
      "Customer Service": false,
    },
  },
  {
    id: 4,
    name: "Financial Reports",
    description: "Test ability to generate financial reports",
    category: "Reporting",
    roles: {
      CEO: true,
      Administrator: true,
      "Operations Manager": false,
      "Finance Staff": true,
      "Customer Service": false,
    },
  },
  {
    id: 5,
    name: "User Management",
    description: "Test ability to manage user accounts",
    category: "User Administration",
    roles: {
      CEO: true,
      Administrator: true,
      "Operations Manager": false,
      "Finance Staff": false,
      "Customer Service": false,
    },
  },
]

export default function PermissionTestingClientPage() {
  const [selectedRole, setSelectedRole] = useState("CEO")
  const [testResults, setTestResults] = useState<Record<number, "pass" | "fail" | "pending">>({})
  const [isRunningTests, setIsRunningTests] = useState(false)

  const runAllTests = async () => {
    setIsRunningTests(true)
    setTestResults({})

    for (const scenario of testScenarios) {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate test execution
      const expectedResult = scenario.roles[selectedRole as keyof typeof scenario.roles]
      setTestResults((prev) => ({
        ...prev,
        [scenario.id]: expectedResult ? "pass" : "fail",
      }))
    }

    setIsRunningTests(false)
  }

  const runSingleTest = async (scenarioId: number) => {
    setTestResults((prev) => ({ ...prev, [scenarioId]: "pending" }))
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const scenario = testScenarios.find((s) => s.id === scenarioId)
    if (scenario) {
      const expectedResult = scenario.roles[selectedRole as keyof typeof scenario.roles]
      setTestResults((prev) => ({
        ...prev,
        [scenarioId]: expectedResult ? "pass" : "fail",
      }))
    }
  }

  const getTestIcon = (result: "pass" | "fail" | "pending" | undefined) => {
    switch (result) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-amber-500 animate-pulse" />
      default:
        return <Eye className="h-4 w-4 text-gray-400" />
    }
  }

  const getTestBadge = (result: "pass" | "fail" | "pending" | undefined) => {
    switch (result) {
      case "pass":
        return (
          <Badge variant="default" className="bg-green-500">
            Pass
          </Badge>
        )
      case "fail":
        return <Badge variant="destructive">Fail</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-600">
            Testing...
          </Badge>
        )
      default:
        return <Badge variant="outline">Not Tested</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permission Testing</h1>
          <p className="text-muted-foreground">Test and verify user role permissions and access controls</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setTestResults({})}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Tests
          </Button>
          <Button onClick={runAllTests} disabled={isRunningTests}>
            <Play className="mr-2 h-4 w-4" />
            Run All Tests
          </Button>
        </div>
      </div>

      {/* Test Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Test Configuration</CardTitle>
          <CardDescription>Select the role to test permissions for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Test Role:</span>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CEO">CEO</SelectItem>
                <SelectItem value="Administrator">Administrator</SelectItem>
                <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                <SelectItem value="Finance Staff">Finance Staff</SelectItem>
                <SelectItem value="Customer Service">Customer Service</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 ml-4">
              <Shield className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">
                Testing permissions for: <span className="font-medium">{selectedRole}</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testScenarios.length}</div>
            <p className="text-xs text-muted-foreground">Permission scenarios</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Object.values(testResults).filter((r) => r === "pass").length}
            </div>
            <p className="text-xs text-muted-foreground">Tests passed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {Object.values(testResults).filter((r) => r === "fail").length}
            </div>
            <p className="text-xs text-muted-foreground">Tests failed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(testResults).length > 0
                ? Math.round(
                    (Object.values(testResults).filter((r) => r === "pass").length / Object.keys(testResults).length) *
                      100,
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Overall success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Test Scenarios */}
      <Tabs defaultValue="scenarios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scenarios">Test Scenarios</TabsTrigger>
          <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
          <TabsTrigger value="audit">Test Audit Log</TabsTrigger>
        </TabsList>

        {/* Test Scenarios */}
        <TabsContent value="scenarios">
          <div className="space-y-4">
            {testScenarios.map((scenario) => (
              <Card key={scenario.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getTestIcon(testResults[scenario.id])}
                      {scenario.name}
                      <Badge variant="outline">{scenario.category}</Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {getTestBadge(testResults[scenario.id])}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => runSingleTest(scenario.id)}
                        disabled={testResults[scenario.id] === "pending"}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-5">
                    {Object.entries(scenario.roles).map(([role, hasAccess]) => (
                      <div
                        key={role}
                        className={`flex items-center justify-between p-2 rounded border ${
                          role === selectedRole ? "bg-blue-50 border-blue-200" : ""
                        }`}
                      >
                        <span className="text-sm font-medium">{role}</span>
                        {hasAccess ? (
                          <Unlock className="h-4 w-4 text-green-500" />
                        ) : (
                          <Lock className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm">
                      <span className="font-medium">Expected Result for {selectedRole}: </span>
                      {scenario.roles[selectedRole as keyof typeof scenario.roles] ? (
                        <span className="text-green-600 font-medium">Access Granted</span>
                      ) : (
                        <span className="text-red-600 font-medium">Access Denied</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Permission Matrix */}
        <TabsContent value="matrix">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>Complete overview of permissions across all roles and scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Test Scenario</th>
                      <th className="text-center p-2">CEO</th>
                      <th className="text-center p-2">Administrator</th>
                      <th className="text-center p-2">Operations Manager</th>
                      <th className="text-center p-2">Finance Staff</th>
                      <th className="text-center p-2">Customer Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testScenarios.map((scenario) => (
                      <tr key={scenario.id} className="border-b">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{scenario.name}</div>
                            <div className="text-xs text-muted-foreground">{scenario.category}</div>
                          </div>
                        </td>
                        {Object.entries(scenario.roles).map(([role, hasAccess]) => (
                          <td key={role} className="text-center p-2">
                            {hasAccess ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Test Audit Log */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Test Audit Log</CardTitle>
              <CardDescription>History of permission tests and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <div className="font-medium">Permission Test Suite Completed</div>
                    <div className="text-sm text-muted-foreground">Tested CEO role permissions - 5/5 tests passed</div>
                    <div className="text-xs text-muted-foreground">2 minutes ago</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <div className="flex-1">
                    <div className="font-medium">Permission Test Failed</div>
                    <div className="text-sm text-muted-foreground">
                      Customer Service role attempted to access financial reports
                    </div>
                    <div className="text-xs text-muted-foreground">15 minutes ago</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div className="flex-1">
                    <div className="font-medium">Role Permissions Updated</div>
                    <div className="text-sm text-muted-foreground">
                      Finance Staff role permissions modified and tested successfully
                    </div>
                    <div className="text-xs text-muted-foreground">1 hour ago</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-medium">Security Audit Completed</div>
                    <div className="text-sm text-muted-foreground">
                      All user roles tested for compliance - No violations found
                    </div>
                    <div className="text-xs text-muted-foreground">3 hours ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
