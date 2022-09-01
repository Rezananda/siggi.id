import React from 'react'
import { useNavigate } from 'react-router-dom'

const CardVoucher = ({val, id}) => {
  const navigate = useNavigate()
  
  return (
    <div className='flex flex-col w-full shadow justify-center text-center rounded-lg bg-white overflow-hidden' onClick={() => navigate(`/voucher/${id}`)}>
        <div className='p-2 w-full h-full bg-siggi-hard truncate'>
            <p className='font-bold text-white truncate text-lg'>{val.name}</p>
        </div>
        <div className='border-b border-dashed border-siggi-hard'></div>
        <div className='p-2'>
            <div className='flex w-full text-sm gap-1 justify-center truncate'>
                <p>Sampai</p> <p>{new Date(val.end_date).toLocaleDateString('en-GB')}</p>
            </div>
        </div>
    </div>
  )
}

export default CardVoucher