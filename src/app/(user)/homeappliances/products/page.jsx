import Header from '@/components/user/homeappliance/Header'
import React from 'react'
import AutomotiveProductsGrid from './components/ProductCard'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
      <Header></Header>
      <AutomotiveProductsGrid></AutomotiveProductsGrid>
      <Footer></Footer>
    </div>
  )
}

export default page
