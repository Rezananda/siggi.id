import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon/Icon'
import ShoppingCarts from '../ShoppingCarts/ShoppingCarts'

const TopNavbar = ({label,withCart,route}) => {
    const navigate = useNavigate()
  return (
    <div className='py-5 bg-siggi-soft flex justify-center sticky top-0 z-50 w-full'>
        <div className='flex items-center justify-between w-11/12'>
            <div className='flex items-center gap-1'>
                <button onClick={() => navigate(route)}>
                    <Icon type={'arrow-back'} className={'h-7 w-7 text-siggi-hard'}/>
                </button>
                <p className='text-siggi-hard text-xl font-bold'>{label}</p>
            </div>
            {withCart ?             
                <div className='flex items-center'>
                    <ShoppingCarts/>
                </div>
                :
                ''
            }
        </div>
    </div>
  )
}

export default TopNavbar