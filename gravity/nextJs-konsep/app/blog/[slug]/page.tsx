/**
 * DYNAMIC ROUTING
 * Folder dengan nama `[slug]` (kurung siku) berarti segmen URL tersebut DINAMIS.
 * Bisa menangkap apa saja, misal:
 * - `/blog/halo-dunia` -> slug = "halo-dunia"
 * - `/blog/nextjs-keren` -> slug = "nextjs-keren"
 */

// Kita perlu mendefinisikan tipe props.params
// Perhatikan bahwa params itu Promise di Next.js 15+ (tapi di 14 masih object biasa, aman pakai await/Promise di Server Component)
type Props = {
    params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
    // Await params untuk mendapatkan data slug
    const { slug } = await params;

    return (
        <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="font-bold text-yellow-700">URL Parameter Detected!</p>
                <p>Anda sedang membuka halaman blog dengan slug: <code className="bg-yellow-200 px-1 rounded">{slug}</code></p>
            </div>

            <h1 className="text-4xl font-bold capitalize">Judul Artikel: {slug.replace(/-/g, ' ')}</h1>

            <p className="text-gray-600 leading-relaxed">
                Ini adalah konten dummy untuk artikel blog. Konsep ini sangat berguna untuk membuat halaman detail produk, profil user, atau artikel berita dimana layoutnya sama tapi datanya berbeda tergantung ID atau Slug di URL.
            </p>

            <div className="bg-gray-800 text-white p-4 rounded text-sm font-mono mt-8">
                <p>Lokasi File: app/blog/[slug]/page.tsx</p>
            </div>
        </div>
    );
}
