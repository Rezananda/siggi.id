import React from 'react'

const CardVoucher = ({name, description, startDate, endDate}) => {

  return (
    <div className='flex flex-col w-full drop-shadow justify-center text-center rounded bg-yellow-50 border border-yellow-500'>
        <div className='p-1'>
            <p className='font-bold '>{name}</p>
        </div>
        <div className='border-b border-dashed border-yellow-500'></div>
        <div className='p-1'>
            <p className='text-xs w-full truncate'>{description}</p>
            <div className='flex w-full text-xs gap-1 justify-center truncate'>
                <p>Sampai</p> - <p>{new Date(endDate).toLocaleDateString('en-GB')}</p>
            </div>
        </div>
    </div>
  )
}

export default CardVoucher