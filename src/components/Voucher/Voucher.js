import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardVoucher from '../Card/CardVoucher'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import ArrowNavigation from '../ArrowNavigation/ArrowNavigation';

const Voucher = () => {
    const [voucher, setVoucher] = useState([])
    const [loading, setLoading] = useState(false)
    
    const getVoucher = async() => {
        setLoading(true)
        try{
            let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/vouchers`)
            setVoucher(response.data.data)
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
      <>
      {voucher.length > 0 ?
            <div className='flex w-full justify-center'>
                <div className='w-full px-2'>
                    <div className='flex items-center justify-between px-2'>
                        <Typography size={'xl'} label={'VOUCHER'} width={'w-28'}/>
                        <Button type={'link'} size={'small'} label={'Lihat Semua'} />
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