import Header from '@/components/user/spare/Header'
import React from 'react'
import Footer from '@/components/landing/Footer'
import AutomotivePartsCatalog from './components/CategoryCard'
import PromotionalBannerSection from './components/OfferSection'

function page() {
    return (
        <div>
            <Header></Header>
            <AutomotivePartsCatalog></AutomotivePartsCatalog>
            <PromotionalBannerSection></PromotionalBannerSection>
            <Footer></Footer>
        </div>
    )
}

export default page