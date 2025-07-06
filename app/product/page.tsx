import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Search, SlidersHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Logo" />
            <span>TokoKita</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium">
              Beranda
            </Link>
            <Link href="/produk" className="font-medium text-primary">
              Produk
            </Link>
            <Link href="/tentang" className="font-medium">
              Tentang Kami
            </Link>
            <Link href="/kontak" className="font-medium">
              Kontak
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Image src="/placeholder.svg?height=20&width=20" width={20} height={20} alt="Cart" />
              <span className="sr-only">Keranjang</span>
            </Button>
            <Button>Masuk</Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6 md:py-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Katalog Produk</h1>
          <p className="text-muted-foreground">Temukan berbagai produk berkualitas untuk kebutuhan Anda</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Filter Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="sticky top-20 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filter</h3>
                <Button variant="ghost" size="sm" className="h-8 text-sm">
                  Reset
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Cari produk..." className="w-full pl-8" />
              </div>

              <Separator />

              <Accordion type="multiple" defaultValue={["kategori", "harga", "rating"]} className="w-full">
                <AccordionItem value="kategori">
                  <AccordionTrigger className="text-base">Kategori</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox id={`category-${category.id}`} />
                          <Label htmlFor={`category-${category.id}`} className="font-normal">
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="harga">
                  <AccordionTrigger className="text-base">Rentang Harga</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-1" />
                        <Label htmlFor="price-1" className="font-normal">
                          Dibawah Rp 500.000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-2" />
                        <Label htmlFor="price-2" className="font-normal">
                          Rp 500.000 - Rp 1.000.000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-3" />
                        <Label htmlFor="price-3" className="font-normal">
                          Rp 1.000.000 - Rp 5.000.000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price-4" />
                        <Label htmlFor="price-4" className="font-normal">
                          Diatas Rp 5.000.000
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="rating">
                  <AccordionTrigger className="text-base">Rating</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`rating-${rating}`} />
                          <Label htmlFor={`rating-${rating}`} className="font-normal flex items-center">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                                />
                              ))}
                            <span className="ml-1">& Keatas</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="diskon">
                  <AccordionTrigger className="text-base">Diskon</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="discount-1" />
                        <Label htmlFor="discount-1" className="font-normal">
                          Diskon 10%
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="discount-2" />
                        <Label htmlFor="discount-2" className="font-normal">
                          Diskon 20%
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="discount-3" />
                        <Label htmlFor="discount-3" className="font-normal">
                          Diskon 30%
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="discount-4" />
                        <Label htmlFor="discount-4" className="font-normal">
                          Diskon 40% & Lebih
                        </Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="pt-4">
                <Button className="w-full">Terapkan Filter</Button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-sm text-muted-foreground">
                Menampilkan <span className="font-medium text-foreground">1-12</span> dari{" "}
                <span className="font-medium text-foreground">36</span> produk
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="h-8 gap-1 sm:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter
                </Button>
                <Select defaultValue="terbaru">
                  <SelectTrigger className="w-full sm:w-[180px] h-8">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terbaru">Terbaru</SelectItem>
                    <SelectItem value="terlaris">Terlaris</SelectItem>
                    <SelectItem value="harga-terendah">Harga: Rendah ke Tinggi</SelectItem>
                    <SelectItem value="harga-tertinggi">Harga: Tinggi ke Rendah</SelectItem>
                    <SelectItem value="rating">Rating Tertinggi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link href={`/produk/${product.id}`} key={product.id} className="group">
                  <div className="overflow-hidden rounded-lg border bg-background transition-colors">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      {product.discount && (
                        <span className="absolute top-2 right-2 text-xs font-medium bg-primary text-primary-foreground px-2 py-1 rounded">
                          Diskon {product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                              />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            Rp {product.originalPrice.toLocaleString("id-ID")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  3
                </Button>
                <span className="mx-1">...</span>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  8
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t py-6 mt-12">
        <div className="container flex flex-col md:flex-row justify-between gap-4 md:gap-8">
          <div className="flex flex-col gap-2 md:w-1/4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Logo" />
              <span>TokoKita</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Menyediakan produk berkualitas dengan harga terjangkau sejak 2020.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-3/4">
            <div className="space-y-3">
              <h4 className="font-medium">Produk</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/produk" className="text-sm text-muted-foreground hover:text-foreground">
                    Semua Produk
                  </Link>
                </li>
                <li>
                  <Link href="/produk/terbaru" className="text-sm text-muted-foreground hover:text-foreground">
                    Produk Terbaru
                  </Link>
                </li>
                <li>
                  <Link href="/produk/terlaris" className="text-sm text-muted-foreground hover:text-foreground">
                    Produk Terlaris
                  </Link>
                </li>
                <li>
                  <Link href="/produk/diskon" className="text-sm text-muted-foreground hover:text-foreground">
                    Produk Diskon
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Informasi</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/tentang" className="text-sm text-muted-foreground hover:text-foreground">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="text-sm text-muted-foreground hover:text-foreground">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Bantuan</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/cara-pemesanan" className="text-sm text-muted-foreground hover:text-foreground">
                    Cara Pemesanan
                  </Link>
                </li>
                <li>
                  <Link href="/pengiriman" className="text-sm text-muted-foreground hover:text-foreground">
                    Informasi Pengiriman
                  </Link>
                </li>
                <li>
                  <Link href="/pembayaran" className="text-sm text-muted-foreground hover:text-foreground">
                    Metode Pembayaran
                  </Link>
                </li>
                <li>
                  <Link href="/pengembalian" className="text-sm text-muted-foreground hover:text-foreground">
                    Kebijakan Pengembalian
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container flex flex-col md:flex-row items-center justify-between py-4 md:py-6 border-t mt-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TokoKita. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="/kebijakan-privasi" className="text-sm text-muted-foreground hover:text-foreground">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="text-sm text-muted-foreground hover:text-foreground">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Data contoh
const categories = [
  { id: 1, name: "Elektronik", slug: "elektronik" },
  { id: 2, name: "Fashion", slug: "fashion" },
  { id: 3, name: "Kesehatan", slug: "kesehatan" },
  { id: 4, name: "Rumah Tangga", slug: "rumah-tangga" },
  { id: 5, name: "Olahraga", slug: "olahraga" },
  { id: 6, name: "Mainan & Hobi", slug: "mainan-hobi" },
  { id: 7, name: "Otomotif", slug: "otomotif" },
  { id: 8, name: "Buku & Alat Tulis", slug: "buku-alat-tulis" },
]

const products = [
  {
    id: 1,
    name: "Smartphone XYZ Pro",
    price: 4500000,
    originalPrice: 5000000,
    discount: 10,
    rating: 4,
    reviews: 120,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Laptop UltraBook S",
    price: 12000000,
    originalPrice: 12600000,
    discount: 5,
    rating: 5,
    reviews: 85,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Headphone Wireless",
    price: 850000,
    originalPrice: null,
    discount: null,
    rating: 4,
    reviews: 64,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Smartwatch Fitness",
    price: 1200000,
    originalPrice: 1400000,
    discount: 15,
    rating: 3,
    reviews: 42,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Kamera Mirrorless 4K",
    price: 8500000,
    originalPrice: 9000000,
    discount: 5,
    rating: 5,
    reviews: 37,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Speaker Bluetooth Mini",
    price: 450000,
    originalPrice: 600000,
    discount: 25,
    rating: 4,
    reviews: 56,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Tablet Android 10 inch",
    price: 3200000,
    originalPrice: null,
    discount: null,
    rating: 4,
    reviews: 28,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Power Bank 20000mAh",
    price: 350000,
    originalPrice: 400000,
    discount: 12,
    rating: 4,
    reviews: 92,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 9,
    name: "Drone Camera HD",
    price: 2800000,
    originalPrice: 3500000,
    discount: 20,
    rating: 4,
    reviews: 19,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 10,
    name: "Monitor Gaming 27 inch",
    price: 3800000,
    originalPrice: null,
    discount: null,
    rating: 5,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 11,
    name: "Keyboard Mechanical RGB",
    price: 950000,
    originalPrice: 1100000,
    discount: 14,
    rating: 4,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 12,
    name: "Mouse Gaming Wireless",
    price: 650000,
    originalPrice: 750000,
    discount: 13,
    rating: 4,
    reviews: 53,
    image: "/placeholder.svg?height=300&width=300",
  },
]
