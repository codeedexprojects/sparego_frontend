import Header from '@/components/user/spare/Header'
import React from 'react'
import SpareHeroSection from './components/HeroSection'
import FeaturesBenefitsSection from './components/FeatureSection'
import PopularItemsSection from './components/PopularItems'
import PromotionalBannerSection from './components/Promotion'
import NewArrivalsSection from './components/NewArrivals'
import SearchByVehicleSection from './components/SearchParts'
import PopularBrandsSection from './components/PopularBrands'
import TestimonialsSection from './components/Testimonilels'
import Footer from '@/components/landing/Footer'

function page() {
    return (
        <div>
            <Header></Header>
            <SpareHeroSection></SpareHeroSection>
            <FeaturesBenefitsSection></FeaturesBenefitsSection>
            <PopularItemsSection></PopularItemsSection>
            <PromotionalBannerSection></PromotionalBannerSection>
            <NewArrivalsSection></NewArrivalsSection>
            <SearchByVehicleSection></SearchByVehicleSection>
            <PopularBrandsSection></PopularBrandsSection>
            <TestimonialsSection></TestimonialsSection>
            <Footer></Footer>
        </div>
    )
}

export default page