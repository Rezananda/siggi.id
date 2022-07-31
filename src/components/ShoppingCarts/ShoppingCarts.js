import React from 'react'
import Icon from '../Icon/Icon'

const ShoppingCarts = () => {
  return (
    <div className='relative'>
        <div className='flex justify-end'>
            <span className='flex items-center absolute justify-center bg-red-500 h-3 w-3 rounded-full text-xs text-white font-bold p-2'>1</span>
        </div>
        <Icon type={'shopping-bag-solid'} className={'h-8 w-8 text-yellow-500'}/>
    </div>
  )
}

export default ShoppingCarts