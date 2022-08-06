import React from 'react'
import piring1 from '../../assets/img/piringkorea1.jpeg'
import piring2 from '../../assets/img/piringkorea2.jpeg'
import pirings1 from '../../assets/img/piring1.jpg'
import pirings2 from '../../assets/img/piring2.jpg'
import Typography from '../Typography/Typography'

const Category = () => {
  return (
    <div className='bg-yellow-50 py-4'>
        <div className='flex items-center justify-between px-4'>
            <Typography size={'xl'} label={'KATEGORI'} width={'w-28'}/>
        </div>
        <div className='flex flex-wrap gap-2 px-4'>
            <div className='max-w-md mx-auto bg-white rounded shadow-md overflow-hidden w-full'>
                <div className='flex'>
                    <div className='shrink-0 w-1/3'>
                        <img src={piring1} alt='piring1' className='h-24 w-full object-cover'/>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <p className='text-lg font-bold'>PERLENGKAPAN RUMAH</p>
                    </div>
                </div>
            </div>
            <div className='max-w-md mx-auto bg-white rounded shadow-md overflow-hidden w-full'>
                <div className='flex'>
                    <div className='shrink-0 w-1/3'>
                        <img src={piring2} alt='piring1' className='h-24 w-full object-cover'/>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <p className='text-lg font-bold'>PERLENGKAPAN DAPUR</p>
                    </div>
                </div>
            </div>
            <div className='max-w-md mx-auto bg-white rounded shadow-md overflow-hidden w-full'>
                <div className='flex'>
                    <div className='shrink-0 w-1/3'>
                        <img src={pirings1} alt='piring1' className='h-24 w-full object-cover'/>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <p className='text-lg font-bold'>KARTU UCAPAN</p>
                    </div>
                </div>
            </div>
            <div className='max-w-md mx-auto bg-white rounded shadow-md overflow-hidden w-full'>
                <div className='flex'>
                    <div className='shrink-0 w-1/3'>
                        <img src={pirings2} alt='piring1' className='h-24 w-full object-cover'/>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <p className='text-lg font-bold'>GELAS</p>
                    </div>
                </div>
            </div>
            <div className='max-w-md mx-auto bg-white rounded shadow-md overflow-hidden w-full'>
                <div className='flex'>
                    <div className='shrink-0 w-1/3'>
                        <img src={piring1} alt='piring1' className='h-24 w-full object-cover'/>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <p className='text-lg font-bold'>SENDOK, GARPU, PISAU MAKAN</p>
                    </div>
                </div>
            </div>
            <div className='max-w-md mx-auto bg-white rounded shadow-md overflow-hidden w-full'>
                <div className='flex'>
                    <div className='shrink-0 w-1/3'>
                        <img src={piring1} alt='piring1' className='h-24 w-full object-cover'/>
                    </div>
                    <div className='flex justify-center items-center text-center w-full'>
                        <p className='text-lg font-bold'>PIRING & MANGKOK</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category