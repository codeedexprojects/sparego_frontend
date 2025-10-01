"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import Tabs from "../../../components/admin/Tabs";
import BrandTable from "./components/BrandTable/BrandTable";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  clearError,
  clearSuccess,
} from "../../../redux/slices/adminBrandSlice";
import { fetchSections } from "../../../redux/slices/sectionSlice";

const BrandPage = ({ 
  title = "Brand Management", 
  description = "Manage your product brands and organization",
  tabs = [
    { id: "vehicle", label: "Vehicle Brands" },
    { id: "product", label: "Product Brands" },
  ]
}) => {
  const dispatch = useDispatch();

  const { brands, loading, error, success, successMessage } = useSelector(state => state.adminBrand);
  const { sections } = useSelector(state => state.sections); 

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "vehicle");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  // Fetch brands and sections
  useEffect(() => {
    dispatch(getBrands(activeTab));
    if (activeTab === "product") dispatch(fetchSections());
  }, [dispatch, activeTab]);

  // Handle success
  useEffect(() => {
    if (success && successMessage) {
      showNotification(successMessage, "success");
      dispatch(clearSuccess());
    }
  }, [success, successMessage, dispatch]);

  // Handle error
  useEffect(() => {
    if (error) {
      const message = typeof error === 'string' ? error : (error?.message || 'Something went wrong');
      showNotification(message, "error");
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleAddBrand = async (formData) => {
    try {
      await dispatch(createBrand({ brandData: formData, brandType: activeTab })).unwrap();
    } catch (e) {}
  };

  const handleEditBrand = async (brand, formData) => {
    try {
      const brandId = brand.id || brand._id;
      await dispatch(updateBrand({ id: brandId, brandData: formData, brandType: activeTab })).unwrap();
    } catch (e) { console.error(e); }
  };

  const handleDeleteBrand = async (brand) => {
    try {
      const brandId = brand.id || brand._id;
      await dispatch(deleteBrand({ id: brandId, brandType: activeTab })).unwrap();
    } catch (e) {}
  };

  return (
    <ProtectedRoute>
      <div className="bg-white shadow-lg rounded-xl p-6">
        {notification.show && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}>
            {notification.message}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <BrandTable
          brands={brands}
          sections={activeTab === "product" ? sections || [] : []} // Only pass sections for product brands
          onAddBrand={handleAddBrand}
          onEditBrand={handleEditBrand}
          onDeleteBrand={handleDeleteBrand}
          brandType={activeTab}
        />
      </div>
    </ProtectedRoute>
  );
};

export default BrandPage;
