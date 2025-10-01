"use client";
import React, { useState, useEffect } from "react";
import { Minus, Plus, ShoppingBasket, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import { IMG_URL } from "@/redux/baseUrl";
import { useRouter } from "next/navigation";

const MyCart = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const [updatingItems, setUpdatingItems] = useState({});
  const [removingItems, setRemovingItems] = useState({});
  const router = useRouter();
    const { user } = useSelector((state) => state.auth);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getCart());
    } else {
      toast.error("Please login to view your cart");
    }
  }, [dispatch]);
  const handleQuantityChange = async (productId, change) => {
    const currentItem = cart?.items?.find(
      (item) => item.product._id === productId
    );
    if (!currentItem) return;
    const newQuantity = currentItem.quantity + change;
    if (newQuantity < 1) return;
    setUpdatingItems((prev) => ({ ...prev, [productId]: true }));
    try {
      const resultAction = await dispatch(
        updateCartItem({
          productId: productId,
          quantity: newQuantity,
        })
      );

      if (updateCartItem.fulfilled.match(resultAction)) {
        toast.success("Cart updated successfully");
        dispatch(getCart());
      } else {
        const errorMsg = resultAction.payload || "Failed to update cart";
        toast.error(
          typeof errorMsg === "string" ? errorMsg : "Failed to update cart"
        );
      }
    } catch (error) {
      console.error("Update cart error:", error);
      toast.error("An error occurred while updating cart");
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleRemoveItem = async (productId) => {
    setRemovingItems((prev) => ({ ...prev, [productId]: true }));

    try {
      const resultAction = await dispatch(removeFromCart(productId));

      if (removeFromCart.fulfilled.match(resultAction)) {
        toast.success("Item removed from cart");
        dispatch(getCart());
      } else {
        const errorMsg = resultAction.payload || "Failed to remove item";
        toast.error(
          typeof errorMsg === "string" ? errorMsg : "Failed to remove item"
        );
      }
    } catch (error) {
      console.error("Remove item error:", error);
      toast.error("An error occurred while removing item");
    } finally {
      setRemovingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const calculateItemTotal = (item) => {
    const discountedPrice =
      item.price - (item.price * (item.discount || 0)) / 100;
    return discountedPrice * item.quantity;
  };

  const calculateSavings = (item) => {
    return ((item.price * (item.discount || 0)) / 100) * item.quantity;
  };

  const calculateTotalSavings = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (total, item) => total + calculateSavings(item),
      0
    );
  };

  if (loading)
    return (
      <div className="mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );

if (!user) {
  return (
   <div className=" flex items-center justify-center p-6 bg-gradient-to-br from-red-50 to-white">
  <div className="max-w-md w-full">
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
         <ShoppingBasket className="w-16 h-16 text-red-600"/>
        </div>
      </div>

      {/* Content */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
        Your Cart Awaits
      </h2>
      <p className="text-gray-600 text-center mb-8 leading-relaxed">
        Sign in to access your saved items, manage your profile, and track your orders all in one place.
      </p>

      {/* Button */}
      <button
        className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 hover:scale-105 transform"
        onClick={() => router.push("/spare/login")}
      >
        Login to Continue
      </button>

      {/* Footer text */}
      <p className="text-sm text-gray-500 text-center mt-6">
        Don't have an account?{' '}
        <button 
          className="text-red-600 hover:text-red-700 font-medium hover:underline"
          onClick={() => router.push("/spare/register")}
        >
          Sign up
        </button>
      </p>
    </div>
  </div>
</div>
  );
}


  if (!cart || !cart.items || cart.items.length === 0)
    return (
      <div className="mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="text-center py-12">
          <div className="mb-4">
            <ShoppingCart className="inline-block h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">Add some items to get started!</p>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            onClick={() => router.push("/homeappliances/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );

  return (
    <div className="mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 border-b-2 border-red-500 pb-2 inline-block">
          MY CART ({cart.items.length}{" "}
          {cart.items.length === 1 ? "item" : "items"})
        </h1>
      </div>
      <div className="space-y-6">
        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm relative"
          >
            <button
              onClick={() => handleRemoveItem(item.product._id)}
              disabled={removingItems[item.product._id]}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-28 h-32 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  {item.product.images && item.product.images.length > 0 ? (
                    <img
                      src={`${IMG_URL}/${item.product.images[0]}`}
                      alt={item.product.name}
                      className="w-20 h-24 object-contain "
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZjNmNGY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGR5PSIuMzVlbSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                      }}
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {item.product.name}
                </h3>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{calculateItemTotal(item).toLocaleString()}
                    </span>
                    {item.discount > 0 && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    )}
                  </div>
                  {item.discount > 0 && (
                    <span className="text-green-600 font-medium">
                      You save ₹{calculateSavings(item).toLocaleString()} (
                      {item.discount}% off)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => handleQuantityChange(item.product._id, -1)}
                    disabled={
                      updatingItems[item.product._id] || item.quantity <= 1
                    }
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors text-red-500 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg text-black font-medium min-w-[2rem] text-center px-4">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.product._id, 1)}
                    disabled={updatingItems[item.product._id]}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors text-red-500 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">
              ₹{cart.cartTotal?.toLocaleString() || "0"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">
              -₹{cart.cartDiscount?.toLocaleString() || "0"}
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">
              ₹{cart.cartTotal?.toLocaleString() || "0"}
            </span>
          </div>
        </div>
        <div className="flex items-center mb-6 p-4 bg-green-50 rounded-lg">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <Trash2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-gray-600">
            You'll be redirected to WhatsApp to complete your order
          </span>
        </div>
        <button
          onClick={() => router.push("/spare/checkout")}
          className="w-full bg-red-600 text-white px-6 py-3 rounded font-medium hover:bg-red-700 transition-colors"
        >
          Place order (₹{cart.cartTotal?.toLocaleString() || "0"})
        </button>
      </div>
    </div>
  );
};

export default MyCart;
