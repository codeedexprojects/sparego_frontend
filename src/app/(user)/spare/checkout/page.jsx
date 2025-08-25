import React from 'react'
import CheckoutPage from './components/CheckoutPage'
import Header from '@/components/user/spare/Header'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
        <Header></Header>
        <CheckoutPage></CheckoutPage>
        <Footer></Footer>
    </div>
  )
}

export default page