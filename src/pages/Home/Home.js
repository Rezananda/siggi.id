import React from 'react'
import Category from '../../components/Category/Category'
import Footer from '../../components/Footer/Footer'
import HeroImage from '../../components/HeroImage/HeroImage'
import Navbar from '../../components/Navbar/Navbar'
import NewProduct from '../../components/NewProduct/NewProduct'
import PromoProduct from '../../components/PromoProduct/PromoProduct'
import Search from '../../components/Search/Search'
import Voucher from '../../components/Voucher/Voucher'

const Home = () => {  
  return (
    <div className='bg-gray-50'>
      <Navbar/>
      <HeroImage type={'home'}/>
      <Search/>
      <Voucher/>
      <PromoProduct/>
      <NewProduct/>
      <Category/>
      <Footer/>
    </div>
  )
}

export default Home