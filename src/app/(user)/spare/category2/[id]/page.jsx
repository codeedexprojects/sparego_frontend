import Header from '@/components/user/spare/Header'
import React from 'react'
import Footer from '@/components/landing/Footer'
import PromotionalBannerSection from './components/OfferSection'
import SubCategoryPage from './components/CategoryCard'

function page() {
    return (
        <div>
            <Header></Header>
            <SubCategoryPage></SubCategoryPage>
            <PromotionalBannerSection></PromotionalBannerSection>
            <Footer></Footer>
        </div>
    )
}

export default page