import React from 'react'
import ApplianceCarousel from './components/ApplianceCarousel'
import Brands from './components/Brands'
import FeatureSection from './components/FeatureSection'
import HeroSection from './components/HeroSection'
import OfferSection from './components/OfferSection'
import PopularItems from './components/PopularItems'
import Header from '@/components/user/homeappliance/Header'
import Testimonials from './components/Testimonials'
import Footer from '@/components/landing/Footer'

function Page() {
  return (
    <div>
        <Header></Header>
        <HeroSection></HeroSection>
        <FeatureSection></FeatureSection>
        <PopularItems></PopularItems>
        <OfferSection section="home-appliances" page="home"></OfferSection>
        <Brands></Brands>
        <ApplianceCarousel></ApplianceCarousel>
        <Testimonials></Testimonials>
        <Footer></Footer>
      
    </div>
  )
}

export default Page
