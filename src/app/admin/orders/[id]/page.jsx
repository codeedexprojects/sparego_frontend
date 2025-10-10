"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from '../../../../components/admin/ProtectedRoute';
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, updateOrderStatus, clearError } from "../../../../redux/slices/adminOrderSlice";
import { IMG_URL, BASE_URL } from "../../../../redux/baseUrl";
import ConfirmationAlertModal from "../../../../components/shared/ConfirmationAlertModal";

const OrderDetailPage = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const resolvedParams = use(params);
  
  const { currentOrder, loading, error } = useSelector((state) => state.adminOrder);
  const [order, setOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const resolveImageUrl = (path) => {
    if (!path) return "/placeholder-image.jpg";
    if (typeof path === 'string' && /^https?:\/\//i.test(path)) return path;
    if (typeof path === 'string' && path.startsWith('/uploads/')) {
      const origin = BASE_URL.replace(/\/api\/?$/, '');
      return `${origin}${path}`;
    }
    return `${IMG_URL}${path}`;
  };

  useEffect(() => {
    if (resolvedParams.id) {
      dispatch(getOrderById(resolvedParams.id));
    }
  }, [dispatch, resolvedParams.id]);

  useEffect(() => {
    if (currentOrder) {
      setOrder(currentOrder);
    }
  }, [currentOrder]);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleStatusUpdateClick = (newStatus) => {
    setPendingStatus(newStatus);
    setShowConfirmation(true);
  };

  const handleConfirmStatusUpdate = async () => {
    if (!pendingStatus) return;
    
    try {
      setUpdatingStatus(true);
      setSuccessMessage(null);
      setShowConfirmation(false);
      
      await dispatch(updateOrderStatus({ 
        id: resolvedParams.id, 
        status: pendingStatus 
      })).unwrap();
      
      dispatch(getOrderById(resolvedParams.id));
      
      setSuccessMessage(`Order status updated to ${pendingStatus} successfully!`);
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setSuccessMessage(`Failed to update order status: ${error.message || 'Unknown error'}`);
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } finally {
      setUpdatingStatus(false);
      setPendingStatus(null);
    }
  };

  const handleCancelStatusUpdate = () => {
    setShowConfirmation(false);
    setPendingStatus(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Order</h2>
            <p className="text-gray-600 mb-6">Failed to load order details</p>
            <button
              onClick={() => router.push("/admin/orders")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!order) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
            <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push("/admin/orders")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Order Details</h1>
          <button
            onClick={() => router.push("/admin/orders")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Back to Orders
          </button>
        </div>

        {successMessage && (
          <div className={`mb-6 p-4 rounded-md ${
            successMessage.includes('successfully') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order._id || order.id || "Unknown"}</h2>
                  <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {formatStatus(order.status)}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdateClick(status)}
                      disabled={updatingStatus}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === status
                          ? getStatusColor(status)
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      } ${updatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {formatStatus(status)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items && order.items.length > 0 ? order.items.map((item, index) => (
                    <div key={index} className="flex items-center border-b border-gray-100 pb-4">
                      <img
                        src={resolveImageUrl(item.product?.image || item.product?.images?.[0])}
                        alt={item.product?.name || "Product"}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4 flex-1">
                        <h4 className="text-md font-medium">{item.product?.name || "Unknown Product"}</h4>
                        <p className="text-gray-600">Quantity: {item.quantity || 0}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                        <p className="text-gray-600">₹{(item.price || 0).toFixed(2)} each</p>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-gray-500">
                      No items found in this order
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Customer Information</h3>
            {order.user ? (
              <div className="flex items-center mb-4">
                <img
                  src={resolveImageUrl(order.user.avatar)}
                  alt={order.user.name || "Customer"}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-medium">{order.user.name || "Unknown Customer"}</h4>
                  <p className="text-gray-600">{order.user.email || "No email provided"}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                Customer information not available
              </div>
            )}
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
            {order.address ? (
              <div className="text-gray-700">
                <p>{order.address.name || "Name not provided"}</p>
                <p>{order.address.address || "Address not provided"}</p>
                <p>
                  {order.address.city || "City"}, {order.address.state || "State"} {order.address.pincode || "Pincode"}
                </p>
                <p>{order.address.country || "Country"}</p>
                <p className="mt-2">Phone: {order.address.phone || "Phone not provided"}</p>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                Shipping address not available
              </div>
            )}
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Payment Information</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>₹{(order.totalAmount || 0).toFixed(2)}</span>
            </div>
            {(order.discount || 0) > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Discount:</span>
                <span className="text-green-600">-₹{(order.discount || 0).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t border-gray-200">
              <span>Total:</span>
              <span>₹{(order.finalAmount || order.totalAmount || 0).toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Payment Method: {order.paymentMethod || "Not specified"}</p>
              <p className="text-gray-600">
                Payment Status:{" "}
                <span
                  className={
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {formatStatus(order.paymentStatus)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <ConfirmationAlertModal
          isOpen={showConfirmation}
          type="confirm"
          title="Confirm Status Update"
          message={`Are you sure you want to update this order status to "${pendingStatus}"?`}
          confirmText="Yes, Update"
          cancelText="Cancel"
          onConfirm={handleConfirmStatusUpdate}
          onCancel={handleCancelStatusUpdate}
        />
      </div>
    </ProtectedRoute>
  );
};

export default OrderDetailPage;