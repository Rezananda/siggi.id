import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import TopNavbar from '../../components/Navbar/TopNavbar'
import { Cart } from '../../context/CartContext'
import { JwtAuth } from '../../context/JwtContext'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'

const Carts = () => {
    const {cart, addToCart, removeToCart} = useContext(Cart)
    // const {jwt} = useContext(JwtAuth)
    const navigate = useNavigate()
    const getCurrency = useGetCurrency()
    // const [loading, setLoading] = useState(false)

    // const handleOrder = () => {
    //     setLoading(true)
    //     try {
    //         axios.post(`${process.env.REACT_APP_BASE_URL}/api/orders`, {
    //             "data": {
    //               "price_total": cart.reduce((acc, val) => acc + ((val.is_discount_variant ? parseInt(val.variant_price_final) : parseInt(val.variant_price)) * val.qty), 0),
    //               "detail_order": cart,
    //               "status": "In Progress",
    //             }
    //           }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization :`Bearer ${jwt.jwt}`
    //             }
    //         }).then(response => {
    //             console.log(response.data)
    //             navigate('/orders', {state: {order: response.data}})
    //             setLoading(false)
    //         }).catch(error => {
    //             console.log(error.message)
    //             setLoading(false)
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }
    // }


  return (
    <div className='min-h-screen bg-gray-50'>
        <TopNavbar label={'Keranjang'}/>
        <div className='p-4'>
            <div className='w-full flex flex-col gap-2'>
                {cart.map((val, index) => 
                <div className='w-full flex items-center bg-white rounded-md drop-shadow-lg px-3 py-1 gap-2' key={index}>
                    <div className='w-2/12 truncate overflow-hidden rounded'>
                        <img src={`${process.env.REACT_APP_BASE_URL}${val.image}`} alt={val.name}/>
                    </div>
                    <div className='w-6/12'>
                        <p className='truncate'>{val.name}</p>
                        <div className='text-sm bg-yellow-100 text-yellow-500 border border-yellow-500 rounded w-fit px-1'>{val.variant_name}</div>
                        {val.is_discount_variant ?
                        <div className='flex flex-col'>
                            <p className='font-bold text-xs text-red-500'>{getCurrency(val.variant_price_final)}</p>
                            <p className='text-gray-400 text-xs line-through'>{getCurrency(val.variant_price)}</p>
                        </div>
                        :
                        <div className='flex items-center gap-2'>
                            <p className='font-bold text-center text-sm'>{getCurrency(val.variant_price)}</p>
                        </div>
                        }
                    </div>
                    <div className='w-4/12 flex items-center justify-center gap-2'>
                        <button className='flex p-2 items-center border border-yellow-500 bg-white text-yellow-500 rounded' onClick={() => removeToCart({...cart,
                            id: val.id,
                            name: val.name,
                            image: val.image,
                            variant_name: val.variant_name,
                            is_discount_variant: val.is_discount_variant,
                            variant_price: parseInt(val.variant_price),
                            variant_discount: val.variant_discount,
                            variant_price_final: parseInt(val.variant_price_final
                        )})}>-</button>
                        <p className='font-bold'>{val.qty}</p>
                        <button className='flex p-2 items-center border border-yellow-500 bg-yellow-500 text-white rounded' onClick={() => addToCart({...cart,
                            id: val.id,
                            name: val.name,
                            image: val.image,
                            variant_name: val.variant_name,
                            is_discount_variant: val.is_discount_variant,
                            variant_price: parseInt(val.variant_price),
                            variant_discount: val.variant_discount,
                            variant_price_final: parseInt(val.variant_price_final
                        )})}>+</button>
                    </div>
                </div>
                )}
            </div>
            {cart.length === 0 && <p className='flex items-center justify-center'>Belum ada produk di keranjang</p>}
        </div>
        <div className='flex items-center w-full justify-between fixed bottom-0 left-0 right-0 px-2 py-4 bg-white border-t border-gray-100'>
            <div className='flex flex-col'>
                <div className='flex gap-1 items-center'>
                    <p className='text-lg'>TOTAL :</p>
                    <p className='text-lg font-bold underline'>{getCurrency(cart.reduce((acc, val) => acc + ((val.is_discount_variant ? parseInt(val.variant_price_final) : parseInt(val.variant_price)) * val.qty), 0))}</p>
                </div>
                <p className='text-xs'>*Belum Termasuk Ongkos Kirim</p>
            </div>
            <div>
                <Button type={'fill'} size={'small'} label={'Checkout'} onclick={() => navigate('/orders')}/>
            </div>
        </div>
    </div>
  )
}

export default Carts