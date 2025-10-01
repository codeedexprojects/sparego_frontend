import Header from '@/components/user/watches/Header'
import React from 'react'
import BrandCards from './components/BrandCards'
import OfferSection from './components/OfferSection'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
      <Header></Header>
      <BrandCards></BrandCards>
      <OfferSection></OfferSection>
      <Footer></Footer>
    </div>
  )
}

export default page
