"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  LogOut,
  DollarSign,
  UserCheck,
  UserX,
  Clock,
  Package,
  Shield,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SuperUserDashboard() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [packages, setPackages] = useState(mockPackages)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] = useState(false)
  const [isAddPackageDialogOpen, setIsAddPackageDialogOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    package: "",
    status: "active",
  })
  const [newPackage, setNewPackage] = useState({
    name: "",
    speed: "",
    price: "",
    description: "",
  })

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesFilter = filterStatus === "all" || customer.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    const customer = {
      id: customers.length + 1,
      ...newCustomer,
      joinDate: new Date().toLocaleDateString("id-ID"),
      lastPayment: new Date().toLocaleDateString("id-ID"),
    }
    setCustomers([...customers, customer])
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      package: "",
      status: "active",
    })
    setIsAddCustomerDialogOpen(false)
  }

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault()
    const packageData = {
      id: packages.length + 1,
      ...newPackage,
      customers: 0,
      status: "active",
    }
    setPackages([...packages, packageData])
    setNewPackage({
      name: "",
      speed: "",
      price: "",
      description: "",
    })
    setIsAddPackageDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspend</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    suspended: customers.filter((c) => c.status === "suspended").length,
    pending: customers.filter((c) => c.status === "pending").length,
    revenue: customers.filter((c) => c.status === "active").length * 250000,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">WiFi Billing - Super User Dashboard</h1>
                  <p className="text-sm text-gray-600">Administrator Panel</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Selamat datang, Administrator</span>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pelanggan</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pelanggan Aktif</p>
                  <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Suspend</p>
                  <p className="text-3xl font-bold text-red-600">{stats.suspended}</p>
                </div>
                <UserX className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendapatan/Bulan</p>
                  <p className="text-2xl font-bold text-purple-600">Rp {stats.revenue.toLocaleString("id-ID")}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="customers">Pelanggan</TabsTrigger>
            <TabsTrigger value="packages">Paket Internet</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Data Pelanggan</CardTitle>
                    <CardDescription>Kelola semua data pelanggan WiFi</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Dialog open={isAddCustomerDialogOpen} onOpenChange={setIsAddCustomerDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Pelanggan
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Tambah Pelanggan Baru</DialogTitle>
                          <DialogDescription>Masukkan data pelanggan baru</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddCustomer} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                              id="name"
                              value={newCustomer.name}
                              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                              placeholder="Masukkan nama lengkap"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={newCustomer.email}
                              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                              placeholder="Masukkan email"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">No. Telepon</Label>
                            <Input
                              id="phone"
                              value={newCustomer.phone}
                              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                              placeholder="Masukkan nomor telepon"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                              id="address"
                              value={newCustomer.address}
                              onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                              placeholder="Masukkan alamat lengkap"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="package">Paket Internet</Label>
                            <Select
                              value={newCustomer.package}
                              onValueChange={(value) => setNewCustomer({ ...newCustomer, package: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih paket" />
                              </SelectTrigger>
                              <SelectContent>
                                {packages.map((pkg) => (
                                  <SelectItem key={pkg.id} value={pkg.name}>
                                    {pkg.name} - Rp {Number.parseInt(pkg.price).toLocaleString("id-ID")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                              value={newCustomer.status}
                              onValueChange={(value) => setNewCustomer({ ...newCustomer, status: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Aktif</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="suspended">Suspend</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button type="submit" className="flex-1">
                              Simpan
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setIsAddCustomerDialogOpen(false)}>
                              Batal
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Cari pelanggan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="suspended">Suspend</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Customer Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telepon</TableHead>
                        <TableHead>Paket</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Bergabung</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>{customer.package}</TableCell>
                          <TableCell>{getStatusBadge(customer.status)}</TableCell>
                          <TableCell>{customer.joinDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Paket Internet</CardTitle>
                    <CardDescription>Kelola paket internet yang tersedia</CardDescription>
                  </div>
                  <Dialog open={isAddPackageDialogOpen} onOpenChange={setIsAddPackageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Paket
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Tambah Paket Baru</DialogTitle>
                        <DialogDescription>Buat paket internet baru</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddPackage} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="packageName">Nama Paket</Label>
                          <Input
                            id="packageName"
                            value={newPackage.name}
                            onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                            placeholder="Contoh: Premium 50 Mbps"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="speed">Kecepatan (Mbps)</Label>
                          <Input
                            id="speed"
                            value={newPackage.speed}
                            onChange={(e) => setNewPackage({ ...newPackage, speed: e.target.value })}
                            placeholder="Contoh: 50"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Harga (Rp)</Label>
                          <Input
                            id="price"
                            value={newPackage.price}
                            onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                            placeholder="Contoh: 400000"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Deskripsi</Label>
                          <Textarea
                            id="description"
                            value={newPackage.description}
                            onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                            placeholder="Deskripsi paket..."
                          />
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" className="flex-1">
                            Simpan
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setIsAddPackageDialogOpen(false)}>
                            Batal
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <Card key={pkg.id} className="relative">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Package className="h-8 w-8 text-blue-600" />
                          <Badge variant="secondary">{pkg.customers} pelanggan</Badge>
                        </div>
                        <CardTitle>{pkg.name}</CardTitle>
                        <CardDescription>{pkg.speed} Mbps</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-3xl font-bold">
                              Rp {Number.parseInt(pkg.price).toLocaleString("id-ID")}
                            </p>
                            <p className="text-sm text-gray-600">per bulan</p>
                          </div>
                          <p className="text-sm">{pkg.description}</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Laporan Pelanggan</CardTitle>
                  <CardDescription>Statistik pelanggan bulanan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Pelanggan Baru Bulan Ini</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pelanggan Berhenti</span>
                      <span className="font-bold text-red-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tingkat Retensi</span>
                      <span className="font-bold text-green-600">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Laporan Keuangan</CardTitle>
                  <CardDescription>Pendapatan bulanan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Pendapatan Bulan Ini</span>
                      <span className="font-bold">Rp 15.750.000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tunggakan</span>
                      <span className="font-bold text-red-600">Rp 2.100.000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Proyeksi Bulan Depan</span>
                      <span className="font-bold text-green-600">Rp 16.200.000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Sistem</CardTitle>
                <CardDescription>Konfigurasi sistem WiFi billing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Nama Perusahaan</Label>
                    <Input defaultValue="PT. WiFi Nusantara" />
                  </div>
                  <div className="space-y-2">
                    <Label>Alamat Perusahaan</Label>
                    <Textarea defaultValue="Jl. Teknologi No. 123, Jakarta Selatan" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Perusahaan</Label>
                    <Input defaultValue="info@wifinusantara.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Telepon Perusahaan</Label>
                    <Input defaultValue="021-12345678" />
                  </div>
                  <Button>Simpan Pengaturan</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Mock data
const mockCustomers = [
  {
    id: 1,
    name: "Ahmad Wijaya",
    email: "ahmad.wijaya@email.com",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123, Jakarta",
    package: "Standard 20 Mbps",
    status: "active",
    joinDate: "15/01/2024",
    lastPayment: "15/12/2024",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@email.com",
    phone: "081234567891",
    address: "Jl. Sudirman No. 456, Bandung",
    package: "Premium 50 Mbps",
    status: "active",
    joinDate: "20/01/2024",
    lastPayment: "20/12/2024",
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "081234567892",
    address: "Jl. Gatot Subroto No. 789, Surabaya",
    package: "Basic 10 Mbps",
    status: "suspended",
    joinDate: "10/02/2024",
    lastPayment: "10/11/2024",
  },
  {
    id: 4,
    name: "Dewi Sartika",
    email: "dewi.sartika@email.com",
    phone: "081234567893",
    address: "Jl. Diponegoro No. 321, Yogyakarta",
    package: "Ultimate 100 Mbps",
    status: "pending",
    joinDate: "25/02/2024",
    lastPayment: "-",
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    email: "eko.prasetyo@email.com",
    phone: "081234567894",
    address: "Jl. Ahmad Yani No. 654, Medan",
    package: "Standard 20 Mbps",
    status: "active",
    joinDate: "05/03/2024",
    lastPayment: "05/12/2024",
  },
]

const mockPackages = [
  {
    id: 1,
    name: "Basic 10 Mbps",
    speed: "10",
    price: "150000",
    description: "Paket dasar untuk kebutuhan internet ringan",
    customers: 15,
    status: "active",
  },
  {
    id: 2,
    name: "Standard 20 Mbps",
    speed: "20",
    price: "250000",
    description: "Paket standar untuk keluarga kecil",
    customers: 32,
    status: "active",
  },
  {
    id: 3,
    name: "Premium 50 Mbps",
    speed: "50",
    price: "400000",
    description: "Paket premium untuk streaming dan gaming",
    customers: 28,
    status: "active",
  },
  {
    id: 4,
    name: "Ultimate 100 Mbps",
    speed: "100",
    price: "600000",
    description: "Paket ultimate untuk kebutuhan bisnis",
    customers: 12,
    status: "active",
  },
]
