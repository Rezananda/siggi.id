import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import TopNavbar from '../../components/Navbar/TopNavbar'
import Stepper from '../../components/Stepper/Stepper'
import { Cart, getCartItems } from '../../context/CartContext'
import { JwtAuth } from '../../context/JwtContext'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'
import Confirmation from './Confirmation/Confirmation'
import Input from './Input/Input'
import Result from './Result/Result'
import {v4 as uuid} from 'uuid'
import Cookies from 'js-cookie'

const Orders = () => {
  const {cart, setCart} = useContext(Cart)
  const {jwt} = useContext(JwtAuth)
  const [provinces, setProvinces] = useState([])
  const [city, setCity] = useState([])
  const [district, setDistrict] = useState([])
  const [village, setVillage] = useState([])
  const [order, setOrder] = useState()
  const [address, setAddress] = useState({
    order: cart,
    priceTotal: cart.reduce((acc, val) => acc + ((val.is_discount_variant ? parseInt(val.variant_price_final) : parseInt(val.variant_price)) * val.qty), 0)
  })
  const [loadingProvince, setLoadingProvince] = useState(false)
  const [loadingCity, setLoadingCity] = useState(false)
  const [loadingDistrict, setLoadingDistrict] = useState(false)
  const [loadingVillage, setLoadingVillage] = useState(false)
  const [loadingAddOrder, setLoadingAddOrder] = useState(false)
  const [voucher, setVocher] = useState([])
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
    axios.get('https://peaceful-cliffs-34583.herokuapp.com/provinces').then(response => {
      if(isMounted){
        setProvinces(response.data)
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
    axios.get(`https://peaceful-cliffs-34583.herokuapp.com/regencies/${province}`).then(response => {
      setCity(response.data)
      setLoadingCity(false)
    }).catch(error => {
      console.log(error.message)
      setLoadingCity(false)
    })
  }

  const getDistrict = (city) => {
    setLoadingDistrict(true)
    axios.get(`https://peaceful-cliffs-34583.herokuapp.com/districts/${city}`).then(response => {
      setDistrict(response.data)
      setLoadingDistrict(false)
    }).catch(error => {
      console.log(error.message)
      setLoadingDistrict(false)
    })
  }

  const getVillage = (district) => {
    setLoadingVillage(true)
    axios.get(`https://peaceful-cliffs-34583.herokuapp.com/villages/${district}`).then(response => {
      setVillage(response.data)
      setLoadingVillage(false)
    }).catch(error => {
      console.log(error.message)
      setLoadingVillage(false)
    })
  }

  const handlCheckVoucher = (value) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/vouchers?filters[voucher_code][$eq]=${value}`).
    then(response => {
      setVocher(response.data.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const handleSaveOrder = () => {
    setLoadingAddOrder(true)
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/orders`, {
      data: {
        name: address.name,
        phone_number: address.phoneNumber,
        address: `${address.fullAddress}, ${address.village_name}, ${address.district_name}, ${address.city_name}, ${address.district_name}, ${address.postCode}`,
        detail_order: address.order,
        price_total: address.priceTotal,
        transaction_id: uuid(),
        order_status: 1,
        user: jwt.user.id,
        voucher: voucher[0].id
      }
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization :`Bearer ${jwt.jwt}`
        }
    }).then(response => {
      console.log(response.data)
      setOrder(response.data)
      setLoadingAddOrder(false)
    }).catch(err => {
      console.log(err.message)
      setLoadingAddOrder(false)
    })
  }
  
  const handleSendOrder = () => {
    let text = `
    Nama%3A%0A
    ${address.name}%0A
    %0A
    Nomor%20Handphone%3A%0A
    ${address.phoneNumber}%0A
    %0A
    Alamat%20Lengkap%3A%0A
    ${address.fullAddress}, ${address.village_name}, ${address.city_name}, ${address.district_name}, ${address.village_name}, ${address.postCode}%0A
    %0A
    %0ADetail%20Pesanan%3A%0A
    ${address.order.map(val => ` - ${val.name} : ${val.qty}%0A`)}%0A
    Total%3A%0A
    ${address.priceTotal}`

    let phoneNumberDestination = '6281259672716'
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumberDestination}&text=${text}`)
    Cookies.remove('carts')
    setCart(getCartItems())
  }
  


  return (
    <div className='min-h-screen bg-gray-50'>
      <TopNavbar label={'Pesanan'} route={'/carts'}/>
      <div className='px-4 py-2 flex flex-col gap-4'>
        <div className='px-4'>
          <Stepper step={step}/>
        </div>
        {step === 1 ?
        <Input setAddress={setAddress} address={address} provinces={provinces} loadingProvince={loadingProvince} getCity={getCity} city={city} loadingCity={loadingCity} getDistrict={getDistrict} district={district} loadingDistrict={loadingDistrict} getVillage={getVillage} village={village} loadingVillage={loadingVillage} cart={cart} handlCheckVoucher={handlCheckVoucher} voucher={voucher} setVocher={setVocher}/>
        :
        step === 2 ?
        <Confirmation loadingAddOrder={loadingAddOrder} address={address} voucher={voucher}/>
        :
        step === 3 ?
        <Result/>
        :
        null
        }
      </div>
      {step === 1||step === 2 ? 
      <div className='flex items-center w-full justify-between fixed bottom-0 left-0 right-0 px-2 py-4 bg-white'>
        <div className='flex flex-col'>
            <div className='flex gap-1 items-center'>
                <p className='text-lg'>TOTAL :</p>
                <p className='text-lg font-bold underline'>{getCurrency(cart.reduce((acc, val) => acc + ((val.is_discount_variant ? parseInt(val.variant_price_final) : parseInt(val.variant_price)) * val.qty), 0))}</p>
            </div>
            <p className='text-xs'>*Belum Termasuk Ongkos Kirim</p>
        </div>
        <div className='flex items-center gap-2'>
            {step===2&&<Button type={'outline'} size={'small'} label={'Kembali'} onclick={() => handleStep('prev')}/>}
            {step===2&&<Button type={'fill'} size={'small'} label={'Kirim'} onclick={async() =>  await Promise.all([handleSaveOrder(), handleSendOrder(), handleStep('next')])}/>}
            {step===1&&Object.keys(address).length === 14&&<Button type={'fill'} size={'small'} label={'Lanjut'} onclick={() => handleStep('next')}/>}
            {step===1&&Object.keys(address).length !== 14&&<Button type={'disable'} size={'small'} label={'Lanjut'}/>}
        </div>
      </div>
      :
      null
      }
    </div>
  )
}

export default Orders