import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNavbar from '../../components/Navbar/TopNavbar'
import { JwtAuth } from '../../context/JwtContext'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'

const OrderStatus = () => {
    const {jwt} = useContext(JwtAuth)
    const [order, setOrder] = useState([])
    const [status, setStatus] = useState([])
    const [filter, setFilter] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const getCurrency = useGetCurrency()
    const navigate = useNavigate()
    
    const handleFilter = (type) => {
        setLoading(true)
        setFilter(type)
        axios.get(`${process.env.REACT_APP_BASE_URL}${type === 'all'? `/api/orders?filters[user]=${jwt.user.id}&populate=*`: `/api/orders?filters[user]=${jwt.user.id}&filters[order_status][status]=${type}&populate=*`}`, {headers: {
          Authorization :`Bearer ${jwt.jwt}`
        }}).then(response => {
            setOrder(response.data.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        let isMounted = true
        if(isMounted){
            handleFilter('all')
        }
        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
      let isMounted = true
      setLoadingStatus(true)
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/order-statuses`, {headers: {
          Authorization: `Bearer ${jwt.jwt}`
      }}).then(response => {
          if(isMounted){
            setStatus(response.data.data)
            setLoadingStatus(false)
          }
      }).catch(err => {
          console.log(err)
          setLoadingStatus(false)
      })

      return () => {
        isMounted = false
      }
    }, [])
    
    
  return (
    <div className='bg-gray-50 min-h-screen'>
        <TopNavbar label={'Pesanan'} route={'/'}/>
        {loading? <p>Loading...</p> : 
            <div className='p-4 flex flex-col gap-2'>
                <style>
                    {
                    `.scrollable::-webkit-scrollbar {
                        display: none;
                    }`
                    }
                </style>
                <div className='flex items-center gap-2 overflow-x-auto w-full scrollable'>
                    <button onClick={() => handleFilter('all')} className={`border border-yellow-500 px-2 py-1 rounded-full flex ${filter === 'all' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-500'}`}>
                        <div className='flex gap-1 items-center'>
                            <p className='flex truncate'>
                                Semua
                            </p>
                        </div>
                    </button>
                    {loadingStatus&&<p>Loading...</p>}
                    {status.map((val, index)=> (
                        <button onClick={() => handleFilter(val.attributes.status)} key={index} className={`border border-yellow-500 px-2 py-1 rounded-full flex w-full ${filter === val.attributes.status ? 'bg-yellow-500 text-white':'bg-yellow-100 text-yellow-500'}`}>
                            <div className='flex gap-1 items-center'>
                                <p className='flex truncate'>
                                    {val.attributes.status}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
                <div className='w-full flex flex-col gap-2'>
                    {order.length === 0&&<p className='w-full text-center'>Belum Ada Transaksi</p>}
                    {order.map((val, index) => (
                        <div className='flex flex-col divide-y bg-white rounded-md drop-shadow-lg p-2' key={index} onClick={() => navigate(`/order-status/${val.id}`)}>
                            <div className='flex items-center justify-between p-2'>
                                <p>{new Date(val.attributes.publishedAt).toLocaleDateString('en-GB')}</p>
                                <div className={`border ${val.attributes.order_status.data.attributes.status === 'Menunggu Pembayaran' ? 'border-red-500 bg-red-100 text-red-500': val.attributes.order_status.data.attributes.status === 'Sedang Di Proses' ? 'border-orange-500 bg-orange-100 text-orange-500' : val.attributes.order_status.data.attributes.status === 'Dikirim' ? 'border-blue-500 bg-blue-100 text-blue-500' : val.attributes.order_status.data.attributes.status === 'Selesai' ? 'border-green-500 bg-green-100 text-green-500' : ''} px-2 py-1 rounded-full text-xs`}>
                                    {val.attributes.order_status.data.attributes.status}
                                </div>
                            </div>
                            <div className='w-full flex gap-2 p-2' key={index}>
                                <div className='w-2/12 truncate overflow-hidden rounded'>
                                    <img src={`${process.env.REACT_APP_BASE_URL}${val.attributes.detail_order[0].image}`} alt={val.attributes.detail_order[0].name}/>
                                </div>
                                <div className='w-10/12'>
                                    <p className='truncate font-bold'>{val.attributes.detail_order[0].name}</p>
                                </div>
                            </div>
                            <div className='w-full flex items-center justify-between p-2'>
                                <p className='text-sm'>{`${val.attributes.detail_order.length} produk`}</p>
                                <p className='text-sm font-bold'>{`Total: ${getCurrency(val.attributes.price_total)}`}</p>
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