// components/admin/OrderRow.jsx
"use client";
import React from "react";

const OrderRow = ({ order }) => {
  if (!order) return null; // <-- safeguard for undefined order

  return (
    <tr className="border-b last:border-none hover:bg-gray-50 transition">
      {/* Order ID + User */}
      <td className="px-4 py-3 text-sm">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{order._id || "-"}</span>
          <span className="text-xs text-gray-500">
            {order.user?.name || "Unknown User"} ({order.user?.number || "N/A"})
          </span>
        </div>
      </td>

      {/* Items */}
      <td className="px-4 py-3 text-sm">
        <div className="flex flex-col">
          <span className="text-gray-900">{order.items?.length || 0} items</span>
          <span className="text-xs text-gray-500 truncate max-w-xs">
            {order.items?.map((i) => i.product?.name).join(", ") || "-"}
          </span>
        </div>
      </td>

      {/* Amount */}
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        ₹{order.totalAmount?.toLocaleString() || "0"}
      </td>

      {/* Payment Method */}
      <td className="px-4 py-3 text-sm text-gray-700 capitalize">
        {order.paymentMethod || "-"}
      </td>

      {/* Status */}
      <td className="px-4 py-3 text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium
            ${
              order.status === "delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}
        >
          {order.status || "-"}
        </span>
      </td>

      {/* Date */}
      <td className="px-4 py-3 text-sm text-gray-500">
        {order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-"}
      </td>
    </tr>
  );
};

export default OrderRow;
