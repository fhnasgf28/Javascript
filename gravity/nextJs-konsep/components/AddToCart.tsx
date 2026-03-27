"use client";

import { useState, useTransition } from "react";

/**
 * KOMPONEN: AddToCart
 * Tipe: CLIENT COMPONENT
 *
 * Kenapa Client?
 * 1. Kita butuh `useState` untuk mengelola state tombol (idle, loading, success).
 * 2. Kita butuh `onClick` event handler untuk interaktivitas.
 * 3. `useTransition` digunakan untuk menangani perubahan state tanpa memblokir UI.
 *
 * Fitur Modern:
 * - Ikon SVG untuk visual yang lebih baik.
 * - State yang berubah (Idle -> Loading -> Success) untuk feedback ke user.
 * - Transisi yang halus dan styling modern dengan Tailwind CSS.
 */

export default function AddToCart({ productName }: { productName: string }) {
    const [isPending, startTransition] = useTransition();
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        startTransition(() => {
            // Simulasi proses menambahkan ke keranjang (misal: API call)
            setTimeout(() => {
                setIsAdded(true);
                console.log(`Produk "${productName}" ditambahkan ke keranjang.`);
                // Reset tombol setelah 2 detik
                setTimeout(() => setIsAdded(false), 2000);
            }, 1000);
        });
    };

    // Ikon SVG untuk keranjang dan centang
    const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

    if (isAdded) {
        return (
            <button
                disabled
                className="flex items-center justify-center w-40 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg focus:outline-none"
            >
                <CheckIcon />
                Ditambahkan
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="flex items-center justify-center w-40 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
            {isPending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
                <><CartIcon /> Tambah</>
            )}
        </button>
    );
}