import ShopClient from "@/components/ShopClient";

/**
 * KOMPONEN: Shop Page
 * Tipe: SERVER COMPONENT (Default)
 * 
 * Kenapa Server?
 * 1. Kita ingin mengambil data produk dari "Database" sebelum halaman dikirim ke user.
 * 2. Lebih aman dan cepat.
 * 
 * Alur Data:
 * [Server] Fetch Data -> [Server] Render HTML Awal -> [Client] Hydrate & Interactivity
 */

// Simulasi Data Database
const DB_PRODUCTS = [
    { id: 1, name: "Laptop Gaming Super", price: 15000000, category: "Elektronik" },
    { id: 2, name: "Mouse Wireless Keren", price: 150000, category: "Aksesoris" },
    { id: 3, name: "Keyboard Mechanical", price: 750000, category: "Aksesoris" },
    { id: 4, name: "Monitor 24 Inch", price: 2000000, category: "Elektronik" },
    { id: 5, name: "Meja Kerja Minimalis", price: 1200000, category: "Furniture" },
    { id: 6, name: "Kursi Ergonomis", price: 3500000, category: "Furniture" },
    { id: 7, name: "Laptop Gaming mantap", price: 30500000, category: "Elektronik" },
    { id: 8, name: "Laptop Gaming mantap", price: 30500000, category: "Elektronik" },
];

async function getProducts() {
    // Anggap ini delay request ke Database asli
    await new Promise((resolve) => setTimeout(resolve, 500));
    return DB_PRODUCTS;
}

export const metadata = {
    title: "Toko Online Demo - Server vs Client",
};

export default async function ShopPage() {
    // 1. Ambil data di Server
    const products = await getProducts();
    console.log("Data produk diambil di server:", products.length, "item");

    return (
        <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4">
                <h1 className="text-2xl font-bold text-indigo-900">Studi Kasus: Toko Online</h1>
                <p className="text-indigo-700">
                    Halaman ini mendemonstrasikan kolaborasi Server Component (Fetching Data)
                    dan Client Component (Interaksi Search & Click).
                </p>
            </div>

            {/* 
                2. Oper data ke Client Component.
                Server Component bertugas "menyediakan bahan", Client Component bertugas "memasak/menyajikan interaksi".
            */}
            <ShopClient initialProducts={products} />
        </div>
    );
}
