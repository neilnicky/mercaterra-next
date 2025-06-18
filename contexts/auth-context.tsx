"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, UserRole } from "@/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Farmer",
    role: "farmer",
    phone: "+1234567890",
    district: "California",
    profilePhoto: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    email: "sarah@example.com",
    name: "Sarah Buyer",
    role: "buyer",
    phone: "+1234567891",
    district: "California",
    profilePhoto: "/placeholder.svg?height=100&width=100",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("mercaterra-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)

    // Mock authentication - in real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = mockUsers.find((u) => u.email === email && u.role === role)
    if (mockUser && password) {
      // Any password works for demo
      setUser(mockUser)
      localStorage.setItem("mercaterra-user", JSON.stringify(mockUser))

      // Set cookie for middleware
      document.cookie = `mercaterra-user=${JSON.stringify(mockUser)}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
    } else {
      throw new Error("Invalid credentials")
    }

    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mercaterra-user")
    // Clear cookie
    document.cookie = "mercaterra-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
