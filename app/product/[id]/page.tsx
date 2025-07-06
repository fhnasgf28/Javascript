import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingBag, ShoppingCart, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Dalam aplikasi nyata, Anda akan mengambil data produk berdasarkan ID
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId) || products[0]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ShoppingBag className="h-6 w-6" />
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
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Keranjang</span>
            </Button>
            <Button>Masuk</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 md:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm mb-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Beranda
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <Link href="/produk" className="text-muted-foreground hover:text-foreground">
              Produk
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <Link href={`/kategori/${product.category.slug}`} className="text-muted-foreground hover:text-foreground">
              {product.category.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
            <span className="font-medium text-foreground">{product.name}</span>
          </nav>

          {/* Product Detail */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full object-cover aspect-square"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.gallery.map((img, index) => (
                  <div key={index} className="overflow-hidden rounded-lg border cursor-pointer">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full object-cover aspect-square"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                        />
                      ))}
                    <span className="ml-2 text-sm text-muted-foreground">({product.reviews} ulasan)</span>
                  </div>
                  <Separator orientation="vertical" className="h-5" />
                  <span className="text-sm text-muted-foreground">Terjual {product.sold}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {product.discount ? (
                    <>
                      <p className="text-3xl font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                      <p className="text-lg text-muted-foreground line-through">
                        Rp {product.originalPrice?.toLocaleString("id-ID")}
                      </p>
                      <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                        Diskon {product.discount}%
                      </span>
                    </>
                  ) : (
                    <p className="text-3xl font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
                  )}
                </div>
                <p className="text-sm text-green-600">Tersedia stok: {product.stock}</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Deskripsi</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Warna</h3>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color.id}
                        className="w-8 h-8 rounded-full border-2 border-muted cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {product.sizes && (
                  <div>
                    <h3 className="font-medium mb-2">Ukuran</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {product.sizes.map((size) => (
                        <div
                          key={size}
                          className="px-3 py-1 rounded border text-center min-w-[40px] cursor-pointer hover:border-primary"
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium mb-2">Jumlah</h3>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-r-none">
                      <Minus className="h-4 w-4" />
                      <span className="sr-only">Kurangi</span>
                    </Button>
                    <div className="h-10 px-4 flex items-center justify-center border-y w-14">1</div>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-l-none">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Tambah</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="sm:flex-1" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Tambah ke Keranjang
                </Button>
                <Button variant="secondary" className="sm:flex-1" size="lg">
                  Beli Sekarang
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Tambah ke Wishlist</span>
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Bagikan</span>
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
                <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Pengiriman</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pengiriman ke seluruh Indonesia. Estimasi 2-5 hari kerja tergantung lokasi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="deskripsi">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="deskripsi"
                  className="rounded-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Deskripsi Detail
                </TabsTrigger>
                <TabsTrigger
                  value="spesifikasi"
                  className="rounded-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Spesifikasi
                </TabsTrigger>
                <TabsTrigger
                  value="ulasan"
                  className="rounded-none py-3 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                >
                  Ulasan ({product.reviews})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="deskripsi" className="pt-6">
                <div className="prose max-w-none">
                  <h3>Deskripsi Produk</h3>
                  <p>{product.fullDescription || product.description}</p>
                  <h3>Fitur Utama</h3>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <h3>Apa yang Ada di Dalam Kotak</h3>
                  <ul>
                    {product.inTheBox.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="spesifikasi" className="pt-6">
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([category, specs]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-lg mb-2">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(specs as Record<string, string>).map(([key, value]) => (
                          <div key={key} className="flex py-2 border-b">
                            <span className="w-1/2 text-muted-foreground">{key}</span>
                            <span className="w-1/2">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="ulasan" className="pt-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="md:w-1/4 flex flex-col items-center justify-center p-6 bg-muted/30 rounded-lg">
                      <div className="text-5xl font-bold">{product.rating}.0</div>
                      <div className="flex items-center mt-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                            />
                          ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">Berdasarkan {product.reviews} ulasan</div>
                    </div>
                    <div className="md:w-3/4">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-4">
                            <div className="flex items-center">
                              <span className="w-3">{rating}</span>
                              <Star className="h-4 w-4 fill-primary text-primary ml-1" />
                            </div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{
                                  width: `${rating === product.rating ? "70%" : rating > product.rating ? "10%" : "20%"}`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-muted-foreground w-12">
                              {rating === product.rating ? "70%" : rating > product.rating ? "10%" : "20%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <h4 className="font-medium">{review.name}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                                      />
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Warna: {review.color}, {review.size && `Ukuran: ${review.size}`}
                          </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                        {review.images && (
                          <div className="flex gap-2 mt-2">
                            {review.images.map((img, index) => (
                              <Image
                                key={index}
                                src={img || "/placeholder.svg"}
                                alt={`Review image ${index + 1}`}
                                width={80}
                                height={80}
                                className="rounded-md object-cover"
                              />
                            ))}
                          </div>
                        )}
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button variant="outline">Lihat Semua Ulasan</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedProducts.map((product) => (
                <Link href={`/produk/${product.id}`} key={product.id} className="group">
                  <div className="overflow-hidden rounded-lg border bg-background transition-colors">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      {product.discount && (
                        <span className="absolute top-2 right-2 text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                          Diskon {product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="font-bold text-sm">Rp {product.price.toLocaleString("id-ID")}</p>
                        {product.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">
                            Rp {product.originalPrice.toLocaleString("id-ID")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 mt-12">
        <div className="container flex flex-col md:flex-row justify-between gap-4 md:gap-8">
          <div className="flex flex-col gap-2 md:w-1/4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <ShoppingBag className="h-6 w-6" />
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
const products = [
  {
    id: 1,
    name: "Smartphone XYZ Pro",
    price: 4500000,
    originalPrice: 5000000,
    discount: 10,
    rating: 4,
    reviews: 120,
    sold: 350,
    stock: 45,
    image: "/placeholder.svg?height=600&width=600",
    gallery: [
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
      "/placeholder.svg?height=150&width=150",
    ],
    category: { id: 1, name: "Elektronik", slug: "elektronik" },
    description:
      "Smartphone premium dengan kamera 108MP dan layar AMOLED 6.7 inch. Dilengkapi dengan prosesor terbaru dan baterai tahan lama.",
    fullDescription:
      "Smartphone XYZ Pro adalah smartphone premium dengan spesifikasi terbaik di kelasnya. Dilengkapi dengan kamera utama 108MP yang menghasilkan foto jernih bahkan dalam kondisi cahaya rendah. Layar AMOLED 6.7 inch memberikan pengalaman visual yang memukau dengan warna yang hidup dan kontras yang tajam. Ditenagai oleh prosesor terbaru yang menjamin performa cepat untuk gaming dan multitasking. Baterai 5000mAh dengan teknologi fast charging memungkinkan Anda menggunakan smartphone sepanjang hari tanpa khawatir kehabisan daya.",
    colors: [
      { id: 1, name: "Hitam", hex: "#000000" },
      { id: 2, name: "Biru", hex: "#0000FF" },
      { id: 3, name: "Silver", hex: "#C0C0C0" },
    ],
    sizes: ["S", "M", "L", "XL"], // Added sizes property
    features: [
      "Kamera utama 108MP dengan stabilisasi optik",
      "Layar AMOLED 6.7 inch dengan refresh rate 120Hz",
      "Prosesor Octa-core terbaru",
      "RAM 8GB dan penyimpanan internal 256GB",
      "Baterai 5000mAh dengan fast charging 65W",
      "Tahan air dan debu dengan sertifikasi IP68",
      "Sistem operasi terbaru dengan update 3 tahun",
    ],
    inTheBox: [
      "Smartphone XYZ Pro",
      "Charger 65W",
      "Kabel USB Type-C",
      "Earphone",
      "Casing pelindung",
      "Buku manual dan kartu garansi",
    ],
    specifications: {
      Umum: {
        Brand: "XYZ",
        Model: "Pro",
        Warna: "Hitam, Biru, Silver",
        "Tahun Rilis": "2023",
      },
      Tampilan: {
        "Tipe Layar": "AMOLED",
        "Ukuran Layar": "6.7 inch",
        Resolusi: "1440 x 3200 pixels",
        "Refresh Rate": "120Hz",
        Proteksi: "Gorilla Glass Victus",
      },
      Performa: {
        Chipset: "Snapdragon 8 Gen 2",
        CPU: "Octa-core",
        GPU: "Adreno 740",
        RAM: "8GB LPDDR5",
        Penyimpanan: "256GB UFS 3.1",
      },
      Kamera: {
        "Kamera Utama": "108MP, f/1.8, OIS",
        "Kamera Ultra Wide": "12MP, f/2.2",
        "Kamera Telephoto": "10MP, f/2.4, 3x optical zoom",
        "Kamera Depan": "32MP, f/2.2",
      },
      Baterai: {
        Kapasitas: "5000mAh",
        "Fast Charging": "65W",
        "Wireless Charging": "15W",
      },
      Konektivitas: {
        SIM: "Dual SIM (Nano-SIM)",
        Jaringan: "5G",
        "Wi-Fi": "Wi-Fi 6E",
        Bluetooth: "5.3",
        NFC: "Ya",
        USB: "Type-C 3.2",
      },
    },
  },
]

const reviews = [
  {
    id: 1,
    name: "Budi Santoso",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 minggu yang lalu",
    color: "Hitam",
    size: null,
    comment:
      "Smartphone yang sangat bagus! Kamera jernih dan baterai tahan lama. Saya sangat puas dengan pembelian ini.",
    images: ["/placeholder.svg?height=80&width=80", "/placeholder.svg?height=80&width=80"],
  },
  {
    id: 2,
    name: "Siti Rahayu",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 bulan yang lalu",
    color: "Biru",
    size: null,
    comment:
      "Performa bagus dan layar jernih. Hanya saja agak cepat panas saat bermain game berat. Secara keseluruhan saya puas.",
    images: null,
  },
  {
    id: 3,
    name: "Agus Wijaya",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "3 minggu yang lalu",
    color: "Silver",
    size: null,
    comment: "Pengiriman cepat dan produk sesuai deskripsi. Kamera sangat bagus untuk harga segini. Rekomendasi!",
    images: ["/placeholder.svg?height=80&width=80"],
  },
]

const relatedProducts = [
  {
    id: 2,
    name: "Smartphone XYZ Lite",
    price: 2800000,
    originalPrice: 3200000,
    discount: 12,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Smartphone XYZ Ultra",
    price: 6500000,
    originalPrice: null,
    discount: null,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Earbuds XYZ Pro",
    price: 1200000,
    originalPrice: 1500000,
    discount: 20,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Smartwatch XYZ",
    price: 1800000,
    originalPrice: 2000000,
    discount: 10,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Tablet XYZ",
    price: 3500000,
    originalPrice: null,
    discount: null,
    image: "/placeholder.svg?height=200&width=200",
  },
]
