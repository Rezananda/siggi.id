import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardVoucher from '../Card/CardVoucher'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';
import LabelHeader from '../LabelHeader/LabelHeader';

const Voucher = () => {
    const [voucher, setVoucher] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        setLoading(true)
        let isMounted = true
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/vouchers`).then(response => {
            if(isMounted){
                setVoucher(response.data.data)
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [])
  return (
      <>
      {voucher.length > 0 ?
            <div className='flex w-full justify-center'>
                <div className='w-full px-2'>
                    <LabelHeader label={'VOUCHER'}/>
                    {loading?
                    <p>Loading...</p>
                    :
                    <>
                        <Swiper navigation={{
                            nextEl: '.next',
                            prevEl: '.prev'
                            }} 
                            modules={[Navigation]} 
                            slidesPerView={2}
                            className='relative'
                        > 
                            {voucher.map((val, index) => (
                                <SwiperSlide className='px-2 pb-4' key={index}>
                                    <CardVoucher key={index} val={val.attributes} id={val.id}/>
                                </SwiperSlide>
                            ))}
                        <ArrowNavigation next={'next'} prev={'prev'}/>
                        </Swiper>
                    </>
                    }
                </div>
            </div>
            :
            ""
      }
      </>
  )
}

export default Voucher