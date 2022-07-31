import React from 'react'

const CardVoucher = ({name, description, startDate, endDate}) => {

  return (
    <div className='flex flex-col w-full shadow-lg justify-center text-center rounded-lg bg-yellow-50 border border-yellow-500'>
        <div className='p-1'>
            <p className='font-bold text-gray-500'>{name}</p>
        </div>
        <div className='border-b border-dashed border-yellow-500'></div>
        <div className='p-1'>
            <p className='text-xs w-full text-gray-500 truncate'>{description}</p>
            <div className='flex w-full text-xs text-gray-500 gap-1 justify-center truncate'>
                <p>{new Date(startDate).toLocaleDateString('en-GB')}</p> - <p>{new Date(endDate).toLocaleDateString('en-GB')}</p>
            </div>
        </div>
    </div>
  )
}

export default CardVoucher