import React, { useContext } from 'react'
import Button from '../../components/Button/Button'
import TopNavbar from '../../components/Navbar/TopNavbar'
import { Cart } from '../../context/CartContext'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'

const Carts = () => {
    const {cart, addToCart, removeToCart} = useContext(Cart)
    const getCurrency = useGetCurrency()

  return (
    <div className='min-h-screen bg-gray-50'>
        <TopNavbar label={'Keranjang'}/>
        <div className='p-4'>
            <div className='w-full flex flex-col gap-2'>
                {cart.map((val, index) => 
                <div className='w-full p-1 flex items-center bg-white rounded-lg drop-shadow px-3 py-1 gap-2' key={index}>
                    <div className='w-2/12 truncate overflow-hidden rounded'>
                        <img src={val.image} alt={val.name}/>
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
                        <p>{val.qty}</p>
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
        </div>
        <div className='fixed bottom-0 left-0 right-0 p-4 bg-white'>
            <div className='flex items-center w-full justify-between'>
                <div className='flex flex-col'>
                    <div className='flex gap-1 items-center'>
                        <p className='text-lg'>TOTAL :</p>
                        <p className='text-lg font-bold'>{getCurrency(cart.reduce((acc, val) => acc + ((val.is_discount_variant ? parseInt(val.variant_price_final) - (parseInt(val.variant_price_final) * val.variant_discount)/100 : parseInt(val.variant_price_final)) * val.qty), 0))}</p>
                    </div>
                    <p className='text-xs'>*Belum Termasuk Ongkos Kirim</p>
                </div>
                <div>
                    <Button type={'fill'} size={'medium'} label={'Checkout'}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Carts