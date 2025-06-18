export type UserRole = "farmer" | "buyer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  district?: string
  profilePhoto?: string
}

export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  unit: string
  quantity: number
  images: string[]
  farmerId: string
  farmerName: string
  farmerLocation: string
  isOrganic: boolean
  pickupAvailable: boolean
  deliveryAvailable: boolean
  harvestedDate: string
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  buyerId: string
  farmerId: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
  customerName: string
  customerEmail: string
  customerPhone: string
  deliveryAddress?: string
  notes?: string
}

export interface DashboardStats {
  totalProducts: number
  activeOrders: number
  monthlyRevenue: number
  profileViews: number
}
