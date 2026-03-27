"use client"; // DIRECTIVE WAJIB untuk Client Component

import { useState } from "react";

/**
 * CLIENT COMPONENT
 * Jika butuh interaksi browser seperti:
 * - onClick, onChange, onSubmit
 * - useState, useEffect
 * - Browser API (window, localStorage)
 * 
 * Maka HARUS menambahkan "use client" di baris paling atas file.
 */

export default function InteractiveButton() {
    const [count, setCount] = useState(0);

    return (
        <div className="p-4 border border-indigo-100 bg-indigo-50 rounded-lg text-center w-fit mx-auto shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="font-bold text-indigo-800 mb-2">Interactive Client Component</h3>
            <p className="text-sm text-indigo-600 mb-4">
                Component ini menggunakan <code>useState</code>, jadi harus Client Component.
            </p>

            <button
                onClick={() => setCount(count + 1)}
                className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Klik Saya: {count} kali
            </button>
        </div>
    );
}
