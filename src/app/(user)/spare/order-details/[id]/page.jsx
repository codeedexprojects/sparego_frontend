import React from 'react';
import { Check, MapPin, Package, Truck, CheckCircle } from 'lucide-react';
import Header from '@/components/user/spare/Header';
import Footer from '@/components/landing/Footer';

const page = () => {
  const orderStatus = {
    orderPlaced: { completed: true, icon: Check },
    packed: { completed: true, icon: Check },
    shipped: { completed: true, icon: Check },
    outForDelivery: { completed: false, icon: Package },
    delivered: { completed: false, icon: Check }
  };

  const orderActivity = [
    {
      id: 1,
      icon: MapPin,
      iconColor: 'text-blue-500',
      title: 'Your order has reached at last mile hub',
      date: 'Mon, Dec 18, 08:12 am at 7:32 PM',
      completed: false
    },
    {
      id: 2,
      icon: Package,
      iconColor: 'text-blue-500',
      title: 'Your order shipped to (last mile) hub',
      date: 'Fri, Dec 12, 06:12 pm at 7:32 PM',
      completed: false
    },
    {
      id: 3,
      icon: CheckCircle,
      iconColor: 'text-green-500',
      title: 'Your order is successfully verified.',
      date: 'Thu Dec 10, 08:12 pm',
      completed: true
    },
    {
      id: 4,
      icon: CheckCircle,
      iconColor: 'text-blue-500',
      title: 'Your order has been confirmed',
      date: 'Fri, Dec 8, 09:12 pm',
      completed: true
    }
  ];

  return (
    <div>
        <Header></Header>
        <div className=" mx-auto p-6 bg-gray-50 min-h-screen">
          
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
                <h2 className="text-xl font-semibold text-gray-900 mb-2">#96459761</h2>
                <p className="text-sm text-gray-600">2 Products • Order Placed in Fri, Dec 8, 09:12 pm at 7:32 PM</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">₹798</span>
              </div>
            </div>
          </div>
    
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Side - Product Details */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-24 bg-gray-50 border rounded flex items-center justify-center">
                    <img 
                      src="/api/placeholder/80/100" 
                      alt="Castrol Power1 4T Engine Oil"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900 mb-2">Castrol Power1 4T Engine Oil</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Quantity: 2</span>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Order Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-6">Order Activity</h3>
                <div className="space-y-6">
                  {orderActivity.map((activity, index) => (
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Item Total</span>
                  <span className="text-gray-900">₹399 x 2<br/>= ₹798</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Extra discount for you</span>
                  <span className="text-gray-900">-₹25</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-red-600">PAYED</span>
                    <span className="font-bold text-gray-900">₹798</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default page;