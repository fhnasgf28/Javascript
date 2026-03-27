import Link from "next/link";
import InteractiveButton from "@/components/InteractiveButton";

/**
 * SERVER COMPONENT (Default)
 * Di Next.js App Router, semua komponen di dalam `app` secara default adalah Server Component.
 * Ini berarti kode ini DIJALANKAN DI SERVER terlebih dahulu, baru HTML-nya dikirim ke browser.
 * 
 * Keuntungan:
 * 1. Beban di browser (client) lebih ringan karena Javascript logic tidak dikirim semua.
 * 2. SEO lebih bagus karena Google bot langsung melihat konten.
 * 3. Bisa akses database atau API rahasia langsung di sini tanpa mengeksposnya ke client.
 */

// Simulasi fetching data dari database/API
async function getData() {
  // Anggap ini delay request ke server
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    message: "Data ini diambil dari Server!",
    timestamp: new Date().toLocaleTimeString(),
  };
}

export default async function Home() {
  // Kita bisa memanggil fungsi async langsung di component (Server Component Only!)
  const data = await getData();

  return (
    <div className="space-y-6">
      <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-bold mb-2">Selamat Datang di Next.js Concept!</h2>
        <p className="text-gray-700">
          Halaman ini adalah <strong>Server Component</strong>.
        </p>
        <div className="mt-4 p-4 bg-white rounded shadow-sm">
          <p className="text-sm text-gray-500">Hasil Data Fetching di Server:</p>
          <p className="font-mono text-lg text-green-600">"{data.message}"</p>
          <p className="text-xs text-gray-400">Waktu Server: {data.timestamp}</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Client Component Demo</h3>
        <p className="mb-4">Di bawah ini adalah komponen interaktif (Client Side):</p>
        <InteractiveButton />
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Navigasi</h3>
        <p className="mb-4">
          Coba klik menu di bawah untuk melihat konsep Routing:
        </p>
        <div className="flex gap-4">
          {/* 
            Gunakan <Link> daripada <a> agar halaman tidak reload penuh (Single Page Application).
          */}
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Ke Dashboard (Routing Biasa)
          </Link>

          <Link
            href="/blog/belajar-nextjs"
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
          >
            Ke Blog Dinamis (Dynamic Route)
          </Link>
        </div>
      </section>
    </div>
  );
}
