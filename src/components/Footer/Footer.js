import React from 'react'
import Icon from '../Icon/Icon'
import tokopedia from '../../assets/icon/tokopedia.png'

const Footer = () => {
  return (
    <div className='bg-black p-2'>
        <div className='flex flex-col w-full'>
            <div className='flex flex-col divide-y'>
                <div className='flex flex-col gap-1 p-2'>
                    <p className='text-white text-lg'>FOLLOW</p>
                    <div className='flex items-center gap-2'>
                        <Icon type={'instagram'}/>
                        <Icon type={'tiktok'}/>
                    </div>
                </div>
                <div className='flex flex-col gap-1 p-2'>
                    <p className='text-white text-lg'>E-COMMERCE</p>
                    <div className='flex items-center gap-2'>
                        <Icon type={'shopee'} className={'h-8 w-8'}/>
                        <img src={tokopedia} alt='tokopedia' className='h-7 w-7'/>
                    </div>
                </div>
                <div className='flex flex-col gap-1 p-2'>
                    <p className='text-white text-lg'>INFORMASI</p>
                    <div className='flex flex-col gap-2 text-white font-bold'>
                        <p>Cara Memesan</p>
                        <p>Hubungi Kami</p>
                        <p>FAQ</p>
                        <p>Kebijakan Privasi</p>
                    </div>
                </div>
            </div>
            <div className='w-full p-2'>
                <p className='text-white text-center text-xs'>Copyright &copy; SIGGI. All Right Reserved</p>
            </div>
        </div>
    </div>
  )
}

export default Footer