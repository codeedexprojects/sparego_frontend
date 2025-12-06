// pages/carousels/index.jsx
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import CarouselTable from "./components/CarouselTable/CarouselTable";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import {
  getCarousels,
  addCarousel,
  updateCarousel,
  deleteCarousel,
  toggleCarouselStatus,
  clearError
} from "../../../redux/slices/adminCarouselSlice";

const CarouselsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { mainCarousels, bottomCarousels, homeCarousels, loading, error } = useSelector(
    (state) => state.adminCarousel
  );
  // Gate fetches by token presence only (no verify endpoint available)

  // Fetch all carousels after token presence is confirmed
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) return;
    dispatch(getCarousels("main"));
    dispatch(getCarousels("bottom"));
    dispatch(getCarousels("home"));
  }, [dispatch]);

  const handleAddCarousel = async (carouselType, carouselData) => {
    try {
      await dispatch(addCarousel({ carouselType, carouselData })).unwrap();
      toast.success("Carousel added successfully");
    } catch (error) {
      const message = error?.message || "Failed to add carousel";
      console.error("Failed to add carousel:", message);
      toast.error(message);
    }
  };

  const handleEditCarousel = async (carouselType, oldCarousel, newData) => {
    try {
      await dispatch(updateCarousel({
        carouselType,
        carouselId: (oldCarousel._id || oldCarousel.id),
        carouselData: newData
      })).unwrap();
      toast.success("Carousel updated");
    } catch (error) {
      const message = error?.message || "Failed to update carousel";
      console.error("Failed to update carousel:", message);
      toast.error(message);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const handleDeleteCarousel = async (carouselType, carouselToDelete) => {
    setToDelete({ carouselType, carousel: carouselToDelete });
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    const { carouselType, carousel } = toDelete;
    try {
      await dispatch(deleteCarousel({
        carouselType,
        carouselId: (carousel._id || carousel.id)
      })).unwrap();
      toast.success('Carousel deleted');
    } catch (error) {
      const message = error?.message || 'Failed to delete carousel';
      console.error('Failed to delete carousel:', message);
      toast.error(message);
    } finally {
      setConfirmOpen(false);
      setToDelete(null);
    }
  };

  const handleToggleStatus = async (carouselType, carouselToToggle) => {
    try {
      const newStatus = !carouselToToggle.isActive;
      await dispatch(toggleCarouselStatus({
        carouselType,
        carouselId: (carouselToToggle._id || carouselToToggle.id),
        currentStatus: carouselToToggle.isActive
      })).unwrap();
      const carouselTypeName = carouselType === 'main' ? 'Main Carousel' : carouselType === 'bottom' ? 'Bottom Carousel' : 'Home Carousel';
      toast.success(`${carouselTypeName} ${newStatus ? 'activated' : 'deactivated'} successfully`);
      // Refetch carousels to update the list
      dispatch(getCarousels("main"));
      dispatch(getCarousels("bottom"));
      dispatch(getCarousels("home"));
    } catch (error) {
      const message = error?.message || "Failed to toggle carousel status";
      console.error("Failed to toggle carousel status:", message);
      toast.error(message);
    }
  };

  // Handle 401 errors and clear others (you can add toast here)
  useEffect(() => {
    if (error) {
      console.error("Carousel error:", error?.message || error);
      if (error?.status === 401 || /invalid|expired token/i.test(error?.message || '')) {
        // Token invalid; redirect to login
        router.push('/login');
        return;
      }
      toast.error(error?.message || 'Something went wrong');
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch, router]);

  return (
    <ProtectedRoute>
      <CarouselTable
        mainCarousels={mainCarousels}
        bottomCarousels={bottomCarousels}
        homeCarousels={homeCarousels}
        products={[]} // You might want to fetch products from another slice
        onAddCarousel={handleAddCarousel}
        onEditCarousel={handleEditCarousel}
        onDeleteCarousel={handleDeleteCarousel}
        onToggleStatus={handleToggleStatus}
        itemsPerPage={6}
        loading={loading}
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Delete"
        description={`Are you sure you want to delete "${toDelete?.carousel?.title || ''}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => { setConfirmOpen(false); setToDelete(null); }}
      />
    </ProtectedRoute>
  );
};

export default CarouselsPage;