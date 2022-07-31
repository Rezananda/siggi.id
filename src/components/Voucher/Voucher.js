import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardVoucher from '../Card/CardVoucher'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';

const Voucher = () => {
    const [voucher, setVoucher] = useState([])
    const [loading, setLoading] = useState(false)

    console.log(voucher)

    const getVoucher = async() => {
        setLoading(true)
        try{
            let response = await axios.get('http://localhost:1337/api/vouchers')
            setVoucher(response.data.data)
            console.log(response.data)
            setLoading(false)
        }catch(e){
            console.log(e)
            setLoading(false)
        }
    }

    useEffect(()=> {
        getVoucher()
    }, [])
  return (
    <div className='flex w-full justify-center'>
        <div className='w-full px-2'>
            <div className='flex items-center justify-between px-2'>
                <p className='text-xl font-bold'>-Voucher-</p>
                <button className='text-blue-500 underline text-xs'>Lihat Semua</button>
            </div>
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
                            <CardVoucher key={index} name={val.attributes.name} description={val.attributes.description} startDate={val.attributes.start_date} endDate={val.attributes.end_date}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
            }
        </div>
    </div>
  )
}

export default Voucher