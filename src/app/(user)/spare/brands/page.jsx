import Footer from '@/components/landing/Footer'
import Header from '@/components/user/spare/Header'
import React from 'react'
import BrandSelectionSection from './components/BrandCards'
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