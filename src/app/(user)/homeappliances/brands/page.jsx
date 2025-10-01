import Header from '@/components/user/homeappliance/Header'
import React from 'react'
import BrandSelectionSection from './components/BrandSection'
import Footer from '@/components/landing/Footer'
import PromotionalBannerSection from './components/OfferSection'

function page() {
  return (
    <div>
      <Header></Header>
      <BrandSelectionSection></BrandSelectionSection>
      <PromotionalBannerSection></PromotionalBannerSection>
      <Footer></Footer>
    </div>
  )
}

export default page
