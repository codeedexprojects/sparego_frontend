import Header from '@/components/user/homeappliance/Header'
import React from 'react'
import WishlistPage from './components/WishlistProducts'
import Footer from '@/components/landing/Footer'
import PromotionalBannerSection from './components/OfferSection'

function page() {
  return (
    <div className='bg-white'>
      <Header></Header>
      <WishlistPage></WishlistPage>
      <PromotionalBannerSection section="home-appliances" page="wishlist"></PromotionalBannerSection>
      <Footer></Footer>
    </div>
  )
}

export default page
