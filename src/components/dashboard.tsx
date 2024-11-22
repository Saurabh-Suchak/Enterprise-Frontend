"use client";

import { PropsWithChildren, useState } from "react";
// import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Laptop, Server, Smartphone, Search } from "lucide-react";

// Mock data for IT assets
const assets = [
  {
    id: 1,
    name: "Dell XPS 15",
    type: "Laptop",
    status: "In Use",
    assignedTo: "John Doe",
    lastUpdated: "2023-11-01",
  },
  {
    id: 2,
    name: "iPhone 13",
    type: "Smartphone",
    status: "In Use",
    assignedTo: "Jane Smith",
    lastUpdated: "2023-10-15",
  },
  {
    id: 3,
    name: "HP ProLiant DL380",
    type: "Server",
    status: "Maintenance",
    assignedTo: "IT Department",
    lastUpdated: "2023-11-05",
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1",
    type: "Laptop",
    status: "Available",
    assignedTo: "-",
    lastUpdated: "2023-11-02",
  },
  {
    id: 5,
    name: "Samsung Galaxy S21",
    type: "Smartphone",
    status: "In Use",
    assignedTo: "Mike Johnson",
    lastUpdated: "2023-10-20",
  },
];

export default function ITAssetDashboard({ children }: PropsWithChildren) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const assetCounts = {
    total: assets.length,
    inUse: assets.filter((asset) => asset.status === "In Use").length,
    available: assets.filter((asset) => asset.status === "Available").length,
    maintenance: assets.filter((asset) => asset.status === "Maintenance")
      .length,
  };

  return (


    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        {children}
        <h1 className="text-2xl font-bold ml-4">
          IT Asset Management Dashboard
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Assets
              </CardTitle>
              <Laptop className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetCounts.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Use</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetCounts.inUse}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetCounts.available}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                In Maintenance
              </CardTitle>
              <Laptop className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assetCounts.maintenance}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Asset Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          asset.status === "In Use"
                            ? "default"
                            : asset.status === "Available"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{asset.assignedTo}</TableCell>
                    <TableCell>{asset.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
