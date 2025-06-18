"use client"

import { useAuth } from "@/contexts/auth-context"
import { FarmerDashboard } from "@/components/dashboard/farmer-dashboard"
import { BuyerDashboard } from "@/components/dashboard/buyer-dashboard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <AuthGuard>
      <DashboardLayout>{user?.role === "farmer" ? <FarmerDashboard /> : <BuyerDashboard />}</DashboardLayout>
    </AuthGuard>
  )
}
