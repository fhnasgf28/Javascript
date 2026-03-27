import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google"; // Mengimpor font dari Google Fonts melalui Next.js
import "./globals.css"; // Mengimpor style global

// Konfigurasi font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

/**
 * METADATA (SEO)
 * Next.js menggunakan Metadata API untuk mengatur tag <head> seperti title dan meta description.
 * Ini membantu search engine memahami konten halaman Anda (SEO).
 */
export const metadata: Metadata = {
  title: "Belajar Next.js Concepts - Gravity",
  description: "Aplikasi edukasi untuk memahami konsep dasar Next.js App Router",
};

/**
 * ROOT LAYOUT
 * File ini adalah layout utama yang membungkus SELURUH halaman aplikasi Anda.
 * RootLayout harus memiliki tag <html> dan <body>.
 * Semua hal yang Anda render di sini akan muncul di setiap halaman (contoh: Navbar, Footer).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        {/* 
          Props `children` di sini merepresentasikan konten halaman yang sedang aktif.
          Misalnya jika buka halaman "/", `children` adalah konten dari `app/page.tsx`.
        */}
        <div className="p-4 bg-gray-100 min-h-screen">
          <header className="mb-4 p-4 bg-white rounded shadow">
            <h1 className="text-xl font-bold text-blue-600">Gravity Next.js Learning</h1>
            <nav className="flex gap-4 mt-2 text-sm text-gray-600">
              <a href="/" className="hover:underline">Home</a>
              <a href="/dashboard" className="hover:underline">Dashboard</a>
              <a href="/shop" className="hover:underline font-bold text-indigo-600">Studi Kasus Toko</a>
            </nav>
          </header>

          <main className="bg-white p-6 rounded shadow">
            {children}
          </main>

          <footer className="mt-8 text-center text-xs text-gray-500">
            &copy; 2025 Gravity Learning. Dibuat dengan Next.js.
          </footer>
        </div>
      </body>
    </html>
  );
}
