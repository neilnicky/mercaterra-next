"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Truck, Package } from "lucide-react"
import type { Product } from "@/types"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/slices/cart-slice"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const { user } = useAuth()
  const { toast } = useToast()

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

    dispatch(addToCart({ product, quantity: 1 }))
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="relative w-32 h-32 flex-shrink-0">
              {product.isOrganic && <Badge className="absolute top-2 left-2 z-10 bg-green-600">Organic</Badge>}
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating}</span>
                  <span>({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{product.farmerLocation}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Harvested: {new Date(product.harvestedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ${product.price} <span className="text-sm font-normal text-gray-500">{product.unit}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.farmerName} • {product.quantity} {product.unit} available
                  </p>
                </div>

                <Button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardContent className="p-0">
        <div className="relative">
          {product.isOrganic && <Badge className="absolute top-3 left-3 z-10 bg-green-600">Organic</Badge>}
          <Link href={`/products/${product.id}`}>
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-gray-900 hover:text-green-600 transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
          </div>

          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
            <span className="text-gray-500">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{product.farmerLocation}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Harvested: {new Date(product.harvestedDate).toLocaleDateString()}</span>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              {product.farmerName} • {product.quantity} {product.unit} available
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xl font-bold text-green-600">${product.price}</p>
              <p className="text-sm text-gray-500">{product.unit}</p>
            </div>

            <Button size="sm" onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700">
              Add to Cart
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-2 border-t text-xs text-gray-500">
            {product.pickupAvailable && (
              <div className="flex items-center space-x-1">
                <Package className="h-3 w-3" />
                <span>Pickup</span>
              </div>
            )}
            {product.deliveryAvailable && (
              <div className="flex items-center space-x-1">
                <Truck className="h-3 w-3" />
                <span>Delivery</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
