import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/products", "/orders", "/profile", "/cart", "/checkout"]
  const farmerOnlyRoutes = ["/products/manage", "/products/add", "/products/edit"]

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isFarmerOnlyRoute = farmerOnlyRoutes.some((route) => pathname.startsWith(route))

  // Get user from cookie
  const userCookie = request.cookies.get("mercaterra-user")

  if (isProtectedRoute) {
    if (!userCookie?.value) {
      console.log("No user cookie found, redirecting to signin")
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

    if (isFarmerOnlyRoute) {
      try {
        const user = JSON.parse(decodeURIComponent(userCookie.value))
        if (user.role !== "farmer") {
          console.log("User is not a farmer, redirecting to dashboard")
          return NextResponse.redirect(new URL("/dashboard", request.url))
        }
      } catch (error) {
        console.log("Error parsing user cookie:", error)
        return NextResponse.redirect(new URL("/auth/signin", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)"],
}
