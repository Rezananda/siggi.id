import React from 'react'
import useGetCurrency from '../../../hooks/useGetCurrency/useGetCurrency'

const Confirmation = ({address, setStep}) => {
    const getCurrency = useGetCurrency()
  return (
    <div className='bg-white rounded p-2 drop-shadow-md'>
        <p className='font-bold text-lg mb-2'>KONFIRMASI PESANAN</p>
        <ul className='flex flex-col divide-y'>
            <li className='flex flex-col p-1'>
                <p className='font-bold'>Nama</p>
                <p className='text-lg'>{address.name}</p>
            </li>
            <li className='flex flex-col p-1'>
                <p className='font-bold'>Nomor Handphone</p>
                <p className='text-lg'>{address.phoneNumber}</p>
            </li>
            <li className='flex flex-col p-1'>
                <p className='font-bold'>Provinsi</p>
                <p className='text-lg'>{address.province}</p>
            </li>
            <li className='flex flex-col p-1'>
                <p className='font-bold'>Kota/Kabupaten</p>
                <p className='text-lg'>{address.city_name}</p>
            </li>
            <li className='flex flex-col p-1'>
                <p className='font-bold'>Alamat Lengkap</p>
                <p className='text-lg'>{address.fullAddress}</p>
            </li>
            <li className='flex flex-col p-1'>
                <p className='font-bold'>Detail Pesanan</p>
                <div className='flex flex-col divide-y'>
                {address.order.map((val, index) =>
                    <div className='flex w-full items-center p-1 gap-2' key={index}>
                    <div className='w-2/12 overflow-hidden rounded'>
                        <img src={`${process.env.REACT_APP_BASE_URL}${val.image}`} alt={val.variant_name}></img>
                    </div>
                    <div className='w-8/12 truncate'>
                        <p className='truncate'>{val.name}</p>
                        <div className='text-sm bg-yellow-100 text-yellow-500 border border-yellow-500 rounded w-fit px-1'>{val.variant_name}</div>
                        {val.is_discount_variant ?
                            <div className='flex flex-col'>
                                <p className='font-bold text-sm text-red-500'>{getCurrency(val.variant_price_final)}</p>
                                <p className='text-gray-400 text-xs line-through'>{getCurrency(val.variant_price)}</p>
                            </div>
                            :
                            <div className='flex items-center gap-2'>
                                <p className='font-bold text-center text-sm'>{getCurrency(val.variant_price)}</p>
                            </div>
                            }
                    </div>
                    <div className='w-2/12 flex items-center justify-center'>
                        <p>x{val.qty}</p>
                    </div>
                    </div>
                )}
                </div>
            </li>
        </ul>
    </div>
  )
}

export default Confirmation