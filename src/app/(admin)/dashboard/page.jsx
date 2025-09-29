"use client";
import { useState } from 'react';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Bell
} from 'lucide-react';

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('7d');

  const statsData = [
    {
      title: 'Total Orders',
      value: '1,245',
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      darkBg: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Products',
      value: '320',
      change: '+5.2%',
      trend: 'up',
      icon: Package,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600',
      lightBg: 'bg-purple-50',
      darkBg: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Total Users',
      value: '890',
      change: '+8.1%',
      trend: 'up',
      icon: Users,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600',
      lightBg: 'bg-green-50',
      darkBg: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Revenue',
      value: '₹2.4M',
      change: '-2.3%',
      trend: 'down',
      icon: DollarSign,
      color: 'orange',
      bgGradient: 'from-orange-500 to-orange-600',
      lightBg: 'bg-orange-50',
      darkBg: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  const recentOrders = [
    {
      id: '#1023',
      customer: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      status: 'delivered',
      statusText: 'Delivered',
      total: '₹4,500',
      date: '26 Aug 2025',
      time: '2:30 PM',
      items: 3
    },
    {
      id: '#1022',
      customer: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b25d1d0a?w=40&h=40&fit=crop&crop=face',
      status: 'pending',
      statusText: 'Pending',
      total: '₹2,300',
      date: '25 Aug 2025',
      time: '11:45 AM',
      items: 2
    },
    {
      id: '#1021',
      customer: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      status: 'cancelled',
      statusText: 'Cancelled',
      total: '₹1,200',
      date: '24 Aug 2025',
      time: '4:15 PM',
      items: 1
    },
    {
      id: '#1020',
      customer: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      status: 'processing',
      statusText: 'Processing',
      total: '₹3,750',
      date: '24 Aug 2025',
      time: '9:20 AM',
      items: 5
    },
    {
      id: '#1019',
      customer: 'David Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      status: 'delivered',
      statusText: 'Delivered',
      total: '₹5,200',
      date: '23 Aug 2025',
      time: '1:10 PM',
      items: 4
    }
  ];

  const getStatusConfig = (status) => {
    const configs = {
      delivered: {
        bg: 'bg-green-100',
        text: 'text-green-700',
        icon: CheckCircle,
        border: 'border-green-200'
      },
      pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        icon: Clock,
        border: 'border-yellow-200'
      },
      cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-700',
        icon: XCircle,
        border: 'border-red-200'
      },
      processing: {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        icon: AlertCircle,
        border: 'border-blue-200'
      }
    };
    return configs[status] || configs.pending;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-lg">Welcome back, Admin 👋</p>
              <p className="text-sm text-gray-500 mt-1">
                Here's what's happening with your store today
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              
              <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
              
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.lightBg}`}>
                        <Icon className={`w-6 h-6 ${stat.textColor}`} />
                      </div>
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        stat.trend === 'up' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        <TrendIcon className="w-3 h-3" />
                        {stat.change}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500">vs last period</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Recent Orders</h2>
                  <p className="text-sm text-gray-500">Latest transactions from your customers</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Link href="/admin/orders" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    <Eye className="w-4 h-4" />
                    View All
                  </Link>
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
                  {recentOrders.map((order, index) => {
                    const statusConfig = getStatusConfig(order.status);
                    const StatusIcon = statusConfig.icon;
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">{order.id}</span>
                            <span className="text-xs text-gray-500">{order.items} items</span>
                          </div>
                        </td>
                        
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={order.avatar}
                              alt={order.customer}
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{order.customer}</p>
                              <p className="text-xs text-gray-500">Customer</p>
                            </div>
                          </div>
                        </td>
                        
                        <td className="py-4 px-6">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                            <StatusIcon className="w-3 h-3" />
                            {order.statusText}
                          </div>
                        </td>
                        
                        <td className="py-4 px-6">
                          <span className="font-semibold text-gray-900">{order.total}</span>
                        </td>
                        
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-900">{order.date}</span>
                            <span className="text-xs text-gray-500">{order.time}</span>
                          </div>
                        </td>
                        
                        <td className="py-4 px-6">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Quick Actions</h3>
                <Package className="w-5 h-5 opacity-80" />
              </div>
              <p className="text-blue-100 text-sm mb-4">Manage your store efficiently</p>
              <Link href="/admin/products/new" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Add New Product
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Analytics</h3>
                <TrendingUp className="w-5 h-5 opacity-80" />
              </div>
              <p className="text-purple-100 text-sm mb-4">View detailed reports</p>
              <Link href="/admin/analytics" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View Reports
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Support</h3>
                <Users className="w-5 h-5 opacity-80" />
              </div>
              <p className="text-green-100 text-sm mb-4">Help your customers</p>
              <Link href="/admin/support" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Manage Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>

  );
}