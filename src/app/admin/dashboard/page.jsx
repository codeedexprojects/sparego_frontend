"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "./components/DashboardHeader";
import StatsGrid from "./components/StatsGrid";
import RecentOrders from "./components/RecentOrders";
import { getOrders } from "../../../redux/slices/adminOrderSlice";
import { CheckCircle, Clock, XCircle, AlertCircle, DollarSign, Package, Calendar } from "lucide-react";
import ProtectedRoute from "../../../components/admin/ProtectedRoute";

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState("7d");
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.adminOrder);

  // 🔹 Fetch orders whenever filter changes
  useEffect(() => {
    dispatch(getOrders(timeFilter));
  }, [dispatch, timeFilter]);

  // 🔹 Calculate today's orders
  const getTodayOrders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });
  };

  // 🔹 Calculate stats from actual orders data
  const calculateStats = () => {
    const totalOrders = orders.length;
    const todayOrders = getTodayOrders();
    
    // Calculate revenue from delivered orders only
    const deliveredOrders = orders.filter(order => order.status?.toLowerCase() === 'delivered');
    const deliveredRevenue = deliveredOrders.reduce((sum, order) => sum + (order.finalAmount || 0), 0);
    
    
    // Calculate all orders by status
    const statusCounts = orders.reduce((acc, order) => {
      const status = order.status?.toLowerCase() || 'pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const pendingOrders = statusCounts.pending || 0;
    const deliveredOrdersCount = statusCounts.delivered || 0;
    const cancelledOrders = statusCounts.cancelled || 0;
    const confirmedOrders = statusCounts.confirmed || 0;
    const shippedOrders = statusCounts.shipped || 0;

    return [
      {
        title: "Total Orders",
        value: totalOrders.toString(),
        icon: Package,
        lightBg: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-200"
      },
      {
        title: "Today's Orders",
        value: todayOrders.length.toString(),
        icon: Calendar,
        lightBg: "bg-indigo-50",
        textColor: "text-indigo-600",
        borderColor: "border-indigo-200",
        description: "Orders placed today"
      },
      {
        title: "Revenue",
        value: "₹" + deliveredRevenue.toLocaleString(),
        icon: DollarSign,
        lightBg: "bg-green-50",
        textColor: "text-green-600",
        borderColor: "border-green-200",
        description: `From ${deliveredOrdersCount} delivered orders`
      },
      {
        title: "Delivered",
        value: deliveredOrdersCount.toString(),
        icon: CheckCircle,
        lightBg: "bg-green-50",
        textColor: "text-green-600",
        borderColor: "border-green-200"
      },
      {
        title: "Pending",
        value: pendingOrders.toString(),
        icon: Clock,
        lightBg: "bg-yellow-50",
        textColor: "text-yellow-600",
        borderColor: "border-yellow-200"
      },
      {
        title: "Confirmed",
        value: confirmedOrders.toString(),
        icon: AlertCircle,
        lightBg: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-200"
      },
      {
        title: "Shipped",
        value: shippedOrders.toString(),
        icon: Package,
        lightBg: "bg-purple-50",
        textColor: "text-purple-600",
        borderColor: "border-purple-200"
      },
      {
        title: "Cancelled",
        value: cancelledOrders.toString(),
        icon: XCircle,
        lightBg: "bg-red-50",
        textColor: "text-red-600",
        borderColor: "border-red-200"
      }
    ];
  };

  const statsData = calculateStats();

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
      shipped: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        icon: Package,
        border: "border-purple-200",
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
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading orders...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">⚠️ {error}</p>
            </div>
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