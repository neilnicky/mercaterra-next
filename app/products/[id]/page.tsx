"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Truck, Package, Heart, Share2, ArrowLeft } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/slices/cart-slice"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { user } = useAuth()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <Link href="/market">
            <Button className="mt-4">Back to Market</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to add items to cart.",
        variant: "destructive",
      })
      return
    }

    if (user.role !== "buyer") {
      toast({
        title: "Access denied",
        description: "Only buyers can add items to cart.",
        variant: "destructive",
      })
      return
    }

    dispatch(addToCart({ product, quantity }))
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/market">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Market
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              {product.isOrganic && <Badge className="absolute top-4 left-4 bg-green-600">Organic</Badge>}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{product.farmerLocation}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">
                ${product.price} <span className="text-lg font-normal text-gray-500">{product.unit}</span>
              </div>
              <p className="text-gray-600">{product.quantity} available</p>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant={product.quantity > 0 ? "default" : "secondary"}>
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
              {product.pickupAvailable && (
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Package className="h-3 w-3" />
                  <span>Pickup</span>
                </Badge>
              )}
              {product.deliveryAvailable && (
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Truck className="h-3 w-3" />
                  <span>Delivery</span>
                </Badge>
              )}
            </div>

            {user?.role === "buyer" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="font-medium">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border rounded-md px-3 py-1"
                  >
                    {[...Array(Math.min(10, product.quantity))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={product.quantity === 0}
                  >
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Farm Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Farm:</span>
                    <span>{product.farmerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span>{product.farmerLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harvested:</span>
                    <span>{new Date(product.harvestedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span>{product.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
