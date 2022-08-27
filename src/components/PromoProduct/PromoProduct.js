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
import LabelHeader from '../LabelHeader/LabelHeader';
import { useNavigate } from 'react-router-dom';

const PromoProduct = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const isDesktop = useBreakpoints()
    const navigate = useNavigate()

    useEffect(() => {
      let isApiSubscribed = true
      setLoading(true)
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/products?populate=*`).then(response => {
          if(isApiSubscribed){
            setProducts(response.data.data)
            setLoading(false)
          }
        }).catch(err => {
          if(isApiSubscribed){
            console.log(err.message)
            setLoading(false)
          }
        })
        return () => {
          isApiSubscribed = false
        }
      },[])
    
  return (
    <div className='flex w-full justify-center'>
        <div className='w-full px-2'>
            <LabelHeader label={'PROMO'} onClick={() => navigate('/products')}/>
            {loading ? 
              <p>Loading..</p>
              :
              <>
                <Swiper navigation={{
                  nextEl: '.next',
                  prevEl: '.prev'
                }} 
                modules={[Navigation]} 
                slidesPerView={isDesktop? 5 : 2}
                className='relative'
                > 
                  {/* {products.filter(el => el.attributes.categories.data.some(subEl => subEl.attributes.name === 'perlengkapan rumah')).map((val, index) => 
                    <SwiperSlide className='px-2 pb-4' key={index} >
                      <CardProduct name={val.attributes.name} price={val.attributes.price} is_discount={val.attributes.is_discount} discount={val.attributes.discount} image={val.attributes.image.data[0].attributes.formats.large.url}/>
                    </SwiperSlide>
                  )} */}
                  {products.filter(el => el.attributes.variants.data.some(subEl => subEl.attributes.is_discount_variant === true)).map((val, index) => 
                    <SwiperSlide className='px-2 pb-4' key={index}>
                      <CardProduct productId={val.id} name={val.attributes.name} variants={val.attributes.variants.data} image={val.attributes.image.data[0].attributes.formats.large.url}/>
                    </SwiperSlide>
                  )}
                  <ArrowNavigation next={'next'} prev={'prev'}/>
                </Swiper>
              </>
            }
        </div>
    </div>
  )
}

export default PromoProduct