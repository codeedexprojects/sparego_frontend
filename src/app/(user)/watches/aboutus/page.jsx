import Header from '@/components/user/watches/Header'
import React from 'react'
import Section1 from './components/Section1'
import WhatWeOffer from './components/Section2'
import Footer from '@/components/landing/Footer'

function page() {
  return (
    <div>
      <Header></Header>
      <Section1></Section1>
      <WhatWeOffer></WhatWeOffer>
      <Footer></Footer>
    </div>
  )
}

export default page
