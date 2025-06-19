"use client";

import type React from "react";

import { AuthGuard } from "@/components/auth/auth-guard";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/lib/hooks";
import { addProduct } from "@/lib/slices/product-slice";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    unit: "",
    quantity: "",
    isOrganic: false,
    pickupAvailable: true,
    deliveryAvailable: true,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call
    const newProduct = {
      ...formData,
      id: `id${new Date().toISOString()}`,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      rating: 0,
      reviewCount: 0,
      images: [],
      farmerId: "mock-farmer-id",
      farmerName: "John Doe",
      farmerLocation: "Kochi, Kerala",
      harvestedDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addProduct(newProduct));

    toast({
      title: "Product added successfully!",
      description: "Your product has been listed in the marketplace.",
    });

    router.push("/products");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AuthGuard requiredRole="farmer">
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <Link href="/products">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Add New Product
              </h1>
              <p className="text-gray-600 mt-1">Create a new product listing</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Organic Heirloom Tomatoes"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe your product, growing methods, taste, etc."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Leafy Greens">
                          Leafy Greens
                        </SelectItem>
                        <SelectItem value="Herbs">Herbs</SelectItem>
                        <SelectItem value="Dairy & Eggs">
                          Dairy & Eggs
                        </SelectItem>
                        <SelectItem value="Grains">Grains</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select
                      value={formData.unit}
                      onValueChange={(value) =>
                        handleInputChange("unit", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per lb">per lb</SelectItem>
                        <SelectItem value="per kg">per kg</SelectItem>
                        <SelectItem value="per bunch">per bunch</SelectItem>
                        <SelectItem value="per dozen">per dozen</SelectItem>
                        <SelectItem value="per piece">per piece</SelectItem>
                        <SelectItem value="per bag">per bag</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Available Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", e.target.value)
                      }
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Product Options</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="organic"
                        checked={formData.isOrganic}
                        onCheckedChange={(checked) =>
                          handleInputChange("isOrganic", checked as boolean)
                        }
                      />
                      <Label htmlFor="organic">
                        This is an organic product
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pickup"
                        checked={formData.pickupAvailable}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "pickupAvailable",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="pickup">Pickup available</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="delivery"
                        checked={formData.deliveryAvailable}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "deliveryAvailable",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="delivery">Delivery available</Label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding Product..." : "Add Product"}
                  </Button>
                  <Link href="/products" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
