import React, { useState } from 'react'
import Icon from '../../../components/Icon/Icon'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'
import useGetCurrency from '../../../hooks/useGetCurrency/useGetCurrency'

const Confirmation = ({loadingAddOrder, address, voucher}) => {
    const getCurrency = useGetCurrency()
    const [expand, setExpand] = useState({
        confirmation: true
    })
  return (
    <div>
        <button className={`flex items-center justify-between w-full px-4 py-2 ${expand.confirmation ? 'rounded-t-md' : 'rounded-md' } bg-white shadow-md`} onClick={() => setExpand({...expand, confirmation: !expand.confirmation})}>
          <p className='font-bold text-lg'>KONFIRMASI PESANAN</p>
          {
            expand.confirmation?
            <Icon type={`chevron-up`} className={`h-7 w-7 text-gray-500`}/>
            :
            <Icon type={`chevron-down`} className={`h-7 w-7 text-gray-500`}/>

          }
        </button>

        {expand.confirmation ? 
        <div className='bg-white p-4 shadow-md rounded-b-md border-t border-gray-100 mb-48'>
            {loadingAddOrder&&
                <div>
                    <SpinnerLoading/>
                </div>}
            <ul className='flex flex-col divide-y'>
                <li className='flex flex-col p-1'>
                    <p className='font-bold'>Detail Transaksi</p>
                    <div className='flex flex-col divide-y'>
                    {address.order.map((val, index) =>
                        <div className='flex w-full items-center p-1 gap-2' key={index}>
                        <div className='w-2/12 overflow-hidden rounded'>
                            <img src={'http://localhost:1337/'.includes(process.env.REACT_APP_BASE_URL) ?`${process.env.REACT_APP_BASE_URL}${val.image}` : `${val.image}`} alt={val.variant_name}></img>
                        </div>
                        <div className='w-8/12 truncate'>
                            <p className='truncate'>{val.name}</p>
                            <div className='text-sm bg-siggi-soft text-bg-siggi-hard border border-siggi-hard rounded w-fit px-1'>{val.variant_name}</div>
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
                <li className='flex flex-col p-1'>
                    <p className='font-bold'>Nama</p>
                    <p className='text-lg'>{address.name}</p>
                </li>
                <li className='flex flex-col p-1'>
                    <p className='font-bold'>Email</p>
                    <p className='text-lg'>{address.email}</p>
                </li>
                <li className='flex flex-col p-1'>
                    <p className='font-bold'>Nomor Handphone</p>
                    <p className='text-lg'>{address.phoneNumber}</p>
                </li>
                <li className='flex flex-col p-1'>
                    <p className='font-bold'>Alamat</p>
                    <p className='text-lg'>{`${address.fullAddress}, ${address.village_name}, ${address.district_name}, ${address.city_name}, ${address.province}, ${address.postCode}`}</p>
                </li>
                {voucher.length === 1&&            
                <li className='flex flex-col p-1'>
                    <p className='font-bold'>Voucher</p>
                    <div className='bg-siggi-soft border border-siggi-hard text-siggi-hard px-4 py-2 rounded-lg text-lg'>
                        {voucher[0].attributes.name}
                    </div>
                </li>
                }
            </ul>
        </div>
        :
        ''
        }
    </div>
  )
}

export default Confirmation