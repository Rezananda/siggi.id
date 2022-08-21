import React from 'react'
import { useNavigate } from 'react-router-dom'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'

const CardProduct = ({productId, name, variants, image}) => {
  const navigate = useNavigate()
  const getCurrency = useGetCurrency()

  return (
    <div className='flex flex-col md:w-48 w-full bg-white shadow-lg rounded-lg h-fit overflow-hidden' onClick={() => navigate(`/product/${productId}`)}>
        <div className='md:w-full relative'>
          <img className='object-contain' src={'http://localhost:1337/'.includes(process.env.REACT_APP_BASE_URL) ?`${process.env.REACT_APP_BASE_URL}${image}` : `${image}`} alt='piring1'/>
          <div className={`${variants.find(x => x.attributes.available === true) ? `text-yellow-500 bg-yellow-50` : `text-red-500 bg-red-50`} absolute top-0 overflow-hidden px-2 font-bold rounded-br-lg`}>{variants.find(x => x.attributes.available === true) ? 'TERSEDIA' : 'HABIS'}</div>
        </div>

        {variants.find(x => x.attributes.is_discount_variant === true) ? 
          <div className='px-2 py-1 mb-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-center text-sm w-full truncate text-gray-600'>{name}</p>
              <p className='font-bold text-center'>{getCurrency(Math.min(...variants.map(val => parseInt(val.attributes.variant_price) - (parseInt(val.attributes.variant_price) * val.attributes.variant_discount / 100 ))))}</p>
              <div className='flex items-center justify-center gap-2'>
                <span className='bg-red-100 text-sm text-red-500 font-bold px-1 rounded'>{Math.min(...variants.map(val => val.attributes.variant_discount))}%</span>
                <p className='text-xs text-gray-400 line-through'>{getCurrency(Math.min(...variants.map(val => val.attributes.variant_price)))}</p>
              </div>
            </div>
          </div>
          :
          <div className='flex flex-col p-2'>
            <p className='text-center text-sm w-full truncate text-gray-600'>{name}</p>
            <p className='font-bold text-center'>{getCurrency(Math.min(...variants.map(val => val.attributes.variant_price)))}</p>
          </div>
        }
    </div>
  )
}

export default CardProduct