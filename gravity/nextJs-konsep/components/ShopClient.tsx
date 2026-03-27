"use client";

import { useState } from "react";
import AddToCart from "./AddToCart";

/**
 * KOMPONEN: ShopClient
 * Tipe: CLIENT COMPONENT
 * 
 * Kenapa Client?
 * 1. Kita butuh `useState` untuk menyimpan kata kunci pencarian.
 * 2. Kita butuh update tampilan secara real-time saat user mengetik (interactivity).
 * 
 * Note: Komponen ini menerima data awal dari Server (props `initialProducts`).
 * Ini pola yang bagus: Server ambil data -> Oper ke Client -> Client yang mainkan datanya.
 */

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Logic filter berjalan di browser user
    const filteredProducts = initialProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Search Input */}
            <div className="p-4 bg-white rounded shadow-sm border">
                <label className="block text-sm font-medium text-gray-700 mb-1">Cari Produk</label>
                <input
                    type="text"
                    placeholder="Ketik nama produk..."
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-2">
                    Mode: <span className="text-orange-600 font-bold">Client Component</span> (Filtering terjadi di browser)
                </p>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500 italic">Produk tidak ditemukan.</p>
                ) : (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg bg-white hover:shadow-md transition">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{product.name}</h3>
                                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">
                                        {product.category}
                                    </span>
                                </div>
                                <p className="font-bold text-blue-600">Rp {product.price.toLocaleString()}</p>
                            </div>

                            {/* Client Component lain di dalam Client Component */}
                            <div className="mt-4 flex justify-end">
                                <AddToCart productName={product.name} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
