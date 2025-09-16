"use client";
import React, { useEffect } from 'react';
import { Check, MapPin, Package, Truck, CheckCircle } from 'lucide-react';
import Header from '@/components/user/spare/Header';
import Footer from '@/components/landing/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { getOrderById } from '@/redux/slices/orderSlice';

const OrderDetailsPage = () => {
  const { id } = useParams(); // Get order ID from URL params
  const dispatch = useDispatch();
  const { order: orderData, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

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

  // Determine order status for progress tracker
  const getOrderStatus = (status) => {
    const statusMap = {
      'confirmed': {
        orderPlaced: { completed: true, icon: Check },
        packed: { completed: false, icon: Check },
        shipped: { completed: false, icon: Check },
        outForDelivery: { completed: false, icon: Package },
        delivered: { completed: false, icon: Check }
      },
      'packed': {
        orderPlaced: { completed: true, icon: Check },
        packed: { completed: true, icon: Check },
        shipped: { completed: false, icon: Check },
        outForDelivery: { completed: false, icon: Package },
        delivered: { completed: false, icon: Check }
      },
      'shipped': {
        orderPlaced: { completed: true, icon: Check },
        packed: { completed: true, icon: Check },
        shipped: { completed: true, icon: Check },
        outForDelivery: { completed: false, icon: Package },
        delivered: { completed: false, icon: Check }
      },
      'out for delivery': {
        orderPlaced: { completed: true, icon: Check },
        packed: { completed: true, icon: Check },
        shipped: { completed: true, icon: Check },
        outForDelivery: { completed: true, icon: Package },
        delivered: { completed: false, icon: Check }
      },
      'delivered': {
        orderPlaced: { completed: true, icon: Check },
        packed: { completed: true, icon: Check },
        shipped: { completed: true, icon: Check },
        outForDelivery: { completed: true, icon: Package },
        delivered: { completed: true, icon: Check }
      }
    };

    return statusMap[status] || statusMap['confirmed'];
  };

  // Generate order activity based on order status
  const generateOrderActivity = (order) => {
    if (!order) return [];
    
    const activities = [];
    const createdAt = formatDate(order.createdAt);
    const updatedAt = formatDate(order.updatedAt);

    // Order placed activity
    activities.push({
      id: 1,
      icon: CheckCircle,
      iconColor: 'text-green-500',
      title: 'Your order has been confirmed',
      date: createdAt,
      completed: true
    });

    // Order verified activity
    activities.push({
      id: 2,
      icon: CheckCircle,
      iconColor: 'text-green-500',
      title: 'Your order is successfully verified.',
      date: updatedAt,
      completed: true
    });

    // Additional activities based on status
    if (order.status === 'shipped' || order.status === 'out for delivery' || order.status === 'delivered') {
      activities.push({
        id: 3,
        icon: Package,
        iconColor: 'text-blue-500',
        title: 'Your order shipped to (last mile) hub',
        date: updatedAt,
        completed: true
      });
    }

    if (order.status === 'out for delivery' || order.status === 'delivered') {
      activities.push({
        id: 4,
        icon: MapPin,
        iconColor: 'text-blue-500',
        title: 'Your order has reached at last mile hub',
        date: updatedAt,
        completed: true
      });
    }

    return activities.reverse(); // Show latest activity first
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order details...</p>
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
            <p className="text-red-600">Error loading order details: {error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!orderData || !orderData.items) {
    return (
      <div>
        <Header />
        <div className="mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Order not found or no items in order</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const orderStatus = getOrderStatus(orderData.status);
  const orderActivity = generateOrderActivity(orderData);
  const totalItems = orderData.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Header />
      <div className="mx-auto p-6 bg-gray-50 min-h-screen">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-red-600 mb-8">Order Details</h1>

        {/* Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-4xl">
            {/* Order Placed */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                orderStatus.orderPlaced.completed ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <Check className="w-4 h-4" />
              </div>
              <span className="text-xs mt-2 text-gray-700">Order Placed</span>
            </div>

            {/* Connection Line */}
            <div className={`flex-1 h-0.5 mx-2 ${orderStatus.packed.completed ? 'bg-red-600' : 'bg-gray-300'}`}></div>

            {/* Packed */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                orderStatus.packed.completed ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <Check className="w-4 h-4" />
              </div>
              <span className="text-xs mt-2 text-gray-700">Packed</span>
            </div>

            {/* Connection Line */}
            <div className={`flex-1 h-0.5 mx-2 ${orderStatus.shipped.completed ? 'bg-red-600' : 'bg-gray-300'}`}></div>

            {/* Shipped */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                orderStatus.shipped.completed ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <Check className="w-4 h-4" />
              </div>
              <span className="text-xs mt-2 text-gray-700">Shipped</span>
            </div>

            {/* Connection Line */}
            <div className={`flex-1 h-0.5 mx-2 ${orderStatus.outForDelivery.completed ? 'bg-red-600' : 'bg-gray-300'}`}></div>

            {/* Out for Delivery */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                orderStatus.outForDelivery.completed ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xs mt-2 text-gray-700">Out for Delivery</span>
            </div>

            {/* Connection Line */}
            <div className={`flex-1 h-0.5 mx-2 ${orderStatus.delivered.completed ? 'bg-red-600' : 'bg-gray-300'}`}></div>

            {/* Delivered */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                orderStatus.delivered.completed ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <Check className="w-4 h-4" />
              </div>
              <span className="text-xs mt-2 text-gray-700">Delivered</span>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">#{orderData._id}</h2>
              <p className="text-sm text-gray-600">
                {totalItems} Product{totalItems !== 1 ? 's' : ''} • Order Placed on {formatDate(orderData.createdAt)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Status: <span className="capitalize font-medium">{orderData.status}</span> • 
                Payment: <span className="capitalize font-medium">{orderData.paymentStatus}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">₹{orderData.finalAmount?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Product Details */}
          <div className="space-y-6">
            {orderData.items.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-6">
                  {item.product?.images && item.product.images.length > 0 && (
                    <div className="w-20 h-24 bg-gray-50 border rounded flex items-center justify-center">
                      <img 
                        src={`/uploads/${item.product.images[0]}`}
                        alt={item.product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900 mb-2">{item.product?.name || 'Unknown Product'}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                      <span className="text-sm font-medium text-gray-900">₹{item.price} each</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Order Activity */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-6">Order Activity</h3>
              <div className="space-y-6">
                {orderActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className={`p-2 rounded-full bg-blue-50 ${activity.iconColor}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900 mb-1">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Bill Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
            <h3 className="font-semibold text-gray-900 mb-6">Bill Details</h3>
            <div className="space-y-4">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.product?.name || 'Unknown Product'}</span>
                  <span className="text-gray-900">₹{item.price} × {item.quantity}<br/>= ₹{item.price * item.quantity}</span>
                </div>
              ))}
              
              {orderData.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-₹{orderData.discount?.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total Amount</span>
                  <span className="font-bold text-gray-900">₹{orderData.finalAmount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-semibold text-red-600 uppercase">{orderData.paymentStatus}</span>
                  <span className="text-sm text-gray-600">via {orderData.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {orderData.address && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="text-sm text-gray-600">
                  <p>{orderData.address.name}</p>
                  <p>{orderData.address.address}</p>
                  <p>{orderData.address.city}, {orderData.address.state} - {orderData.address.pincode}</p>
                  <p>{orderData.address.country}</p>
                  <p className="mt-2">Phone: {orderData.address.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;