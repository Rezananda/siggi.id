import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import TopNavbar from '../../components/Navbar/TopNavbar'
import { JwtAuth } from '../../context/JwtContext'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'

const OrderStatus = () => {
    const {jwt} = useContext(JwtAuth)
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(false)
    const getCurrency = useGetCurrency()
    
    useEffect(() => {
      let isMounted = true
      setLoading(true)
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/me?populate=*`, {headers: {
        Authorization :`Bearer ${jwt.jwt}`
      }}).then(response => {
          if(isMounted){
              setOrder(response.data.orders)
              setLoading(false)
          }
      }).catch(err => {
          console.log(err)
          setOrder(false)
      })
      return () => {
        isMounted = false
      }
    }, [])
    
  return (
    <div className='bg-gray-50 min-h-screen'>
        <TopNavbar label={'Pesanan Saya'}/>
        {loading? <p>Loading...</p> : 
            <div className='p-4'>
                <div className='w-full flex flex-col gap-2'>
                    {order.map((val, index) => (
                        <div className='flex flex-col divide-y bg-white rounded-md drop-shadow-lg p-2' key={index}>
                            <div className='flex items-center justify-between p-2'>
                                <p>{new Date(val.publishedAt).toLocaleDateString('en-GB')}</p>
                                <div className='border border-red-500 bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs'>
                                    {val.status}
                                </div>
                            </div>
                            <div className='w-full flex gap-2 p-2' key={index}>
                                <div className='w-2/12 truncate overflow-hidden rounded'>
                                    <img src={`${process.env.REACT_APP_BASE_URL}${val.detail_order[0].image}`} alt={val.detail_order[0].name}/>
                                </div>
                                <div className='w-10/12'>
                                    <p className='truncate font-bold'>{val.detail_order[0].name}</p>
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-between p-2'>
                                <p className='text-sm'>{`${val.detail_order.length} produk`}</p>
                                <p className='text-sm font-bold'>{`Total: ${getCurrency(val.price_total)}`}</p>
                            </div>
                        </div>
                        ))}
                </div>
            </div>
        }
    </div>
  )
}

export default OrderStatus