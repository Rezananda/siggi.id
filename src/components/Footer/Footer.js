import React from 'react'
import Icon from '../Icon/Icon'

const Footer = () => {
  return (
    <div className='bg-black p-2'>
        <div className='flex flex-col w-full'>
            <div className='flex flex-col divide-y'>
                <div className='flex flex-col gap-1 p-2'>
                    <p className='text-white text-lg'>SIGGI</p>
                </div>
                <div className='flex flex-col gap-1 p-2'>
                    <p className='text-white text-lg'>FOLLOW KAMI</p>
                    <div className='flex items-center gap-2'>
                        <Icon type={'instagram'}/>
                        <Icon type={'tiktok'}/>
                        <Icon type={'whatsapp'}/>
                    </div>
                </div>
                <div className='flex flex-col gap-1 p-2'>
                    <p className='text-white text-lg'>INFORMASI</p>
                    <div className='flex flex-col gap-2 text-white font-bold'>
                        <p>Hubungi Kami</p>
                        <p>FAQ</p>
                        <p>Kebijakan Privasi</p>
                        <p>Syarat & Ketentuan</p>
                    </div>
                </div>
            </div>
            <div className='w-full p-2'>
                <p className='text-white text-center'>Copyright &copy; SIGGI. All Right Reserved</p>
            </div>
        </div>
    </div>
  )
}

export default Footer