import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alerts from '../../components/Alerts/Alerts'
import Button from '../../components/Button/Button'
import Footer from '../../components/Footer/Footer'
import TopNavbar from '../../components/Navbar/TopNavbar'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'

const OrderStatus = () => {
    const [transactionId, setTransactionId] = useState()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const navigate = useNavigate()

    const handleOrderStatus = () => {
        setLoading(true)
        let isMounted = true
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders?filters[transaction_id]=${transactionId}&populate=*`).then(response=>{
            if(isMounted){
                if(response.data.data.length === 0){
                    setAlert(true)
                    setLoading(false)
                }else{
                    navigate(`/order-status/${response.data.data[0].id}`)
                    setLoading(false)
                }
            }
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }


  return (
      <>
        <div className='bg-gray-50 min-h-screen relative'>
            <TopNavbar label={'Status Pesanan'} route={'/'}/>
            {alert&&<Alerts type={`warning`} message={`Kode pesanan tidak valid.`} handleClose={() => setAlert(false)}/> }
            <div className='p-4 flex flex-col gap-2'>
                <div className='flex flex-col divide-y bg-white rounded-md drop-shadow-lg p-4 gap-2'>
                    {loading&&
                    <div>
                        <SpinnerLoading/>
                    </div>}
                    <p className='font-bold text-lg'>Kode Pesanan* </p>
                    <input onChange={(e) => setTransactionId(e.target.value)} className='px-4 py-2 bg-gray-50 border border-gray-200 rounded' placeholder='Kode Pesanan'/>
                    {transactionId === undefined ? 
                    <Button type={`disable`} size={'large'} label={'Lihat'}/>
                    :
                    <Button type={`fill`} size={'large'} label={'Lihat'} onclick={() => handleOrderStatus()}/>
                    }
                </div>
            </div>
        </div>
        <Footer/>
      </>
  )
}

export default OrderStatus