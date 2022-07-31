import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardProduct from '../Card/CardProduct'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';

const NewProduct = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    try{
      let response = await axios.get('http://localhost:1337/api/products?populate=*')
      setProducts(response.data.data)
      setLoading(false)
    }catch(e){
      console.log(e)
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getData()
  },[])

  return (
    <div className='flex w-full justify-center'>
        <div className='px-2 w-full'>
            <div className='flex items-center justify-between px-2'>
                <p className='text-xl font-bold'>-Terbaru-</p>
                <button className='text-blue-500 underline text-xs'>Lihat Semua</button>
            </div>
              {loading ? 
              <p>Loading..</p>
              :
              <Swiper navigation={{
                nextEl: '.next',
                prevEl: '.prev'
              }} 
              modules={[Navigation]} 
              slidesPerView={2}
              className='relative'
              > 
                  {products.map((val, index) => 
                   <SwiperSlide className='px-2 pb-4' key={index}>
                       <CardProduct key={index} name={val.attributes.name} price={val.attributes.price} is_discount={val.attributes.is_discount} discount={val.attributes.discount} image={val.attributes.image.data[0].attributes.formats.large.url}/>
                   </SwiperSlide>
                  )}
              <ArrowNavigation next={'next'} prev={'prev'}/>
              </Swiper>
              }
        </div>
    </div>
  )
}

export default NewProduct