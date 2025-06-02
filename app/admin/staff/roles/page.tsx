import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Users, Settings, Eye, Edit, Plus, UserCheck, Lock, Unlock, Crown, Briefcase } from "lucide-react"

export const metadata: Metadata = {
  title: "Roles & Permissions | DCF Logistics Admin",
  description: "Manage user roles and permissions for the admin system",
}

const roles = [
  {
    id: 1,
    name: "CEO",
    description: "Full system access with all administrative privileges",
    userCount: 1,
    color: "bg-purple-500",
    icon: Crown,
    permissions: {
      dashboard: true,
      invoicing: true,
      operations: true,
      customers: true,
      financial: true,
      reports: true,
      staff: true,
      settings: true,
      systemConfig: true,
    },
  },
  {
    id: 2,
    name: "Administrator",
    description: "Full administrative access except system configuration",
    userCount: 2,
    color: "bg-red-500",
    icon: Shield,
    permissions: {
      dashboard: true,
      invoicing: true,
      operations: true,
      customers: true,
      financial: true,
      reports: true,
      staff: true,
      settings: true,
      systemConfig: false,
    },
  },
  {
    id: 3,
    name: "Operations Manager",
    description: "Manage operations, shipments, and customer relations",
    userCount: 5,
    color: "bg-blue-500",
    icon: Briefcase,
    permissions: {
      dashboard: true,
      invoicing: false,
      operations: true,
      customers: true,
      financial: false,
      reports: true,
      staff: false,
      settings: false,
      systemConfig: false,
    },
  },
  {
    id: 4,
    name: "Finance Staff",
    description: "Handle invoicing, payments, and financial operations",
    userCount: 3,
    color: "bg-green-500",
    icon: UserCheck,
    permissions: {
      dashboard: true,
      invoicing: true,
      operations: false,
      customers: true,
      financial: true,
      reports: true,
      staff: false,
      settings: false,
      systemConfig: false,
    },
  },
  {
    id: 5,
    name: "Customer Service",
    description: "Customer support and basic operational tasks",
    userCount: 8,
    color: "bg-amber-500",
    icon: Users,
    permissions: {
      dashboard: true,
      invoicing: false,
      operations: false,
      customers: true,
      financial: false,
      reports: false,
      staff: false,
      settings: false,
      systemConfig: false,
    },
  },
]

const permissionCategories = [
  {
    name: "Dashboard",
    key: "dashboard",
    description: "Access to main dashboard and overview",
  },
  {
    name: "Invoicing",
    key: "invoicing",
    description: "Create, edit, and manage invoices",
  },
  {
    name: "Operations",
    key: "operations",
    description: "Manage shipments, fleet, and warehouse",
  },
  {
    name: "Customers",
    key: "customers",
    description: "Customer management and relations",
  },
  {
    name: "Financial",
    key: "financial",
    description: "Financial reports and accounting",
  },
  {
    name: "Reports",
    key: "reports",
    description: "Generate and view reports",
  },
  {
    name: "Staff Management",
    key: "staff",
    description: "Manage staff and user accounts",
  },
  {
    name: "Settings",
    key: "settings",
    description: "Application settings and configuration",
  },
  {
    name: "System Configuration",
    key: "systemConfig",
    description: "Advanced system configuration",
  },
]

export default function RolesPermissionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and access permissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Permission Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </div>
      </div>

      {/* Role Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
            <p className="text-xs text-muted-foreground">Active role definitions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.reduce((sum, role) => sum + role.userCount, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">CEO + Administrators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permission Groups</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissionCategories.length}</div>
            <p className="text-xs text-muted-foreground">Permission categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Role Management */}
      <Tabs defaultValue="roles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Role Overview</TabsTrigger>
          <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
          <TabsTrigger value="users">User Assignment</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        {/* Role Overview */}
        <TabsContent value="roles">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <Card key={role.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`p-2 rounded-md ${role.color} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {role.name}
                    </CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Users:</span>
                      <Badge variant="outline">{role.userCount}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Permissions:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(role.permissions)
                          .filter(([_, hasPermission]) => hasPermission)
                          .slice(0, 4)
                          .map(([permission]) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        {Object.values(role.permissions).filter(Boolean).length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{Object.values(role.permissions).filter(Boolean).length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Permission Matrix */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Permission Matrix</CardTitle>
              <CardDescription>Overview of permissions across all roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Permission</th>
                      {roles.map((role) => (
                        <th key={role.id} className="text-center p-2 min-w-24">
                          <div className="flex flex-col items-center gap-1">
                            <div className={`p-1 rounded ${role.color} text-white`}>
                              <role.icon className="h-3 w-3" />
                            </div>
                            <span className="text-xs">{role.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissionCategories.map((permission) => (
                      <tr key={permission.key} className="border-b">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{permission.name}</div>
                            <div className="text-xs text-muted-foreground">{permission.description}</div>
                          </div>
                        </td>
                        {roles.map((role) => (
                          <td key={role.id} className="text-center p-2">
                            {role.permissions[permission.key as keyof typeof role.permissions] ? (
                              <div className="flex justify-center">
                                <Unlock className="h-4 w-4 text-green-500" />
                              </div>
                            ) : (
                              <div className="flex justify-center">
                                <Lock className="h-4 w-4 text-red-500" />
                              </div>
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

        {/* User Assignment */}
        <TabsContent value="users">
          <div className="space-y-4">
            {roles.map((role) => {
              const Icon = role.icon
              return (
                <Card key={role.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`p-2 rounded-md ${role.color} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {role.name}
                      <Badge variant="outline">{role.userCount} users</Badge>
                    </CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Sample users for each role */}
                      {role.name === "CEO" && (
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-purple-600">JD</span>
                            </div>
                            <div>
                              <div className="font-medium">John Doe</div>
                              <div className="text-sm text-muted-foreground">john.doe@dcflogistics.com</div>
                            </div>
                          </div>
                          <Badge variant="default">Active</Badge>
                        </div>
                      )}

                      {role.name === "Administrator" && (
                        <>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-red-600">AS</span>
                              </div>
                              <div>
                                <div className="font-medium">Alice Smith</div>
                                <div className="text-sm text-muted-foreground">alice.smith@dcflogistics.com</div>
                              </div>
                            </div>
                            <Badge variant="default">Active</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-red-600">BJ</span>
                              </div>
                              <div>
                                <div className="font-medium">Bob Johnson</div>
                                <div className="text-sm text-muted-foreground">bob.johnson@dcflogistics.com</div>
                              </div>
                            </div>
                            <Badge variant="default">Active</Badge>
                          </div>
                        </>
                      )}

                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Assign User to {role.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Audit Log */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Permission Audit Log</CardTitle>
              <CardDescription>Recent changes to roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Edit className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Role permissions updated</div>
                    <div className="text-sm text-muted-foreground">
                      Finance Staff role permissions modified by Alice Smith
                    </div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Plus className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">New user assigned</div>
                    <div className="text-sm text-muted-foreground">Sarah Wilson assigned to Customer Service role</div>
                    <div className="text-xs text-muted-foreground">1 day ago</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Role created</div>
                    <div className="text-sm text-muted-foreground">
                      New "Warehouse Manager" role created by John Doe
                    </div>
                    <div className="text-xs text-muted-foreground">3 days ago</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Lock className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Permission revoked</div>
                    <div className="text-sm text-muted-foreground">
                      System Configuration access removed from Operations Manager role
                    </div>
                    <div className="text-xs text-muted-foreground">1 week ago</div>
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
