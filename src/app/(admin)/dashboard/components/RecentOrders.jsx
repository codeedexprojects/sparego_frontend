"use client";
import { Eye, MoreVertical, ArrowDownRight } from "lucide-react";
import OrderRow from "./OrderRow";

const RecentOrders = ({ orders, getStatusConfig }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Recent Orders</h2>
            <p className="text-sm text-gray-500">Latest transactions from your customers</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <Eye className="w-4 h-4" />
              View All
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

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
            {orders.map((order, index) => (
              <OrderRow key={index} order={order} getStatusConfig={getStatusConfig} />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-center">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Load More Orders
            <ArrowDownRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
