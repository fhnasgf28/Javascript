/**
 * LOADING UI (Suspense)
 * File khusus `loading.tsx` in akan otomatis membungkus `page.tsx` di dalam folder yang sama
 * (dan anak-anaknya) dengan React Suspense.
 * 
 * Ketika `page.tsx` sedang fetching data (async) atau navigasi sedang terjadi,
 * user akan melihat tampilan loading ini TERLEBIH DAHULU.
 */

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 animate-pulse">Sedang memuat data dashboard...</p>
            <p className="text-xs text-gray-400 mt-2">(Ini adalah file loading.tsx)</p>
        </div>
    );
}
