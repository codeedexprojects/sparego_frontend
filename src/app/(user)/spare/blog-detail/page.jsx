import Header from '@/components/user/spare/Header'
import React from 'react'
import BlogDetail from './components/Section1'
import Footer from '@/components/landing/Footer'
import Section2 from './components/Section2'
import Section3 from './components/Section3'

function page() {
  return (
    <div>
        <Header></Header>
        <BlogDetail></BlogDetail>
        <Section2></Section2>
        <Section3></Section3>
        <Footer></Footer>
    </div>
  )
}

export default page