import Footer from '@/components/landing/Footer';
import Header from '@/components/user/spare/Header';
import React from 'react';

const page = () => {
  const recentOrders = [
    {
      id: 1,
      productName: 'Castrol Power1 4T Engine Oil',
      price: '₹798',
      orderId: '#454545454358 | Fri, Dec 8, 09:12 pm',
      status: 'Shipped',
      statusColor: 'blue',
      image: '/home/product1.png'
    }
  ];

  const pastOrders = [
    {
      id: 1,
      productName: 'Castrol Power1 4T Engine Oil',
      price: '₹798',
      orderId: '#454545454358 | Fri, Dec 8, 09:12 pm',
      status: 'Delivered',
      statusColor: 'green',
      image: '/home/product1.png'
    },
    {
      id: 2,
      productName: 'Castrol Power1 4T Engine Oil',
      price: '₹798',
      orderId: '#454545454358 | Fri, Dec 8, 09:12 pm',
      status: 'Cancelled',
      statusColor: 'red',
      image: '/home/product1.png'
    }
  ];

  const getStatusDot = (color) => {
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      red: 'bg-red-500'
    };
    return colorClasses[color] || 'bg-gray-500';
  };

  const OrderCard = ({ order }) => (
    <div className="border border-gray-300 rounded p-6 bg-white">
      <div className="flex items-center justify-between">
        {/* Left side - Product info */}
        <div className="flex items-center gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={order.image}
              alt={order.productName}
              className="w-16 h-20 object-contain"
            />
          </div>

          {/* Product Details */}
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              {order.productName} <span className="text-gray-900">{order.price}</span>
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              Order {order.orderId}
            </p>
            <button className="bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* Right side - Status and Reorder */}
        <div className="flex items-center gap-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusDot(order.statusColor)}`}></div>
            <span className="text-sm font-medium text-gray-700">{order.status}</span>
          </div>

          {/* Reorder Button */}
          <button className="border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
            Reorder
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
        <Header></Header>
        <div className=" mx-auto p-6 bg-gray-50 min-h-screen">
          
          {/* Recent Orders Section */}
          <div className="mb-12">
            <h1 className="text-2xl font-semibold text-red-600 mb-6">Recent Orders</h1>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
    
          {/* Past Orders Section */}
          <div>
            <h2 className="text-2xl font-semibold text-red-600 mb-6">Past Orders</h2>
            <div className="space-y-4">
              {pastOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default page;