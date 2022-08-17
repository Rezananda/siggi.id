import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TopNavbar from '../../components/Navbar/TopNavbar'
import "swiper/css";
import "swiper/css/navigation";
import HeroImage from '../../components/HeroImage/HeroImage';
import { Cart } from '../../context/CartContext'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'

const ProductDetail = () => {
    const [loading, setLoading] = useState(false)
    const {addToCart} = useContext(Cart)
    const [addCarts, setAddCarts] = useState(0)
    const [variant, setVarian] = useState('-')
    const [productDetail, setProductDetail] = useState({attributes:{variants:{data:[{attributes:{}}]},image:{data:[]}}})
    const getCurrency = useGetCurrency()
    const selectedVariant = productDetail.attributes.variants.data.find(x => x.attributes.variant_name === variant)

    const handleAddToCarts = () => {
        if(addCarts < 0){
            return
        }else{
            setAddCarts(addCarts+1)
            addToCart({
                id: productDetail.id,
                name: productDetail.attributes.name,
                image: productDetail.attributes.image.data[0].attributes.url,
                variant_name: variant,
                is_discount_variant: selectedVariant.attributes.is_discount_variant,
                variant_price: parseInt(selectedVariant.attributes.variant_price),
                variant_discount: selectedVariant.attributes.variant_discount,
                variant_price_final: parseInt(selectedVariant.attributes.variant_price) - (parseInt(selectedVariant.attributes.variant_price) * parseInt(selectedVariant.attributes.variant_discount) / 100)
            })
        }
    }

    const {id} = useParams()

    const getProductDetail = async(id) => {
        setLoading(true)
        try {
            let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/products/${id}?populate=*`)
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
                <div className='bg-white flex flex-col rounded-lg px-2 py-1 drop-shadow-md'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-lg w-full text-gray-600'>{productDetail.attributes.name}</p>
                    </div>
                </div>

                <div className='bg-white flex flex-col rounded-lg px-2 py-1 gap-1 drop-shadow-md'>
                    {productDetail.attributes.variants.data.length > 1 ?
                        <div> 
                            <p className='font-bold'>Pilih Variasi: </p>
                            <div className='flex flex-wrap items-center gap-2 overflow-x-auto p-1'>
                                {productDetail.attributes.variants.data.map((val, index) => 
                                    <div className="relative" key={index}>
                                        <input onClick={(e) => setVarian(e.target.value)} className="sr-only peer" type="radio" value={val.attributes.variant_name} name="variant" id={val.attributes.variant_name}/>
                                        <label className="flex p-2 bg-white border border-gray-300 rounded cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-yellow-500 peer-checked:bg-yellow-50 peer-checked:ring-2 peer-checked:border-transparent" htmlFor={val.attributes.variant_name}>{val.attributes.variant_name}</label>
                                    </div>
                                )}
                            </div>      
                            <div>
                                {selectedVariant === undefined ? 
                                <p className='font-bold text-2xl'>{getCurrency(productDetail.attributes.variants.data[0].attributes.variant_price)}</p> 
                                :
                                <>
                                {selectedVariant.attributes.is_discount_variant ? 
                                <>                                
                                    <p className='font-bold text-2xl text-red-500'>{
                                        getCurrency(parseInt(selectedVariant.attributes.variant_price) - (parseInt(selectedVariant.attributes.variant_price) * parseInt(selectedVariant.attributes.variant_discount) / 100))}
                                    </p>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-red-100 text-red-500 font-bold px-1 rounded'>{selectedVariant.attributes.variant_discount}%</span>
                                        <p className='text-gray-400 line-through'>{getCurrency(selectedVariant.attributes.variant_price)}</p>
                                    </div>
                                </>
                                :
                                    <p className='font-bold text-2xl'>{
                                        getCurrency(parseInt(selectedVariant.attributes.variant_price))}
                                    </p>
                                }
                                </>
                                }
                            </div>
                        </div>   
                        :
                        <p className='font-bold text-center'>{getCurrency(productDetail.attributes.price)}</p>
                    }
                </div>

                <div className='bg-white flex flex-col rounded-lg px-2 py-1 gap-1 drop-shadow-md mb-28'>
                    <p className='font-bold'>Deskripsi</p>
                    <p>{productDetail.attributes.description}</p>
                </div>
            </div>
        }
        <div className='flex items-center p-4 fixed bottom-0 left-0 right-0 bg-white rounded-t'>
            <button className='flex items-center justify-center bg-yellow-500 border border-yellow-500 w-full p-2 rounded-full text-white font-bold disabled:bg-yellow-100 disabled:border-yellow-100' disabled={variant === '-' ? true: false} onClick={() => handleAddToCarts()}>
                Tambah ke Keranjang         
            </button>
        </div>
    </div>
  )
}

export default ProductDetail