import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Pagination } from "swiper";
import piring1 from '../../assets/img/piring1.jpg'
import piring2 from '../../assets/img/piring2.jpg'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HeroImage = () => {
  return (
    <div>
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
        className="flex h-[20vh] md:h-[80vh] w-full">
            <SwiperSlide className='px-4 py-2'>
                <img className='object-cover w-full h-full rounded-lg' src={piring1} alt='piring1'/>
            </SwiperSlide>
            <SwiperSlide className='px-4 py-2'>
                <img className='object-cover w-full h-full rounded-lg' src={piring2} alt='piring1'/>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default HeroImage