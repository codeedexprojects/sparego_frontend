import Footer from '@/components/landing/Footer'
import Header from '@/components/user/watches/Header'
import React from 'react'
import FullBackgroundHeroSection from './components/HeroSection'
import FeaturesBenefitsSection from './components/FeatureSection'
import PopularItemsSection from './components/PupularItems'
import PromotionalBannerSection from './components/OfferSection'
import PopularBrands from './components/Brands'
import TestimonialsSection from './components/Testimonilels'
import WatchCarousel from './components/WatchCarousel'

function page() {
  return (
    <div>
        <Header></Header>
        <FullBackgroundHeroSection></FullBackgroundHeroSection>
        <FeaturesBenefitsSection></FeaturesBenefitsSection>
        <PopularItemsSection></PopularItemsSection>
        <PromotionalBannerSection></PromotionalBannerSection>
        <PopularBrands></PopularBrands>
        <WatchCarousel></WatchCarousel>
        <TestimonialsSection></TestimonialsSection>
        <Footer></Footer>
    </div>
  )
}

export default page