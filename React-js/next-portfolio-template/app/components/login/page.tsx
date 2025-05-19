"use client"

import Link from "next/link"
import { loginUser } from "@/app/components/actions/auth"

export default function LoginPage() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const result = await loginUser(formData);
        if (result.error) {
          console.error(result.error);
        }
      };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-purple-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="text-purple-300">Welcome back! Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-black/50 border border-purple-700/50 rounded-md text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-white">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-black/50 border border-purple-700/50 rounded-md text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex items-center justify-end">
              <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-600 hover:to-purple-400 text-white font-medium rounded-md transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <p className="text-purple-300">
            Don't have an account?{" "}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
