"use client";
import { Eye, MoreVertical, ArrowDownRight } from "lucide-react";
import OrderRow from "./OrderRow";

const RecentOrders = ({ orders = [], getStatusConfig }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Recent Orders</h2>
            <p className="text-sm text-gray-500">Latest transactions from your customers</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <OrderRow key={order._id || index} order={order} getStatusConfig={getStatusConfig} />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No recent orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default RecentOrders;
