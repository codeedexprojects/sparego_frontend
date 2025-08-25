import React from 'react'
import MyCart from './components/CartPage'
import Header from '@/components/user/spare/Header'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
        <Header></Header>
        <MyCart></MyCart>
        <Footer></Footer>
    </div>
  )
}

export default page