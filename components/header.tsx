"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">MediCare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-teal-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            {user && (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-teal-600 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/health-wallet" className="text-gray-600 hover:text-teal-600 px-3 py-2 text-sm font-medium">
                  Health Wallet
                </Link>
                <Link
                  href="/hospitals/nearby"
                  className="text-gray-600 hover:text-teal-600 px-3 py-2 text-sm font-medium"
                >
                  Hospitals
                </Link>
                <Link href="/chatbot" className="text-gray-600 hover:text-teal-600 px-3 py-2 text-sm font-medium">
                  AI Assistant
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" className="mr-2" onClick={() => router.push("/login")}>
                  Login
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => router.push("/register")}>
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="/health-wallet"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                >
                  Health Wallet
                </Link>
                <Link
                  href="/hospitals/nearby"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                >
                  Hospitals
                </Link>
                <Link
                  href="/chatbot"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                >
                  AI Assistant
                </Link>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-5">
                <Button variant="outline" className="w-full mb-2" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center px-5">
                  <Button variant="outline" className="w-full mb-2" onClick={() => router.push("/login")}>
                    Login
                  </Button>
                </div>
                <div className="flex items-center px-5">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => router.push("/register")}>
                    Register
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
