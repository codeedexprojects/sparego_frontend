import Header from '@/components/user/homeappliance/Header'
import React from 'react'
import ContactFormSection from './components/ContactForm'
import ContactInfoSection from './components/ContactInfo'
import Footer from '@/components/landing/Footer'

function Page() {
  return (
    <div>
      <Header></Header>
      <ContactFormSection></ContactFormSection>
      <ContactInfoSection></ContactInfoSection>
      <Footer></Footer>
    </div>
  )
}

export default Page
