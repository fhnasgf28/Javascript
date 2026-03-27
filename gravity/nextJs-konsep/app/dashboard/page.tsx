/**
 * FOLDER-BASED ROUTING
 * Di Next.js, struktur URL mengikuti struktur FOLDER.
 * 
 * File ini berada di: `app/dashboard/page.tsx`
 * Maka bisa diakses di URL: `localhost:3000/dashboard`
 * 
 * Jika Anda membuat folder `app/dashboard/settings/page.tsx`,
 * maka URL-nya: `localhost:3000/dashboard/settings`
 */

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard Area</h2>
            <p className="text-gray-600">
                Ini adalah halaman statis sederhana. Perhatikan URL di browser Anda, pasti ada di <code>/dashboard</code>.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-white border rounded shadow-sm">
                    <h4 className="font-bold">Statistik 1</h4>
                    <p className="text-2xl">105 Users</p>
                </div>
                <div className="p-4 bg-white border rounded shadow-sm">
                    <h4 className="font-bold">Statistik 2</h4>
                    <p className="text-2xl">42 Posts</p>
                </div>
                <div className="p-4 bg-white border rounded shadow-sm">
                    <h4 className="font-bold">Statistik 3</h4>
                    <p className="text-2xl">Active</p>
                </div>
            </div>
        </div>
    );
}
