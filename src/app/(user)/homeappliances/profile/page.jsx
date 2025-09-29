"use client";
import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import Footer from "@/components/landing/Footer";
import { useSelector, useDispatch } from "react-redux";
import { createAddress, getAddress, updateAddress, deleteAddress } from "@/redux/slices/addressSlice";
import { AddressForm } from "./components/AddressForm";
import { AddressList } from "./components/AddressList";
import { getUserProfile } from "@/redux/slices/authSlice";
import Header from "@/components/user/homeappliance/Header";

// Main Address Page Component
const AddressPage = () => {
  const dispatch = useDispatch();
  const { address: addresses, loading, error } = useSelector((state) => state.address);
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

  useEffect(() => {
    dispatch(getAddress());
    dispatch(getUserProfile()); 
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
        .then(() => {
          setFormLoading(false);
        })
        .catch(() => {
          setFormLoading(false);
        });
    }
  };

  const handleSubmitAddress = (addressData) => {
    setFormLoading(true);
    
    if (editingAddress) {
      dispatch(updateAddress({ id: editingAddress.id, updatedData: addressData }))
        .unwrap()
        .then(() => {
          setFormLoading(false);
          setShowForm(false);
          setEditingAddress(null);
        })
        .catch(() => {
          setFormLoading(false);
        });
    } else {
      
      dispatch(createAddress(addressData))
        .unwrap()
        .then(() => {
          setFormLoading(false);
          setShowForm(false);
        })
        .catch(() => {
          setFormLoading(false);
        });
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  return (
    <div>
      <Header />
      <div className="bg-white min-h-screen py-10 px-6 lg:px-20 space-y-6">
        {/* Name & Email */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
           <h2 className="font-semibold text-gray-800">
  {!mounted || userLoading ? "Loading..." : user?.name || "User Name"}
</h2>
          </div>
          <p className="text-sm text-gray-500">Number</p>
        <p className="text-gray-700">
  {!mounted || userLoading ? "Loading..." : user?.number || "No Number available"}
</p>
        </div>

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
      </div>
      <Footer />
    </div>
  );
};

export default AddressPage;