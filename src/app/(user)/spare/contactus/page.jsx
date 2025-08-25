import Header from '@/components/user/spare/Header'
import React from 'react'
import ContactFormSection from './components/ConatctForm'
import Footer from '@/components/landing/Footer'
import ContactInfoSection from './components/ContactInfo'

function page() {
  return (
    <div>
        <Header></Header>
        <ContactFormSection></ContactFormSection>
        <ContactInfoSection></ContactInfoSection>
        <Footer></Footer>
    </div>
  )
}

export default page