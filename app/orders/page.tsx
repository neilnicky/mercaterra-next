"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { mockOrders } from "@/lib/mock-data"
import { Eye, Package, Truck, CheckCircle, XCircle } from "lucide-react"

export default function OrdersPage() {
  const { user } = useAuth()
  const [statusFilter, setStatusFilter] = useState("all")

  const userOrders = mockOrders.filter((order) => {
    if (user?.role === "farmer") {
      return order.farmerId === user.id
    } else {
      return order.buyerId === user.id
    }
  })

  const filteredOrders = userOrders.filter((order) => {
    if (statusFilter === "all") return true
    return order.status === statusFilter
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "confirmed":
        return "default"
      case "shipped":
        return "secondary"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600 mt-1">
                {user?.role === "farmer" ? "Manage incoming orders" : "Track your purchases"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge variant={getStatusColor(order.status)} className="flex items-center space-x-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {user?.role === "farmer"
                        ? `Customer: ${order.customerName}`
                        : `Order Date: ${new Date(order.createdAt).toLocaleDateString()}`}
                    </span>
                    <span className="font-medium text-green-600">${order.total.toFixed(2)}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Items:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>
                            {item.product.name} x {item.quantity}
                          </span>
                          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {user?.role === "farmer" && (
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Customer Details:</span>
                      </div>
                      <div className="pl-4 space-y-1 text-gray-600">
                        <div>Name: {order.customerName}</div>
                        <div>Email: {order.customerEmail}</div>
                        <div>Phone: {order.customerPhone}</div>
                        {order.deliveryAddress && <div>Address: {order.deliveryAddress}</div>}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Last updated: {new Date(order.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {user?.role === "farmer" && order.status === "pending" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Confirm Order
                          </Button>
                          <Button variant="destructive" size="sm">
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No orders found</p>
              <p className="text-sm text-gray-400">
                {user?.role === "farmer"
                  ? "Orders will appear here when customers purchase your products."
                  : "Your orders will appear here after making purchases."}
              </p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
