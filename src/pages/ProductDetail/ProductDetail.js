import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TopNavbar from '../../components/Navbar/TopNavbar'
import piring2 from '../../assets/img/piring2.jpg'
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import HeroImage from '../../components/HeroImage/HeroImage';
import { Cart } from '../../context/CartContext'
import Button from '../../components/Button/Button'

const ProductDetail = () => {
    const [loading, setLoading] = useState(false)
    const {cart, addToCart, removeToCart} = useContext(Cart)
    const [addCarts, setAddCarts] = useState(0)
    const [variant, setVarian] = useState('-')
    const [productDetail, setProductDetail] = useState({
        attributes: {
            variants:{
                data: [
                    {
                        attributes:{}
                    }
                ]
            },
            image:
                {
                    data:[]
                }
            }
    })
    const variant_prices = productDetail.attributes.variants.data.find(x => x.attributes.variant_name === variant)

    const handleAddToCarts = (type) => {
        if(addCarts < 0){
            return
        }else{
            if(type === 'plus'){
                setAddCarts(addCarts+1)
                addToCart({
                    id: productDetail.id,
                    name: productDetail.attributes.name,
                    image: productDetail.attributes.image.data[0].attributes.url,
                    variant_name: variant,
                    is_discount_variant: variant_prices.attributes.is_discount_variant,
                    variant_price: parseInt(variant_prices.attributes.variant_price),
                    variant_discount: variant_prices.attributes.variant_discount,
                    variant_price_final: parseInt(variant_prices.attributes.variant_price) - (parseInt(variant_prices.attributes.variant_price) * parseInt(variant_prices.attributes.variant_discount) / 100)
                })
            }else if(type === 'minus'){
                setAddCarts(addCarts-1)
                removeToCart(productDetail)
            }
        }
    }

    const {id} = useParams()
    const getCurrency = (val) => {
        const result = parseInt(val).toLocaleString('id', { style: 'currency', currency: 'IDR' })
        return result
      }

    const getProductDetail = async(id) => {
        setLoading(true)
        try {
            let response = await axios.get(`https://calm-fjord-36326.herokuapp.com/api/products/${id}?populate=*`)
            setProductDetail(response.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
      getProductDetail(id)
      return () => {
        getProductDetail(id)
      }
    }, [id])
    
  return (
    <div className='min-h-screen bg-gray-50'>
        <TopNavbar withCart={true}/>
        {loading ?        
            <p>Loading...</p>
            :
            <div className='p-4 flex flex-col gap-2'>
                <HeroImage type={'productDetail'} productDetail={productDetail}/>
                <div className='bg-white flex flex-col rounded px-2 py-1 drop-shadow'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-lg w-full text-gray-600'>{productDetail.attributes.name}</p>
                    </div>
                </div>

                <div className='bg-white flex flex-col rounded px-2 py-1 gap-1 drop-shadow'>
                    {productDetail.attributes.variants.data.length > 1 ?
                        <div> 
                            <p className='font-bold'>Variasi: </p>
                            <div className='flex items-center gap-1'>
                                {productDetail.attributes.variants.data.map((val, index) => 
                                    <div className="relative" key={index}>
                                        <input onClick={(e) => setVarian(e.target.value)} className="sr-only peer" type="radio" value={val.attributes.variant_name} name="variant" id={val.attributes.variant_name}/>
                                        <label className="flex p-2 bg-white border border-gray-300 rounded cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-yellow-500 peer-checked:bg-yellow-50 peer-checked:ring-2 peer-checked:border-transparent" htmlFor={val.attributes.variant_name}>{val.attributes.variant_name}</label>
                                    </div>
                                )}

                            </div>      
                            <div>
                                {variant_prices === undefined ? 
                                <p className='font-bold text-2xl text-red-500'>{getCurrency(0)}</p> 
                                :
                                <>
                                    <p className='font-bold text-2xl text-red-500'>{
                                        getCurrency(parseInt(variant_prices.attributes.variant_price) - (parseInt(variant_prices.attributes.variant_price) * parseInt(variant_prices.attributes.variant_discount) / 100))}
                                    </p>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-red-100 text-red-500 font-bold px-1 rounded'>{variant_prices.attributes.variant_discount}%</span>
                                        <p className='text-gray-400 line-through'>{getCurrency(variant_prices.attributes.variant_price)}</p>
                                    </div>
                                </>
                                }
                            </div>
                        </div>   
                        :
                        <p className='font-bold text-center'>{getCurrency(productDetail.attributes.price)}</p>
                    }
                </div>

                <div className='bg-white flex flex-col rounded px-2 py-1 gap-1 drop-shadow'>
                    <p className='font-bold'>Deskripsi</p>
                    <p>{productDetail.attributes.description}</p>
                </div>
            </div>
        }
        <div className='flex items-center p-2 fixed bottom-0 left-0 right-0 bg-white rounded-t-lg'>
            <button className='flex items-center justify-center bg-yellow-500 border border-yellow-500 w-full p-2 rounded-full text-white font-bold disabled:bg-yellow-100 disabled:border-yellow-100' disabled={variant === '-' ? true: false} onClick={() => handleAddToCarts('plus')}>
                Tambah ke Keranjang         
            </button>
        </div>
    </div>
  )
}

export default ProductDetail