"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "./components/DashboardHeader";
import StatsGrid from "./components/StatsGrid";
import RecentOrders from "./components/RecentOrders";
import { getOrders } from "../../../redux/slices/adminOrderSlice";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState("7d");
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.adminOrder);

  // 🔹 Fetch orders whenever filter changes
  useEffect(() => {
    dispatch(getOrders(timeFilter));
  }, [dispatch, timeFilter]);

  // 🔹 Stats data could also come from API
  const statsData = [
    {
      title: "Total Orders",
      value: orders.length.toString(),
      change: "+12.5%", // Ideally API should calculate this
      trend: "up",
      icon: CheckCircle,
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Revenue",
      value: "₹" + orders.reduce((sum, o) => sum + o.finalAmount, 0).toLocaleString(),
      change: "-2.3%",
      trend: "down",
      icon: AlertCircle,
      lightBg: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];


  const getStatusConfig = (status) => {
    const configs = {
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
        border: "border-green-200",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: Clock,
        border: "border-yellow-200",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
        border: "border-red-200",
      },
      processing: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: AlertCircle,
        border: "border-blue-200",
      },
    };
    return configs[status] || configs.pending;
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader timeFilter={timeFilter} setTimeFilter={setTimeFilter} />

        {loading ? (
          <p className="text-gray-600">Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">⚠️ {error}</p>
        ) : (
          <>
            <StatsGrid statsData={statsData} />
            <RecentOrders orders={orders} getStatusConfig={getStatusConfig} />
          </>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
