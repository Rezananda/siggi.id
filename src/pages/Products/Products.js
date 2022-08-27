import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import CardProduct from '../../components/Card/CardProduct'
import Footer from '../../components/Footer/Footer'
import Icon from '../../components/Icon/Icon'
import Navbar from '../../components/Navbar/Navbar'
import Pagination from '../../components/Pagination/Pagination'

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { state } = useLocation()
  const [selectedPage, setSelectedPage] = useState(1)
  const [maxPage, setMaxPage] = useState()
  const previousValue = usePreviousValue(state);
  const navigate = useNavigate()
  const [filter, setFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('')

  const handlePage = (page) => {
    if(page === 'prev'){
      setSelectedPage(selectedPage - 1)
    }else if(page === 'next'){
      setSelectedPage(selectedPage + 1)
    }
  }

  useEffect(() => {
    setLoading(true)
    let isMounted = true
    if(previousValue !== state){
      setSelectedPage(1)
    }
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/products?${state.id !== 'allProduct' ? `filters[categories]=${state.id}` : ''}&populate=*&pagination[page]=${selectedPage}&pagination[pageSize]=5`).then(response => {
      if(isMounted){
        setMaxPage(response.data.meta.pagination.pageCount)
        setProducts(response.data.data)
        setLoading(false)
      }
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  
    return () => {
      isMounted = false
    }
  }, [previousValue, selectedPage, state])
  
  return (
    <>
      <div className='bg-gray-50 min-h-screen'>
        <Navbar/>
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex w-full items-center justify-between gap-2'>
            <p className='text-lg font-bold uppercase'>{state.name}</p>
            <div className='flex items-center gap-2'>
              <button onClick={() => navigate('/search')}>
                <Icon type={`search`} className={`h-7 w-7 text-yellow-500`}/>
              </button>
              <button onClick={() => setFilter(true)}>
                <Icon type={`filter`} className={`h-7 w-7 text-yellow-500`}/>
              </button>
            </div>
          </div>
          {loading?
          <p>Loading...</p>
          :
          <div className='grid grid-cols-2 gap-2'>
            {selectedFilter === ''? 
            <>
              {products.sort((a, b) => a.id - b.id).map((val, index) => (
                <CardProduct key={index} productId={val.id} name={val.attributes.name} variants={val.attributes.variants.data} image={val.attributes.image.data[0].attributes.formats.large.url}/>
              ))}
            </>
            :
            selectedFilter === 'hargaRendah'?
            <>
            {products.sort((a, b) =>  parseInt(a.attributes.variants.data[0].attributes.variant_price) - parseInt(b.attributes.variants.data[0].attributes.variant_price)).map((val, index) => (
              <CardProduct key={index} productId={val.id} name={val.attributes.name} variants={val.attributes.variants.data} image={val.attributes.image.data[0].attributes.formats.large.url}/>
            ))}
            </>
            :
            selectedFilter === 'hargaTinggi'?
            <>
            {products.sort((a, b) =>  parseInt(b.attributes.variants.data[0].attributes.variant_price) - parseInt(a.attributes.variants.data[0].attributes.variant_price)).map((val, index) => (
              <CardProduct key={index} productId={val.id} name={val.attributes.name} variants={val.attributes.variants.data} image={val.attributes.image.data[0].attributes.formats.large.url}/>
            ))}
            </>
            :
            ''
            }
          </div>
          }
          <Pagination maxPage={maxPage} pageNumber={selectedPage} handlePage={handlePage}/>
        </div>

        {filter&&<div className='h-screen fixed top-0 bottom-0 left-0 right-0 z-50 bg-black opacity-50' onClick={() => setFilter(false)}></div>}
        {filter&&
          <div className='fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-4 flex flex-col gap-4 z-50'>
            <div className='w-full flex justify-between'>
              <p className='font-bold text-lg'>
                Filter
              </p>
              <button onClick={() => setFilter(false)}>
                <Icon type={`close`} className={`h-8 w-8`}/>
              </button>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <p className='font-bold'>Urutkan</p>
                <button className='text-blue-500 underline' onClick={() => {setSelectedFilter(''); setFilter(false)}} >Reset</button>
              </div>
              <div className='flex items-center flex-wrap gap-2'>
                <div className="relative">
                    <input onClick={(e) => {setSelectedFilter(e.target.value); setFilter(false)}} value={`hargaRendah`} className="sr-only peer" type="radio" name="variant" id={`hargaRendah`} defaultChecked={selectedFilter === 'hargaRendah'}/>
                    <label className="flex px-2 py-1 bg-white border border-gray-300 rounded-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-yellow-500 peer-checked:bg-yellow-50 peer-checked:ring-2 peer-checked:border-transparent" htmlFor={`hargaRendah`}>Harga Terendah</label>
                </div>
                <div className="relative">
                    <input onClick={(e) => {setSelectedFilter(e.target.value); setFilter(false)}} value={`hargaTinggi`} className="sr-only peer" type="radio" name="variant" id={`hargaTinggi`} defaultChecked={selectedFilter === 'hargaTinggi'}/>
                    <label className="flex px-2 py-1 bg-white border border-gray-300 rounded-full cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-yellow-500 peer-checked:bg-yellow-50 peer-checked:ring-2 peer-checked:border-transparent" htmlFor={`hargaTinggi`}>Harga Tertinggi</label>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <Footer/>
    </>
  )
}

export default Products