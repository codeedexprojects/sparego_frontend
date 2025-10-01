// pages/orders/index.jsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import OrderTable from "./components/OrderTable/OrderTable";
import { getOrders, clearError } from "../../../redux/slices/adminOrderSlice";

const OrdersPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((s) => s.adminOrder);
  
  // Debug logging
  console.log("Component: Redux state - orders:", orders);
  console.log("Component: Redux state - loading:", loading);
  console.log("Component: Redux state - error:", error);
  console.log("Component: orders type:", typeof orders);
  console.log("Component: orders length:", orders?.length);

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Dispatching getOrders...");
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Order error:", error);
      const t = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);

  const filteredOrders = useMemo(() => {
    console.log("Filtering orders. Raw orders:", orders);
    let result = orders || [];
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((o) =>
        (o.user?.name || "").toLowerCase().includes(term) ||
        String(o._id || o.id).toLowerCase().includes(term) ||
        (o.address?.name || "").toLowerCase().includes(term)
      );
    }
    console.log("Filtered orders result:", result);
    return result;
  }, [orders, statusFilter, searchTerm]);

  const handleViewOrder = (order) => {
    router.push(`/admin/orders/${order._id || order.id}`);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search orders by ID, customer name..."
                className="w-full p-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="status-filter" className="font-medium">Filter by Status:</label>
              <select
                id="status-filter"
                className="p-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <OrderTable
            orders={filteredOrders}
            onViewOrder={handleViewOrder}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default OrdersPage;