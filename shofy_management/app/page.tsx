"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wifi, Shield, Users, BarChart3, Settings, Eye, EyeOff, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "",
  })
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulasi login - dalam aplikasi nyata, ini akan mengirim ke API
    if (loginData.username && loginData.password && loginData.role) {
      if (loginData.role === "superuser") {
        router.push("/dashboard/superuser")
      } else {
        router.push("/dashboard/user")
      }
    }
  }

  const [searchId, setSearchId] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchResult, setShowSearchResult] = useState(false)

  const handleSearchCustomer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchId.trim()) return

    setIsSearching(true)

    // Simulasi pencarian - dalam aplikasi nyata akan hit API
    setTimeout(() => {
      const customer = mockCustomersForSearch.find((c) => c.wifiId === searchId.trim())
      setSearchResult(customer || null)
      setShowSearchResult(true)
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wifi className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">WiFi Billing System</h1>
                <p className="text-sm text-gray-600">Sistem Manajemen Pelanggan WiFi</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kelola Pelanggan WiFi Anda dengan Mudah</h2>
            <p className="text-xl text-gray-600 mb-8">
              Sistem billing WiFi yang memudahkan pengelolaan data pelanggan, paket internet, dan pembayaran
            </p>
          </div>

          {/* Customer Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Cek Data Pelanggan</CardTitle>
                <CardDescription>Masukkan ID WiFi Anda untuk melihat informasi akun</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearchCustomer} className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Masukkan ID WiFi (contoh: WIFI001)"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button type="submit" disabled={isSearching}>
                      {isSearching ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Mencari...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Cari
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Search Result */}
                {showSearchResult && (
                  <div className="mt-6 p-4 border rounded-lg">
                    {searchResult ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-green-600">Data Ditemukan!</h3>
                          <Badge
                            className={`${
                              searchResult.status === "active"
                                ? "bg-green-100 text-green-800"
                                : searchResult.status === "suspended"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {searchResult.status === "active"
                              ? "Aktif"
                              : searchResult.status === "suspended"
                                ? "Suspend"
                                : "Pending"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">ID WiFi:</p>
                            <p className="font-medium">{searchResult.wifiId}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Nama:</p>
                            <p className="font-medium">{searchResult.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Paket:</p>
                            <p className="font-medium">{searchResult.package}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Status:</p>
                            <p className="font-medium">
                              {searchResult.status === "active"
                                ? "Aktif"
                                : searchResult.status === "suspended"
                                  ? "Suspend"
                                  : "Pending"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Tanggal Bergabung:</p>
                            <p className="font-medium">{searchResult.joinDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Pembayaran Terakhir:</p>
                            <p className="font-medium">{searchResult.lastPayment}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-gray-600">Alamat:</p>
                            <p className="font-medium">{searchResult.address}</p>
                          </div>
                        </div>
                        {searchResult.status === "suspended" && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-red-800 text-sm">
                              <strong>Perhatian:</strong> Akun Anda sedang dalam status suspend. Silakan hubungi
                              customer service untuk informasi lebih lanjut.
                            </p>
                          </div>
                        )}
                        {searchResult.status === "pending" && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-yellow-800 text-sm">
                              <strong>Info:</strong> Akun Anda sedang dalam proses verifikasi. Mohon tunggu konfirmasi
                              dari tim kami.
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <div className="text-red-600 mb-2">
                          <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        </div>
                        <h3 className="text-lg font-semibold text-red-600 mb-1">Data Tidak Ditemukan</h3>
                        <p className="text-gray-600 text-sm">
                          ID WiFi yang Anda masukkan tidak ditemukan dalam sistem. Pastikan ID WiFi sudah benar atau
                          hubungi customer service.
                        </p>
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-blue-800 text-sm">
                            <strong>Bantuan:</strong> ID WiFi biasanya terdapat pada router atau dokumen kontrak Anda.
                            Format: WIFI001, WIFI002, dst.
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="mt-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowSearchResult(false)
                          setSearchId("")
                          setSearchResult(null)
                        }}
                      >
                        Cari Lagi
                      </Button>
                    </div>
                  </div>
                )}

                {/* Demo Search IDs */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Demo ID WiFi untuk Testing:</h4>
                  <div className="text-xs space-y-1 text-gray-600">
                    <p>
                      <strong>WIFI001</strong> - Ahmad Wijaya (Aktif)
                    </p>
                    <p>
                      <strong>WIFI002</strong> - Siti Nurhaliza (Aktif)
                    </p>
                    <p>
                      <strong>WIFI003</strong> - Budi Santoso (Suspend)
                    </p>
                    <p>
                      <strong>WIFI004</strong> - Dewi Sartika (Pending)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Manajemen Pelanggan</h3>
              <p className="text-gray-600">Kelola data pelanggan dengan mudah dan terorganisir</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Laporan & Analitik</h3>
              <p className="text-gray-600">Pantau performa bisnis dengan laporan detail</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Konfigurasi Mudah</h3>
              <p className="text-gray-600">Setup sistem sesuai kebutuhan bisnis Anda</p>
            </div>
          </div>

          {/* Login Section */}
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Masuk ke Sistem</CardTitle>
                <CardDescription>Silakan login untuk mengakses dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="login">Login</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role Pengguna</Label>
                        <Select
                          value={loginData.role}
                          onValueChange={(value) => setLoginData({ ...loginData, role: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih role pengguna" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                User - Operator
                              </div>
                            </SelectItem>
                            <SelectItem value="superuser">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Super User - Administrator
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Masukkan username"
                          value={loginData.username}
                          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Masuk ke Dashboard
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Demo Credentials:</h4>
                  <div className="text-xs space-y-1 text-gray-600">
                    <p>
                      <strong>User:</strong> user123 / password123
                    </p>
                    <p>
                      <strong>Super User:</strong> admin123 / admin123
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 WiFi Billing System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Mock data untuk pencarian pelanggan
const mockCustomersForSearch = [
  {
    wifiId: "WIFI001",
    name: "Ahmad Wijaya",
    email: "ahmad.wijaya@email.com",
    phone: "081234567890",
    address: "Jl. Merdeka No. 123, Jakarta Pusat",
    package: "Standard 20 Mbps - Rp 250.000/bulan",
    status: "active",
    joinDate: "15 Januari 2024",
    lastPayment: "15 Desember 2024",
  },
  {
    wifiId: "WIFI002",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@email.com",
    phone: "081234567891",
    address: "Jl. Sudirman No. 456, Bandung",
    package: "Premium 50 Mbps - Rp 400.000/bulan",
    status: "active",
    joinDate: "20 Januari 2024",
    lastPayment: "20 Desember 2024",
  },
  {
    wifiId: "WIFI003",
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "081234567892",
    address: "Jl. Gatot Subroto No. 789, Surabaya",
    package: "Basic 10 Mbps - Rp 150.000/bulan",
    status: "suspended",
    joinDate: "10 Februari 2024",
    lastPayment: "10 November 2024",
  },
  {
    wifiId: "WIFI004",
    name: "Dewi Sartika",
    email: "dewi.sartika@email.com",
    phone: "081234567893",
    address: "Jl. Diponegoro No. 321, Yogyakarta",
    package: "Ultimate 100 Mbps - Rp 600.000/bulan",
    status: "pending",
    joinDate: "25 Februari 2024",
    lastPayment: "-",
  },
]
