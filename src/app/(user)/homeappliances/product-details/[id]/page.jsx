"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import SpecificationsSection from './components/SpecificationSection';
import HowToUseSection from './components/HowToUseSection';
import SpecTable from './components/SpecTableSection';
import Header from '@/components/user/homeappliance/Header';
import Footer from '@/components/landing/Footer';
import SimilarProducts from './components/SimilarProducts';
import PromotionalBannerSection from './components/OfferSection';
import { getProductById } from '@/redux/slices/productSlice';
import { useParams } from 'next/navigation';
import { Toaster } from 'sonner';

const page = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  
  const [activeTab, setActiveTab] = useState('TWO WHEELER');

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.vehicleType) {
      setActiveTab(product.vehicleType.toUpperCase().replace('-', ' '));
    }
  }, [product]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Loading product details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Product not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="mx-auto p-6 bg-white min-h-screen space-y-8">
        <HeroSection product={product} />
        <OverviewSection product={product} />
        <SpecificationsSection product={product} />
        <HowToUseSection product={product} />
        <SpecTable product={product} />
        <SimilarProducts />
        <PromotionalBannerSection />
      </div>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default page;