"use client";
import Footer from '@/components/landing/Footer';
import Header from '@/components/user/spare/Header';
import { getOrders } from '@/redux/slices/orderSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const OrdersPage = () => {
  const dispatch = useDispatch();
   const router = useRouter();
  const { order: orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'blue';
      case 'shipped':
        return 'blue';
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };


  const getPaymentStatusText = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return 'Paid';
      case 'unpaid':
        return 'Unpaid';
      case 'pending':
        return 'Pending';
      default:
        return paymentStatus;
    }
  };

  const handleViewDetails = (orderId) => {
    router.push(`/spare/order-details/${orderId}`);
  };

  const getStatusDot = (color) => {
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      gray: 'bg-gray-500'
    };
    return colorClasses[color] || 'bg-gray-500';
  };

  const recentOrders = orders?.filter(order =>
    order.status === 'confirmed' || order.status === 'shipped'
  ) || [];

  const pastOrders = orders?.filter(order =>
    order.status === 'delivered' || order.status === 'cancelled'
  ) || [];

  const OrderCard = ({ order }) => (
    <div className="border border-gray-300 rounded p-6 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {order.items[0]?.product?.images?.length > 0 && (
            <div className="flex-shrink-0">
              <img
                src={`/uploads/${order.items[0].product.images[0]}`}
                alt={order.items[0].product.name}
                className="w-16 h-20 object-contain"
              />
            </div>
          )}

          {/* Product Details */}
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              {order.items[0]?.product?.name} <span className="text-gray-900">₹{order.items[0]?.price}</span>
            </h3>
            {order.items.length > 1 && (
              <p className="text-sm text-gray-500 mb-1">
                +{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
              </p>
            )}
            <p className="text-sm text-gray-500 mb-1">
              Order #{order._id} | {formatDate(order.createdAt)}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Total: ₹{order.finalAmount?.toFixed(2)} | Payment: {getPaymentStatusText(order.paymentStatus)}
            </p>
            <button   onClick={() => handleViewDetails(order._id)}  className="bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* Right side - Status and Reorder */}
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusDot(getStatusColor(order.status))}`}></div>
            <span className="text-sm font-medium text-gray-700 capitalize">{order.status}</span>
          </div>


          {(order.status === 'delivered') && (
            <button className="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
              Reorder
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div>
        <Header />
        <div className="mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading orders...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Error loading orders: {error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="mx-auto p-6 bg-gray-50 min-h-screen">
        {/* Recent Orders Section */}
        {recentOrders.length > 0 && (
          <div className="mb-12">
            <h1 className="text-2xl font-semibold text-red-600 mb-6">Recent Orders</h1>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          </div>
        )}

        {/* Past Orders Section */}
        {pastOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-6">Past Orders</h2>
            <div className="space-y-4">
              {pastOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          </div>
        )}

        {/* No orders message */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">No orders found</h2>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;