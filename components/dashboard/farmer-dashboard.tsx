"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Eye,
  Plus,
  ClipboardList,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { mockDashboardStats, mockOrders, mockProducts } from "@/lib/mock-data";
import Image from "next/image";

export function FarmerDashboard() {
  const stats = mockDashboardStats;
  const recentOrders = mockOrders.slice(0, 4);
  const topProducts = mockProducts.slice(0, 2);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h2>
        <p className="text-gray-600 mt-2">
          Welcome back, John! Here's how your farm is performing.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalProducts}
                </p>
                <p className="text-sm text-green-600">+2 this week</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Orders
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.activeOrders}
                </p>
                <p className="text-sm text-green-600">+3 today</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Monthly Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  ${stats.monthlyRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Profile Views
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.profileViews}
                </p>
                <p className="text-sm text-green-600">+8% this week</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/products/add">
              <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link href="/orders">
              <Button variant="outline" className="w-full justify-start">
                <ClipboardList className="mr-2 h-4 w-4" />
                View All Orders
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/orders">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">#{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items.map((item) => item.product.name).join(", ")}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium">${order.total}</p>
                    <Badge
                      variant={
                        order.status === "pending"
                          ? "secondary"
                          : order.status === "confirmed"
                          ? "default"
                          : order.status === "shipped"
                          ? "secondary"
                          : order.status === "delivered"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 p-3 border rounded-lg"
              >
                <div className="h-16 w-16 bg-red-300 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    alt={product.name}
                    src={product.images[0]}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.reviewCount} orders
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
