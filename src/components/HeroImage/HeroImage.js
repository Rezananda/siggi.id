import React from 'react'
import { Swiper, SwiperSlide, } from "swiper/react";
import {Autoplay, Pagination, Navigation } from "swiper";
import piring1 from '../../assets/img/piring1.jpg'
import piring2 from '../../assets/img/piring2.jpg'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';

const HeroImage = ({type, productDetail}) => {
  return (
    <div>
      {type === 'home' ?       
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
        className="flex h-[20vh] md:h-[50vh] w-full">
            <SwiperSlide className='px-4 py-2'>
                <img className='object-cover w-full h-full rounded-lg' src={piring1} alt='piring1'/>
            </SwiperSlide>
            <SwiperSlide className='px-4 py-2'>
                <img className='object-cover w-full h-full rounded-lg' src={piring2} alt='piring1'/>
            </SwiperSlide>
        </Swiper>
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