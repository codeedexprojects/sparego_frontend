"use client"
import Header from '@/components/user/watches/Header'
import React, { Suspense } from 'react'
import ProductCard from './components/ProductCard'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
      <Header></Header>
      <Suspense fallback={<div className="p-6 text-center">Loading search...</div>}> 
      <ProductCard></ProductCard>
      </Suspense>
     
      <Footer></Footer>
    </div>
  )
}

export default page
