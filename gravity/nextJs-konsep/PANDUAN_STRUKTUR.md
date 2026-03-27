# Panduan Struktur Folder Next.js (App Router)

Berikut adalah penjelasan mengenai fungsi folder dan file yang ada di project ini.

## 📁 `app/`
Folder utama untuk **Routing**. Di Next.js versi baru (App Router), struktur URL mengikuti struktur folder di sini.
- **`layout.tsx`**: Layout utama pembungkus halaman. Tempat tag `<html>` dan `<body>` berada.
- **`page.tsx`**: UI untuk halaman tersebut.
- **`loading.tsx`**: UI Loading (Skeleton) yang otomatis muncul saat data sedang diambil.
- **`error.tsx`**: UI Error yang otomatis muncul jika ada kerusakan di halaman.
- **`not-found.tsx`**: Halaman 404 custom.

## 📁 `components/`
Tempat menyimpan komponen UI yang **bisa digunakan kembali** (Reusable).
- Contoh: `Button.tsx`, `Navbar.tsx`, `Card.tsx`.
- Folder ini **tidak** menjadi route/URL. Hanya folder di dalam `app` yang jadi URL.
- Biasakan memisahkan komponen Client (`"use client"`) dan Server di sini.

## 📁 `public/`
Tempat menyimpan file statis yang bisa diakses publik oleh browser.
- Contoh: Gambar, Logo, Icon, Font, Robots.txt.
- File `public/gambar.jpg` bisa diakses di kode dengan `<img src="/gambar.jpg" />`.

## 📁 `node_modules/`
Folder "raksasa" berisi semua library yang diinstall (Next.js, React, Tailwind, dll).
- **JANGAN DIEDIT**.
- **JANGAN DI-UPLOAD KE GIT** (sudah ada di `.gitignore`).

## 📄 File Konfigurasi Penting
- **`next.config.ts`**: Pengaturan Next.js (redirects, image domains, compiler options).
- **`tailwind.config.ts`**: Pengaturan tema Tailwind CSS (warna, font, responsive).
- **`package.json`**: Daftar library/dependencies dan script perintah (`npm run dev`).
