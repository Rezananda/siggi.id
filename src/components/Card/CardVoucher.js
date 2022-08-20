import React from 'react'
import { useNavigate } from 'react-router-dom'

const CardVoucher = ({val, id}) => {
  const navigate = useNavigate()
  
  return (
    <div className='flex flex-col w-full drop-shadow-md justify-center text-center rounded-lg bg-white overflow-hidden' onClick={() => navigate(`/voucher/${id}`)}>
        <div className='p-2 w-full h-full bg-yellow-500 truncate'>
            <p className='font-bold text-white truncate text-lg'>{val.name}</p>
        </div>
        <div className='border-b border-dashed border-yellow-500'></div>
        <div className='p-2'>
            <div className='flex w-full text-sm gap-1 justify-center truncate'>
                <p>Sampai</p> <p>{new Date(val.end_date).toLocaleDateString('en-GB')}</p>
            </div>
        </div>
    </div>
  )
}

export default CardVoucher