import Header from '@/components/user/watches/Header'
import React from 'react'
import WishlistPage from './components/WishlistProducts'
import OfferSection from './components/OfferSection'
import Footer from '@/components/landing/Footer'
import { Toaster } from 'sonner'

function Page() {
  return (
    <div className='bg-white'>
      <Header></Header>
      <WishlistPage></WishlistPage>
      <OfferSection></OfferSection>
      <Footer></Footer>
      <Toaster position='top-right' richColors></Toaster>
    </div>
  )
}

export default Page
