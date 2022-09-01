import React from 'react'
import Category from '../../components/Category/Category'
import FloatingButton from '../../components/FloatingButton/FloatingButton'
import Footer from '../../components/Footer/Footer'
import HeroImage from '../../components/HeroImage/HeroImage'
import Navbar from '../../components/Navbar/Navbar'
import NewProduct from '../../components/NewProduct/NewProduct'
import Review from '../../components/Review/Review'
import Search from '../../components/Search/Search'
import Voucher from '../../components/Voucher/Voucher'

const Home = () => {  
  return (
    <div className='bg-gray-50 relative'>
      <Navbar/>
      <HeroImage type={'home'}/>
      <Search/>
      <Voucher/>
      <NewProduct/>
      <Category/>
      <Review/>
      <Footer/>
      <FloatingButton/>
    </div>
  )
}

export default Home