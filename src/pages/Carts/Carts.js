import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import TopNavbar from '../../components/Navbar/TopNavbar'
import { Cart } from '../../context/CartContext'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'

const Carts = () => {
    const {cart, addToCart, removeToCart} = useContext(Cart)
    const navigate = useNavigate()
    const getCurrency = useGetCurrency()

  return (
    <div className='min-h-screen bg-gray-50'>
        <TopNavbar label={'Keranjang'} route={'/'}/>
        <div className='p-4'>
            <div className='w-full flex flex-col gap-2 mb-48'>
                {cart.map((val, index) => 
                <div className='w-full flex items-center bg-white rounded-md drop-shadow-md px-3 py-1 gap-2' key={index}>
                    <div className='w-2/12 truncate overflow-hidden rounded'>
                        <img src={'http://localhost:1337/'.includes(process.env.REACT_APP_BASE_URL) ?`${process.env.REACT_APP_BASE_URL}${val.image}` : `${val.image}`} alt={val.name}/>
                    </div>
                    <div className='w-6/12'>
                        <p className='truncate'>{val.name}</p>
                        <div className='text-sm bg-siggi-soft text-siggi-hard border border-siggi-hard rounded w-fit px-1'>{val.variant_name}</div>
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
                        <button className='flex p-2 items-center border border-siggi-hard bg-white text-siggi-hard rounded' onClick={() => removeToCart({...cart,
                            id: val.id,
                            name: val.name,
                            image: val.image,
                            variant_name: val.variant_name,
                            is_discount_variant: val.is_discount_variant,
                            variant_price: parseInt(val.variant_price),
                            variant_discount: val.variant_discount,
                            variant_price_final: parseInt(val.variant_price_final
                        )})}>-</button>
                        <p>{val.qty}</p>
                        <button className='flex p-2 items-center border border-siggi-hard bg-siggi-hard text-white rounded' onClick={() => addToCart({...cart,
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
        <div className='flex items-center drop-shadow-lg w-full justify-between fixed md:absolute bottom-0 left-0 right-0 px-2 py-4 bg-white'>
            <div className='flex flex-col'>
                <div className='flex gap-1 items-center'>
                    <p className='text-lg'>TOTAL :</p>
                    <p className='text-lg font-bold underline'>{getCurrency(cart.reduce((acc, val) => acc + ((val.is_discount_variant ? parseInt(val.variant_price_final) : parseInt(val.variant_price)) * val.qty), 0))}</p>
                </div>
                <p className='text-xs'>*Belum Termasuk Ongkos Kirim</p>
            </div>
            <div>
                {cart.length === 0 ?
                <Button type={'disable'} size={'small'} label={'Checkout'}/>
                :
                <Button type={'fill'} size={'small'} label={'Checkout'} onclick={() => navigate('/orders')}/>
                }
            </div>
        </div>
    </div>
  )
}

export default Carts