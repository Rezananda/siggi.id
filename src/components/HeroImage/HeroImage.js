import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide, } from "swiper/react";
import {Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';
import axios from 'axios';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';

const HeroImage = ({type, productDetail}) => {
  const [heroimage, setHeroimage] = useState([])
  const [loading, setLoadinng] = useState(false)

  useEffect(() => {
    setLoadinng(true)
    let isMounted = true
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/advertisements?populate=*`).then(response => {
      if(isMounted){
        setHeroimage(response.data.data)
        setLoadinng(false)
      }
    }).catch(err => {
      console.log(err)
      setLoadinng(false)
    })

    return () => {
      isMounted= false
    }
  }, [])
  
  return (
    <div>
      {type === 'home' ?
      <>
          {loading ?
          <div className='p-4'>
            <SpinnerLoading/>
          </div>
          :          
          <Swiper 
          centeredSlides={true}
          pagination={{
              clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {heroimage.map((val, index) => (
              <SwiperSlide key={index}>
                  <img className='object-cover' src={'http://localhost:1337/'.includes(process.env.REACT_APP_BASE_URL) ?`${process.env.REACT_APP_BASE_URL}${val.attributes.heroimage.data.attributes.url}` : `${val.attributes.heroimage.data.attributes.url}`} alt={val.attributes.heroimage.data.attributes.name}/>
              </SwiperSlide>
            ))}
          </Swiper>
          }
      </>       
        :
        type === 'productDetail' ?
          <Swiper navigation={{
            nextEl: '.next',
            prevEl: '.prev'
              }} 
              modules={[Navigation]} 
              className='relative'
              > 
                  {productDetail.attributes.image.data.map((val, index) => 
                  <SwiperSlide key={index}>
                      <img className='rounded' src={'http://localhost:1337/'.includes(process.env.REACT_APP_BASE_URL) ?`${process.env.REACT_APP_BASE_URL}${val.attributes.url}` : `${val.attributes.url}`} alt={val.attributes.caption}/>
                  </SwiperSlide>
                  )}
              <ArrowNavigation next={'next'} prev={'prev'}/>
          </Swiper>
          :
          ''
      }
    </div>
  )
}

export default HeroImage