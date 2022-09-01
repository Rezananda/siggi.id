import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardProduct from '../Card/CardProduct'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';
import LabelHeader from '../LabelHeader/LabelHeader';
import { useNavigate } from 'react-router-dom';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';

const NewProduct = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getData = async () => {
    setLoading(true)
    try{
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products?pagination[pageSize]=5&populate=*`)
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
          <LabelHeader label={'TERBARU'} onClick={() => navigate('/products', {state: {name: 'SEMUA PRODUK', id: 'allProduct', selected: 1}})}/>
              {loading ? 
              <div className='p-2'>
                <SpinnerLoading/>
              </div>
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