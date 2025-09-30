
"use client"
import Header from '@/components/user/homeappliance/Header'
import React from 'react'
import WishlistPage from './components/WishlistProducts'
import Footer from '@/components/landing/Footer'
import PromotionalBannerSection from './components/OfferSection'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

function page() {

   const { user, loading: userLoading } = useSelector(state => state.auth);
  const router = useRouter();

  if (userLoading) {
    return (
      <div className="text-center py-20">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='bg-white'>
      <Header></Header>
      <WishlistPage></WishlistPage>
      <PromotionalBannerSection></PromotionalBannerSection>
      <Footer></Footer>
    </div>
  )
}

export default page
