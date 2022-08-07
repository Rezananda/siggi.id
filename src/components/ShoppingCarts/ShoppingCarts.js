import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cart } from '../../context/CartContext'
import Icon from '../Icon/Icon'

const ShoppingCarts = () => {
  const {cart, } = useContext(Cart)
  const navigate = useNavigate()
  
  return (
    <button className='relative' onClick={() => navigate('/carts')}>
        <div className='flex justify-end'>
            <span className='flex items-center absolute justify-center bg-red-500 h-5 w-5 rounded-full text-xs text-white font-bold p-2'>{cart.reduce((acc, val) => acc + val.qty, 0)}</span>
        </div>
        <Icon type={'shopping-bag-solid'} className={'h-9 w-9 text-yellow-500'}/>
    </button>
  )
}

export default ShoppingCarts