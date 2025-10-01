"use client";
import React from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const OrderRow = ({ order, getStatusConfig }) => {
  const router = useRouter();

  if (!order) return null; // safeguard

  const statusConfig = getStatusConfig(order.status);

  const handleViewClick = () => {
    router.push(`/orders/${order._id}`); // navigate to order detail page
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      {/* Order */}
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {order._id || "-"}
      </td>

      {/* Customer */}
      <td className="px-6 py-4 text-sm text-gray-700">
        {order.user?.name || "Unknown"} <br />
        <span className="text-xs text-gray-500">
          {order.user?.number || "N/A"}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
        >
          {order.status || "-"}
        </span>
      </td>

      {/* Total */}
      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
        ₹{order.totalAmount?.toLocaleString() || "0"}
      </td>

      {/* Date & Time */}
      <td className="px-6 py-4 text-sm text-gray-500">
        {order.createdAt
          ? new Date(order.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-"}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-sm">
        <button
          onClick={handleViewClick}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
