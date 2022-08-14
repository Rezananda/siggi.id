import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardProduct from '../Card/CardProduct'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';
import useBreakpoints from '../../hooks/useBreakpoints/useBreakpoints';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';

const NewProduct = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const isDesktop = useBreakpoints()

  const getData = async () => {
    setLoading(true)
    try{
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products?populate=*`)
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
              <Typography size={'xl'} label={'TERBARU'} width={'w-24'}/>
              <Button type={'link'} size={'small'} label={'Lihat Semua'} />
            </div>
              {loading ? 
              <p>Loading..</p>
              :
              <Swiper navigation={{
                nextEl: '.next',
                prevEl: '.prev'
              }} 
              modules={[Navigation]} 
              slidesPerView={isDesktop ? 6 : 2}
              className='relative'
              > 
                  {products.map((val, index) => 
                   <SwiperSlide className='px-2 pb-4' key={index}>
                      <CardProduct productId={val.id} name={val.attributes.name} variants={val.attributes.variants.data} image={val.attributes.image.data[0].attributes.formats.large.url}/>
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