"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, ShoppingCart, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useAppSelector } from "@/lib/hooks"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const { user } = useAuth()
  const cartItems = useAppSelector((state) => state.cart.items)

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MercaTerra</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/market" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
              Market
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === "buyer" && (
                  <Link href="/cart" className="relative">
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItems.length > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {cartItems.length}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )}
                <Link href="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
