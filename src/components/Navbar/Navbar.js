import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon/Icon'
import ShoppingCarts from '../ShoppingCarts/ShoppingCarts'
import SlidingNavbar from './SlidingNavbar'
import Siggi from '../../assets/icon/siggi 2.png'

const Navbar = () => {
    const [slideNavbar, setSlideNavbar] = useState(false)
    const navigate = useNavigate()
  return (
    <div className='py-2 bg-siggi-soft flex justify-center sticky top-0 z-50 w-full'>
        <div className='flex items-center justify-between w-11/12'>
            <div className='flex items-center md:gap-2'>
                <button onClick={() => setSlideNavbar(true)} className='bg-orange-100 border border-siggi-hard rounded'>
                    <Icon type={'menu'} className={'h-8 w-8 text-siggi-hard'}/>
                </button>
            </div>
            <div className='flex items-center md:gap-2'>
                <button className='flex items-center' onClick={() => navigate('/')}>
                    <img className='h-16 w-16' src={Siggi} alt='siggi'/>
                </button>
            </div>
            <div className='flex items-center md:gap-4 gap-2'>
                <ShoppingCarts/>
            </div>
        </div>
        <SlidingNavbar slideNavbar={slideNavbar} setSlideNavbar={setSlideNavbar}/>
    </div>
  )
}

export default Navbar