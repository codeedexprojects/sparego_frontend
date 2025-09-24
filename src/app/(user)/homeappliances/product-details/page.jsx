"use client";
import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import SpecificationsSection from './components/SpecificationSection';
import HowToUseSection from './components/HowToUseSection';
import SpecTable from './components/SpecTableSection';
import Footer from '@/components/landing/Footer';
import SimilarProducts from './components/SimilarProducts';
import PromotionalBannerSection from './components/OfferSection';
import Header from '@/components/user/homeappliance/Header';
 
const page = () => {
  const [activeTab, setActiveTab] = useState('TWO WHEELER');
  const [isFavorite, setIsFavorite] = useState(false);

  return (
   <div>
    <Header></Header>
        <div className=" mx-auto p-6 bg-white min-h-screen space-y-8">
          <HeroSection 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />
          <OverviewSection />
          <SpecificationsSection />
          <HowToUseSection />
          <SpecTable />
          <SimilarProducts></SimilarProducts>
          <PromotionalBannerSection section="home-appliances" page="product-detail"></PromotionalBannerSection>
        </div>
        <Footer></Footer>
   </div>
  );
};

export default page;