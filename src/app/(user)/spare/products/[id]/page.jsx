import Header from '@/components/user/spare/Header'
import React from 'react'
import Footer from '@/components/landing/Footer'
import AutomotiveProductsGrid from './components/ProductCard'
import PromotionalBannerSection from './components/OfferSection'
import { Toaster } from 'sonner'

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