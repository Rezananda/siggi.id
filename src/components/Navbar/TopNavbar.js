import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import ShoppingCarts from '../ShoppingCarts/ShoppingCarts'

const TopNavbar = ({label,withCart}) => {
    const navigate = useNavigate()
  return (
    <div className='py-5 bg-white drop-shadow-xl flex justify-center sticky top-0 z-50 w-full'>
        <div className='flex items-center justify-between w-11/12'>
            <div className='flex items-center gap-1'>
                <button onClick={() => navigate('/')}>
                    <Icon type={'arrow-back'} className={'h-7 w-7 text-yellow-500'}/>
                </button>
                <p className='text-yellow-500 text-xl font-bold'>{label}</p>
            </div>
            {withCart ?             
                <div className='flex items-center md:gap-4 gap-2'>
                    <ShoppingCarts/>
                    <div className='md:flex hidden'>
                        <Button type={'fill'} size={'large'} label={'LOGIN'}/>
                    </div>
                </div>
                :
                ''
            }
        </div>
    </div>
  )
}

export default TopNavbar