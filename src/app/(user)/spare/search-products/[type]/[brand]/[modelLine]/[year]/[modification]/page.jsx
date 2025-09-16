import Header from '@/components/user/spare/Header'
import React from 'react'
import { Toaster } from 'sonner'
import PromotionalBannerSection from './components/OfferSection'
import Footer from '@/components/landing/Footer'
import AutomotiveProductsGrid from './components/ProductCard'

function page() {
    return (
        <div>
            <Header></Header>
            <AutomotiveProductsGrid></AutomotiveProductsGrid>
            <PromotionalBannerSection></PromotionalBannerSection>
            <Footer></Footer>
            <Toaster position="top-center" richColors closeButton />
        </div>
    )
}

export default page