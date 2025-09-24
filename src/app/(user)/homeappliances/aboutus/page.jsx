import Header from '@/components/user/homeappliance/Header'
import React from 'react'
import Section1 from './components/Section1'
import WhatWeOffer from './components/Section2'
import Footer from '@/components/landing/Footer'

function Page() {
  return (
    <div>
      <Header></Header>
      <Section1></Section1>
      <WhatWeOffer></WhatWeOffer>
      <Footer></Footer>
    </div>
  )
}

export default Page
