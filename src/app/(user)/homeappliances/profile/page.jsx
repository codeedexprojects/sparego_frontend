"use client";
import React, { useState, useEffect, useRef } from "react";
import { Pencil, User2Icon } from "lucide-react";
import Header from "@/components/user/homeappliance/Header";
import Footer from "@/components/landing/Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} from "@/redux/slices/addressSlice";
import { AddressForm } from "./components/AddressForm";
import { AddressList } from "./components/AddressList";
import { getUserProfile, logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const AddressPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { address: addresses, loading, error } = useSelector(
    (state) => state.address
  );
  const { user, loading: userLoading } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState(null);
  

  const hasFetchedData = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      // If token exists, fetch profile and addresses
      if (storedToken && !hasFetchedData.current) {
        hasFetchedData.current = true;
        dispatch(getUserProfile());
        dispatch(getAddress());
      }
    }
  }, [dispatch]);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setFormLoading(true);
      dispatch(deleteAddress(id))
        .unwrap()
        .then(() => setFormLoading(false))
        .catch(() => setFormLoading(false));
    }
  };

 const handleSubmitAddress = (addressData) => {
  setFormLoading(true);

  if (editingAddress) {
    dispatch(
      updateAddress({ id: editingAddress._id, updatedData: addressData })
    )
      .unwrap()
      .then(() => {
        setFormLoading(false);
        setShowForm(false);
        setEditingAddress(null);
        router.back(); 
      })
      .catch(() => setFormLoading(false));
  } else {
    dispatch(createAddress(addressData))
      .unwrap()
      .then(() => {
        setFormLoading(false);
        setShowForm(false);
        router.back(); 
      })
      .catch(() => setFormLoading(false));
  }
};

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleLogout = () => {
    hasFetchedData.current = false;
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/spare/login");
  };

  if (!mounted) return null;

  if (!token) {
    return (
      <>
      <Header/>
      <div className=" flex items-center justify-center p-6 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
             <User2Icon className="w-10 h-10 text-red-600" />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Your Profile Awaits
            </h2>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              Sign in to access your saved items, manage your profile, and track
              your orders all in one place.
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
              Don't have an account?{" "}
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
      <Footer/>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="bg-white min-h-screen py-10 px-6 lg:px-20 space-y-6">
        {mounted && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-800">
                {!userLoading ? user?.name || "User Name" : "Loading..."}
              </h2>
            </div>
            <p className="text-sm text-gray-500">Number</p>
            <p className="text-gray-700">
              {!userLoading ? user?.number || "No Number available" : "Loading..."}
            </p>
          </div>
        )}

        {mounted && (
          <>
            {showForm ? (
              <AddressForm
                initialData={editingAddress}
                onSubmit={handleSubmitAddress}
                onCancel={handleCancelForm}
                loading={formLoading}
              />
            ) : (
              <AddressList
                addresses={addresses}
                onAdd={handleAddAddress}
                onEdit={handleEditAddress}
                onDelete={handleDeleteAddress}
                loading={loading}
                error={error}
              />
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddressPage;
