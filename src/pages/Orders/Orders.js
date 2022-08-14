import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import TopNavbar from '../../components/Navbar/TopNavbar'
import Stepper from '../../components/Stepper/Stepper'
import { Cart } from '../../context/CartContext'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'
import Confirmation from './Confirmation/Confirmation'
import Input from './Input/Input'
import Result from './Result/Result'

const Orders = () => {
  const {cart, setCart} = useContext(Cart)
  const [provinces, setProvinces] = useState([])
  const [city, setCity] = useState([])
  const [shippingPrice, setShippingPrice] = useState([])
  const [address, setAddress] = useState({
    name:'',
    phoneNumber:'',
    province: '',
    province_id:'',
    city_name:'',
    city_id:'',
    fullAddress:'',
    order: cart,
    priceTotal: cart.reduce((acc, val) => acc + ((val.is_discount_variant ? parseInt(val.variant_price_final) : parseInt(val.variant_price)) * val.qty), 0)
  })
  const [loadingProvince, setLoadingProvince] = useState(false)
  const [loadingCity, setLoadingCity] = useState(false)
  const [loadingShippingPrice, setLoadingShippingPrice] = useState(false)
  const [step, setStep] = useState(1)
  const getCurrency = useGetCurrency()

  function handleStep(stepPosition){
    if(stepPosition === "prev"){
      setStep(step - 1)
    }else if(stepPosition === "next"){
      setStep(step + 1)
    }else{
        console.log('error step')
    }
  }
  
  useEffect(() => {
    setLoadingProvince(true)
    let isMounted = true
    axios.get('https://peaceful-cliffs-34583.herokuapp.com/provinces', {headers:{
      key: '3accf139e8ea29802dfd71c41a153eb2'
    }}).then(response => {
      if(isMounted){
        setProvinces(response.data.rajaongkir.results)
        setLoadingProvince(false)
      }
    }).catch(error => {
      if(isMounted){
        console.log(error.message)
        setLoadingProvince(false)
      }
    })

    return () => {
      isMounted= false
    }
  }, [])

  const getCity = (province) => {
    setLoadingCity(true)
    axios.get(`https://peaceful-cliffs-34583.herokuapp.com/city?province_id=${province}`, {headers:{
      key: '3accf139e8ea29802dfd71c41a153eb2'
    }}).then(response => {
      setCity(response.data.rajaongkir.results)
      setLoadingCity(false)
    }).catch(error => {
      console.log(error.message)
      setLoadingCity(false)
    })
  }

  const getShippingPrice = (city) => {
    setLoadingShippingPrice(true)
    axios.post('https://peaceful-cliffs-34583.herokuapp.com/cost', 
    {
      "origin": "151", 
      "destination": city, 
      "weight": 1000, 
      "courier": "jne"
    },{
      headers:{
      key: '3accf139e8ea29802dfd71c41a153eb2'
    }}).then(res => {
        console.log(res.data)
        setShippingPrice(res.data.rajaongkir.results)
        setLoadingShippingPrice(false)
    }).catch(err => {
        console.log(err)
        setLoadingShippingPrice(false)
    })
  }

  const handleSendOrder = () => {
    let text = `Nama%3A%0A${address.name}%0A%0ANomor%20Handphone%3A%0A${address.phoneNumber}%0A%0AProvinsi%3A%0A${address.province}%0A%0AKota%2FKabupaten%3A%0A${address.city_name}%0A%0AAlamat%20Lengkap%3A%0A${address.fullAddress}%0A%0ADetail%20Pesanan%3A%0A${address.order.map(val => `- ${val.name} : ${val.qty}%0A`)}%0ATotal%3A%0A${address.priceTotal}`
    let phoneNumberDestination = '6281259672716'
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumberDestination}&text=${text}`)
    localStorage.removeItem('carts')
    setCart([])
  }
  


  return (
    <div className='min-h-screen bg-gray-100'>
      <TopNavbar label={'Pesanan'}/>
      <div className='px-4 py-2 flex flex-col gap-4'>
        <div className='px-4'>
          <Stepper step={step}/>
        </div>
        {step === 1 ?
        <Input handleStep={handleStep} setAddress={setAddress} address={address} provinces={provinces} loadingProvince={loadingProvince} getCity={getCity} city={city} loadingCity={loadingCity} getShippingPrice={getShippingPrice} shippingPrice={shippingPrice} loadingShippingPrice={loadingShippingPrice} cart={cart}/>
        :
        step === 2 ?
        <Confirmation address={address} setStep={setStep}/>
        :
        step === 3 ?
        <Result/>
        :
        null
        }
      </div>
      {step === 1||step === 2 ? <div className='flex items-center w-full justify-between fixed bottom-0 left-0 right-0 px-2 py-4 bg-white'>
        <div className='flex flex-col'>
            <div className='flex gap-1 items-center'>
                <p className='text-lg'>TOTAL :</p>
                <p className='text-lg font-bold underline'>{getCurrency(cart.reduce((acc, val) => acc + ((val.is_discount_variant ? parseInt(val.variant_price_final) : parseInt(val.variant_price)) * val.qty), 0))}</p>
            </div>
            <p className='text-xs'>*Belum Termasuk Ongkos Kirim</p>
        </div>
        <div className='flex items-center gap-2'>
            {step===2&&<Button type={'outline'} size={'small'} label={'Kembali'} onclick={() => handleStep('prev')}/>}
            {step===2&&<Button type={'fill'} size={'small'} label={'Kirim'} onclick={() => {handleSendOrder(); handleStep('next');}}/>}
            {step===1&&<Button type={'fill'} size={'small'} label={'Lanjut'} onclick={() => handleStep('next')}/>}
        </div>
      </div>
      :
      null
      }
    </div>
  )
}

export default Orders