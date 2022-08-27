import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TopNavbar from '../../../components/Navbar/TopNavbar'
import { JwtAuth } from '../../../context/JwtContext'
import useGetCurrency from '../../../hooks/useGetCurrency/useGetCurrency'

const DetailOrderStatus = () => {
    const { id } = useParams()
    const {jwt} = useContext(JwtAuth)
    const [order, setOrder] = useState({
      attributes: {
        address:"",
        createdAt:"",
        detail_order: [],
        name:"",
        order_status:{
          data:{
            attributes: {
              status:""
            }
          }
        },
        phone_number:"",
        price_total:"",
        transaction_id:""
      }
    })
    const [loading, setLoading] = useState(false)
    const getCurrency = useGetCurrency({})
    const status = order.attributes.order_status.data.attributes.status
    // console.log(status)

    useEffect(() => {
      setLoading(true)
      let isMounted = true
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/${id}?populate=*`, {headers: {
            Authorization :`Bearer ${jwt.jwt}`
      }}).then(response => {
          if(isMounted){
              setOrder(response.data.data)
              setLoading(false)
          }
      }).catch(err => {
          console.log(err)
          setLoading(false)
      })
    
      return () => {
        isMounted = false
      }
    }, [id, jwt.jwt])
    
    
  return (
    <div className='bg-gray-50 min-h-screen'>
        <TopNavbar label={'Detail Pesanan'} route={-1}/>
        <div className='p-4 flex flex-col gap-4'>
          <div className='bg-white rounded-lg p-4 drop-shadow-md'>
          {loading&&<p>Loading...</p>}
          <ul className='flex flex-col divide-y'>
              <li className='flex items-center p-1 justify-between'>
                <p className='text-gray-500 text-sm'>{new Date(order.attributes.createdAt).toLocaleDateString('en-GB')}, {new Date(order.attributes.createdAt).toLocaleTimeString('en-GB')}</p>
                <div className={`border ${status === 'Menunggu Pembayaran' ? 'border-red-500 bg-red-100 text-red-500': status === 'Sedang Di Proses' ? 'border-orange-500 bg-orange-100 text-orange-500' : status === 'Dikirim' ? 'border-blue-500 bg-blue-100 text-blue-500' : status === 'Selesai' ? 'border-green-500 bg-green-100 text-green-500' : ''} px-2 py-1 rounded-full text-xs`}>
                    {order.attributes.order_status.data.attributes.status}
                </div>
              </li>
              <li className='flex flex-col p-1'>
                  <p className='font-bold'>Nama</p>
                  <p className='text-lg'>{order.attributes.name}</p>
              </li>
              <li className='flex flex-col p-1'>
                  <p className='font-bold'>Nomor Handphone</p>
                  <p className='text-lg'>{order.attributes.phone_number}</p>
              </li>
              <li className='flex flex-col p-1'>
                  <p className='font-bold'>Alamat</p>
                  <p className='text-lg'>{order.attributes.address}</p>
              </li>
              <li className='flex flex-col p-1'>
                  <p className='font-bold'>Nomor Transaksi</p>
                  <div className='flex w-full'>
                    <div className='w-10/12'>
                      <p className='text-lg'>{order.attributes.transaction_id}</p>
                    </div>
                    <div className='w-2/12'>
                      <button className='w-full bg-yellow-500 text-white rounded'>
                        Salin
                      </button>
                    </div>
                  </div>
              </li>
              <li className='flex flex-col p-1'>
                  <p className='font-bold'>Rincian Pembayaran</p>
                  <div className='flex flex-col'>
                    <div className='flex flex-col'>
                    {order.attributes.detail_order.map((val, index) =>
                        <div className='flex w-full items-center p-1 gap-2' key={index}>
                        <div className='w-2/12 overflow-hidden rounded'>
                            <img src={'http://localhost:1337/'.includes(process.env.REACT_APP_BASE_URL) ?`${process.env.REACT_APP_BASE_URL}${val.image}` : `${val.image}`} alt={val.variant_name}/>                               
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
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-lg'>Total Pesanan</p>
                    <p className='font-bold text-lg underline'>{getCurrency(order.attributes.price_total)}</p>
                  </div>
              </li>
          </ul>
          </div>
        </div>
    </div>
  )
}

export default DetailOrderStatus