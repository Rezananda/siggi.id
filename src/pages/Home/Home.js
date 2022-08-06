import React, { useEffect, useState } from 'react'
import Category from '../../components/Category/Category'
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
    </div>
  )
}

export default Home