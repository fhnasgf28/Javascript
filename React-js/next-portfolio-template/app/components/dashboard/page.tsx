import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <Link
            href="/"
            className="py-2 px-4 border border-purple-500 text-purple-400 hover:bg-purple-950/30 rounded-md transition-colors"
          >
            Logout
          </Link>
        </header>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Welcome to your dashboard</h2>
          <p className="text-purple-300 mb-6">This is a protected page that should only be accessible after login.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-900/40 p-4 rounded-lg border border-purple-500/30">
              <h3 className="text-lg font-medium text-white mb-2">Profile</h3>
              <p className="text-purple-300">Manage your account settings and preferences</p>
            </div>
            <div className="bg-purple-900/40 p-4 rounded-lg border border-purple-500/30">
              <h3 className="text-lg font-medium text-white mb-2">Settings</h3>
              <p className="text-purple-300">Configure your application settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
