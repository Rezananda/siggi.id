import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import ShoppingCarts from '../ShoppingCarts/ShoppingCarts'
import SlidingNavbar from './SlidingNavbar'

const Navbar = () => {
    const [slideNavbar, setSlideNavbar] = useState(false)
    const navigate = useNavigate()
  return (
    <div className='py-5 bg-white flex justify-center sticky top-0 z-50 w-full'>
        <div className='flex items-center justify-between w-11/12'>
            <div className='flex items-center md:gap-2'>
                <button onClick={() => setSlideNavbar(true)} className='bg-yellow-50 border border-yellow-500 rounded'>
                    <Icon type={'menu'} className={'h-8 w-8 text-yellow-500'}/>
                </button>
            </div>
            <div className='flex items-center md:gap-2'>
                <button className='text-2xl font-bold text-yellow-500' onClick={() => navigate('/')}>
                    SIGGI
                </button>
            </div>
            <div className='flex items-center md:gap-4 gap-2'>
                <ShoppingCarts/>
                <div className='md:flex hidden'>
                    <Button type={'fill'} size={'large'} label={'LOGIN'}/>
                </div>
            </div>
        </div>
        <SlidingNavbar slideNavbar={slideNavbar} setSlideNavbar={setSlideNavbar}/>
    </div>
  )
}

export default Navbar