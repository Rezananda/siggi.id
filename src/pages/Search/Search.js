import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Icon from '../../components/Icon/Icon'
import useGetCurrency from '../../hooks/useGetCurrency/useGetCurrency'

const Search = () => {
    const navigate = useNavigate()
    const [search, setSearch]= useState({
        searchKey:'',
        category:'all'
    })
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingCategories, setLoadingCategories] = useState(false)
    const getCurrency = useGetCurrency()
    const [searchResult, setSearchResult] = useState([
        {
            attributes: {
                name:'',
                image: {
                    data: [
                        {
                            attributes: {
                                url:''
                            }
                        }
                    ]
                },
                variants: {
                    data: [
                        {
                            attributes:{
                                is_discount_variant:'',
                                variant_price:'',
                                variant_discount:''
                            }
                        }
                    ]
                }
            }
        }
    ])
    
    useEffect(() => {
        setLoadingCategories(true)
        const isMounted = true
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories`).then(response => {
            if(isMounted){
                setCategories(response.data.data)
                setLoadingCategories(false)
            }
        }).catch(err => {
            console.log(err)
            setLoadingCategories(false)
        })
        
        return () => {
            
        }
        }, [])
    

    const getSearch = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/products?filters[name][$containsi]=${search.searchKey}${search.category === 'all'? ``:`&filters[categories]=${search.category}`}&populate=*`)
        .then(response => {
            setSearchResult(response.data.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
    
  return (
    <div className='bg-gray-50 min-h-screen'>
        <div className='py-5 bg-white drop-shadow-lg flex flex-col justify-center gap-2 sticky top-0 z-50 w-full px-4'>
            <div className='flex items-center'>
                <button onClick={() => navigate(-1)}>
                    <Icon type={'arrow-back'} className={'h-7 w-7 text-yellow-500'}/>
                </button>
                <p className='text-yellow-500 text-xl font-bold'>{'Cari Siggi'}</p>
            </div>
            <input type={'text'} onChange={(e) => setSearch({...search, searchKey: e.target.value})} placeholder='Cari Produk Siggi' className='bg-gray-100 border border-gray-200 py-2 px-4 w-full rounded'/>
            <select onChange={(e) => setSearch({...search, category: e.target.value})} className='w-full px-4 py-2 bg-gray-100 rounded-lg border border-gray-200'>
                <option defaultValue={'all'}>{loadingCategories? 'Loading...' : 'Semua Kategori'}</option>
                {categories.map((val, index)=> (
                    <option key={index} value={val.id}>{val.attributes.name}</option>
                ))}
              </select>
            {search.searchKey === '' ?
            <Button type={'disable'} label={'Cari'} size={'large'}/>
            :
            <Button type={'fill'} label={'Cari'} onclick={() => getSearch()} size={'large'}/>
            }
        </div>
        {loading? <p>Loading...</p> : 
        
        <div className='p-4 w-full'>
            {searchResult.length !== 0?
            <>
            {searchResult[0].attributes.name !== ''?
                <div className={`flex flex-col gap-2`}>
                    <p className='font-bold text-gray-500'>Hasil Pencarian:</p>
                    {searchResult.map((val, index) => (
                        <div className='w-full flex items-center bg-white rounded-md drop-shadow-md p-3 gap-2' key={index} onClick={() => navigate(`/product/${val.id}`)}>
                            <div className='w-2/12 truncate overflow-hidden rounded'>
                                <img src={'http://localhost:1337/'.includes(process.env.REACT_APP_BASE_URL) ?`${process.env.REACT_APP_BASE_URL}${val.attributes.image.data[0].attributes.url}` : `${val.attributes.image.data[0].attributes.url}`} alt={val.attributes.image.data[0].attributes.name}></img>
                            </div>
                            <div className='w-10/12'>
                                <p className='truncate'>{val.attributes.name}</p>
                                {val.attributes.variants.data[0].attributes.is_discount_variant ?
                                <div className='flex flex-col'>
                                    <p className='font-bold text-xs text-red-500'>{getCurrency(Math.min(...val.attributes.variants.data.map(val => parseInt(val.attributes.variant_price) - (parseInt(val.attributes.variant_price) * val.attributes.variant_discount / 100 ))))}</p>
                                    <p className='text-gray-400 text-xs line-through'>{getCurrency(val.attributes.variants.data[0].attributes.variant_price)}</p>
                                </div>
                                :
                                <div className='flex items-center gap-2'>
                                    <p className='font-bold text-center text-sm'>{getCurrency(val.attributes.variants.data[0].attributes.variant_price)}</p>
                                </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            :
            <p className='text-center text-gray-500'>Belum Ada Pencarian</p>
            }
            </>
            :
            <p className='text-center font-bold text-gray-500'>Produk Tidak Ditemukan</p>
            }
        </div>
        }
    </div>
  )
}

export default Search