import Header from '@/components/user/spare/Header'
import React from 'react'
import WishlistProducts from './components/WishlistProducts'
import Footer from '@/components/landing/Footer'
import PromotionalBannerSection from './components/OfferSection'
// import { Toaster } from 'sonner'

function page() {
  return (
    <div className='bg-white'>
        <Header></Header>
        <WishlistProducts></WishlistProducts>
        <PromotionalBannerSection></PromotionalBannerSection>
        <Footer></Footer>
        {/* <Toaster position="top-center" richColors closeButton /> */}
    </div>
  )
}

export default page