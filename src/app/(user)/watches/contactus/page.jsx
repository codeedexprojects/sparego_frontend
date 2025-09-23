import Header from '@/components/user/watches/Header'
import React from 'react'
import ContactForm from './components/ContactForm'
import ContactInfo from './components/ContactInfo'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
      <Header></Header>
      <ContactForm></ContactForm>
      <ContactInfo></ContactInfo>
      <Footer></Footer>
      
    </div>
  )
}

export default page
