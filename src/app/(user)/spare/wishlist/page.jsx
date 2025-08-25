import Header from '@/components/user/spare/Header'
import React from 'react'
import WishlistProducts from './components/WishlistProducts'
import Footer from '@/components/landing/Footer'
import PromotionalBannerSection from './components/OfferSection'

function page() {
  return (
    <div className='bg-white'>
        <Header></Header>
        <WishlistProducts></WishlistProducts>
        <PromotionalBannerSection></PromotionalBannerSection>
        <Footer></Footer>
    </div>
  )
}

export default page