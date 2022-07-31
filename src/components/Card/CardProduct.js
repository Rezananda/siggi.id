import React from 'react'

const CardProduct = ({name, price, is_discount, discount, image}) => {
  const getCurrency = (val) => {
    const result = parseInt(val).toLocaleString('id', { style: 'currency', currency: 'IDR' })
    return result
  }

  return (
    <div className='flex flex-col md:w-48 w-full bg-white shadow-lg rounded-lg h-fit'>
        <div className='md:w-full'>
          <img className='object-contain rounded-t-lg' src={`http://localhost:1337${image}`} alt='piring1'/>
        </div>
        {is_discount ?         
          <div className='px-2 py-1 mb-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-center text-sm w-full truncate text-gray-600'>{name}</p>
              <p className='font-bold text-center'>{getCurrency(parseInt(price) - (parseInt(price) * (parseInt(discount) / 100)))}</p>
              <div className='flex items-center justify-center gap-2'>
                <span className='bg-red-100 text-sm text-red-500 font-bold px-1 rounded'>{discount}%</span>
                <p className='text-xs text-gray-400 line-through'>{getCurrency(price)}</p>
              </div>
            </div>
          </div>
          :
          <div className='flex flex-col p-2'>
            <p className='text-center text-sm w-full truncate text-gray-600'>{name}</p>
            <p className='font-bold text-center'>{getCurrency(price)}</p>
          </div>
        }
    </div>
  )
}

export default CardProduct