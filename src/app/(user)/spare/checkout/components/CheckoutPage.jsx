"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { getCart } from '@/redux/slices/cartSlice';
import { getAddress } from '@/redux/slices/addressSlice';
import { createOrder } from '@/redux/slices/orderSlice'; 
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { address: addresses, loading: addressLoading } = useSelector((state) => state.address);
  
  const { loading: orderLoading, error: orderError } = useSelector((state) => state.order);
  
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'India',
    address: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    email: '',
    phoneNumber: '',
    addressType: 'Home',
    isDefault: false
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCart());
      dispatch(getAddress());
    } else {
      toast.error('Please login to proceed with checkout');
    }
  }, [dispatch]);

  // Set default address as selected when addresses are loaded
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddress._id);
    }
  }, [addresses, selectedAddressId]);

 
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const getSelectedAddress = () => {
    return addresses?.find(addr => addr._id === selectedAddressId);
  };

  const calculateItemTotal = (item) => {
    const discountedPrice = item.price - (item.price * (item.discount || 0) / 100);
    return discountedPrice * item.quantity;
  };

  
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select a delivery address');
      return;
    }

    if (!cart?.items || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading('Creating your order...');
      
      // Prepare order data
      const orderData = {
        addressId: selectedAddressId
      };

      // Dispatch createOrder action
      const result = await dispatch(createOrder(orderData)).unwrap();
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success && result.whatsappUrl) {
        toast.success('Order created successfully! Redirecting to WhatsApp...');
        
        // Open WhatsApp URL
        window.open(result.whatsappUrl, '_blank');
        
        
        router.push('/spare/order-confirmed');
      } else {
        toast.error('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error || 'Failed to create order. Please try again.');
    }
  };

  // Redirect to add address page instead of showing form
  const handleAddNewAddress = () => {
    router.push('/address/add'); // Change this to your actual address page route
  };

  // Show loading if cart, addresses, or order is loading
  if (loading || orderLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-600">
            {orderLoading ? 'Creating your order...' : 'Loading checkout...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || orderError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg font-medium mb-2">Error</p>
          <p className="text-gray-600">{error || orderError}</p>
        </div>
      </div>
    );
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to proceed with checkout</p>
          <button 
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            onClick={() => window.history.back()}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Address Selection */}
          <div className="bg-white p-8 rounded-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">Delivery Address</h2>
              <button className="text-blue-600 hover:text-blue-800 underline text-sm">
                Log in
              </button>
            </div>

            {/* Address Loading */}
            {addressLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
                <p className="text-gray-600">Loading addresses...</p>
              </div>
            )}

            {/* Saved Addresses */}
            {!addressLoading && addresses && addresses.length > 0 ? (
              <div className="space-y-4 mb-6">
                {addresses.map((address) => (
                  <div 
                    key={address._id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedAddressId === address._id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAddressSelect(address._id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          <input
                            type="radio"
                            name="selectedAddress"
                            checked={selectedAddressId === address._id}
                            onChange={() => handleAddressSelect(address._id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{address.name}</h3>
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              {address.addressType}
                            </span>
                            {address.isDefault && (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 text-sm mb-1">
                            {address.address}, {address.street}
                          </p>
                          <p className="text-gray-700 text-sm mb-1">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-gray-700 text-sm mb-2">{address.country}</p>
                          <p className="text-gray-600 text-sm">Phone: {address.phone}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : !addressLoading && (
              <div className="text-center py-8 text-gray-500">
                <p>No addresses found. Please add an address to continue.</p>
              </div>
            )}

            {/* Add New Address Button - Redirects to address page */}
            <button 
              onClick={handleAddNewAddress}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors mb-6"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-gray-600 font-medium">Add New Address</span>
              </div>
            </button>
          </div>

          {/* Right Side - Your Order */}
          <div className="bg-white p-8 rounded-lg h-fit">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Your order ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})
            </h2>

            {/* Product Items */}
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => {
                const itemTotal = calculateItemTotal(item);
                return (
                  <div key={item.product._id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img 
                          src={`/api/images/${item.product.images[0]}`}
                          alt={item.product.name}
                          className="w-16 h-20 object-contain"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjgwIiBmaWxsPSIjZjNmNGY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIuMzVlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                      ) : (
                        <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">No Image</span>
                        </div>
                      )}
                      <div className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">{item.product.brand || 'Brand'}</p>
                      {item.discount > 0 && (
                        <p className="text-xs text-green-600">
                          {item.discount}% off - You save ₹{((item.price * item.discount / 100) * item.quantity).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">₹{itemTotal.toLocaleString()}</span>
                      {item.discount > 0 && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{cart.cartTotal?.toLocaleString() || '0'}</span>
              </div>
              {cart.cartDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Total Discount</span>
                  <span>-₹{cart.cartDiscount?.toLocaleString() || '0'}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold text-gray-900 border-t border-gray-200 pt-3">
                <span>Total</span>
                <span>₹{cart.cartTotal?.toLocaleString() || '0'}</span>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-6 mb-4">
              <div className="flex items-center justify-center w-full text-black py-3 rounded transition-colors">
                <div className="w-5 h-5 mr-2 text-green-500">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                  </svg>
                </div>
                Send your Order via WhatsApp
              </div>
            </div>

            {/* Privacy Policy Text */}
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
              <button className="text-blue-600 hover:text-blue-800 underline">
                privacy policy
              </button>
              .
            </p>

            {/* Place Order Button */}
            <button 
              onClick={handlePlaceOrder}
              disabled={orderLoading || !selectedAddressId}
              className={`w-full py-4 px-6 rounded font-medium text-lg transition-colors ${
                orderLoading || !selectedAddressId
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {orderLoading 
                ? 'Creating Order...' 
                : `Place order (₹${cart.cartTotal?.toLocaleString() || '0'})`
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;