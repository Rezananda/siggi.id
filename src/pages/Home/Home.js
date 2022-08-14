import axios from 'axios'
import React, { useEffect } from 'react'
import Category from '../../components/Category/Category'
import HeroImage from '../../components/HeroImage/HeroImage'
import Navbar from '../../components/Navbar/Navbar'
import NewProduct from '../../components/NewProduct/NewProduct'
import PromoProduct from '../../components/PromoProduct/PromoProduct'
import Search from '../../components/Search/Search'
import Voucher from '../../components/Voucher/Voucher'

const Home = () => {
  // useEffect(() => {
  //   let isUnmounted = true
  //   axios.get('https://peaceful-cliffs-34583.herokuapp.com/provinces', {headers: {
  //     key: '3accf139e8ea29802dfd71c41a153eb2'
  //   }}).then(res => {
  //     if(isUnmounted){
  //       console.log(res.data.rajaongkir.results)
  //     }
  //   }).catch(err => {
  //     if(isUnmounted){
  //       console.log(err.message)
  //     }
  //   })
  
  //   return () => {
  //     isUnmounted = false
  //   }
  // }, [])
  
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