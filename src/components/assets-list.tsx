"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Users,
  Settings,
  Search,
  Menu,
  LayoutDashboard,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for hardware assets
const hardwareAssets = [
  { id: 1, name: "Dell XPS 15", type: "Laptop", serialNumber: "DLL-XPS-001", status: "In Use" },
  { id: 2, name: "iPhone 13", type: "Smartphone", serialNumber: "APL-IP13-002", status: "In Use" },
  { id: 3, name: "HP ProLiant DL380", type: "Server", serialNumber: "HP-SVR-003", status: "Maintenance" },
  { id: 4, name: "Lenovo ThinkPad X1", type: "Laptop", serialNumber: "LNV-TPX1-004", status: "Available" },
  { id: 5, name: "Samsung Galaxy S21", type: "Smartphone", serialNumber: "SAM-GS21-005", status: "In Use" },
]

// Mock data for software assets
const softwareAssets = [
  { id: 1, name: "Microsoft Office 365", licenseId: "MS-O365-001", expiryDate: "2024-12-31", status: "Active" },
  { id: 2, name: "Adobe Creative Cloud", licenseId: "ADO-CC-002", expiryDate: "2024-06-30", status: "Active" },
  { id: 3, name: "AutoCAD", licenseId: "ATC-CAD-003", expiryDate: "2023-12-31", status: "Expiring Soon" },
  { id: 4, name: "VMware vSphere", licenseId: "VMW-VS-004", expiryDate: "2025-03-15", status: "Active" },
  { id: 5, name: "Salesforce", licenseId: "SF-CRM-005", expiryDate: "2024-09-30", status: "Active" },
]

export default function AssetsListPage() {
  const [hardwareSearchTerm, setHardwareSearchTerm] = useState("")
  const [softwareSearchTerm, setSoftwareSearchTerm] = useState("")

  const filteredHardwareAssets = hardwareAssets.filter(asset =>
    asset.name.toLowerCase().includes(hardwareSearchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(hardwareSearchTerm.toLowerCase()) ||
    asset.serialNumber.toLowerCase().includes(hardwareSearchTerm.toLowerCase()) ||
    asset.status.toLowerCase().includes(hardwareSearchTerm.toLowerCase())
  )

  const filteredSoftwareAssets = softwareAssets.filter(asset =>
    asset.name.toLowerCase().includes(softwareSearchTerm.toLowerCase()) ||
    asset.licenseId.toLowerCase().includes(softwareSearchTerm.toLowerCase()) ||
    asset.status.toLowerCase().includes(softwareSearchTerm.toLowerCase())
  )

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Package className="h-6 w-6" />
                  <span className="font-bold">IT Asset Manager</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="#">
                    <Package className="h-4 w-4" />
                    Assets
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Users className="h-4 w-4" />
                    Users
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings className="h-4 w-4" />
                    Settings
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
            <SidebarTrigger className="md:hidden">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>
            <h1 className="text-2xl font-bold ml-4">Assets List</h1>
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            <Tabs defaultValue="hardware" className="w-full">
              <TabsList>
                <TabsTrigger value="hardware">Hardware Assets</TabsTrigger>
                <TabsTrigger value="software">Software Assets</TabsTrigger>
              </TabsList>
              <TabsContent value="hardware">
                <Card>
                  <CardHeader>
                    <CardTitle>Hardware Assets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search hardware assets..."
                          value={hardwareSearchTerm}
                          onChange={(e) => setHardwareSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Serial Number</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHardwareAssets.map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell className="font-medium">{asset.name}</TableCell>
                            <TableCell>{asset.type}</TableCell>
                            <TableCell>{asset.serialNumber}</TableCell>
                            <TableCell>
                              <Badge variant={asset.status === "In Use" ? "default" : asset.status === "Available" ? "secondary" : "destructive"}>
                                {asset.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="software">
                <Card>
                  <CardHeader>
                    <CardTitle>Software Assets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search software assets..."
                          value={softwareSearchTerm}
                          onChange={(e) => setSoftwareSearchTerm(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>License ID</TableHead>
                          <TableHead>Expiry Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSoftwareAssets.map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell className="font-medium">{asset.name}</TableCell>
                            <TableCell>{asset.licenseId}</TableCell>
                            <TableCell>{asset.expiryDate}</TableCell>
                            <TableCell>
                              <Badge variant={asset.status === "Active" ? "default" : asset.status === "Expiring Soon" ? "destructive" : "destructive"}>
                                {asset.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}