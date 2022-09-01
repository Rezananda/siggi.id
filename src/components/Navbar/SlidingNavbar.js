import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon/Icon'
import Siggi from '../../assets/icon/siggi 2.png'

const SlidingNavbar = ({slideNavbar, setSlideNavbar}) => {
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let isMounted = true
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories?populate=*`).
        then(response => {
            if(isMounted){
                setCategory(response.data.data)
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
        
        return () => {
            isMounted = false
        }
    }, [])
    
  return (
    <div>
        {slideNavbar&&<div className='h-screen fixed top-0 bottom-0 left-0 right-0 z-30 bg-black opacity-50' onClick={() => setSlideNavbar(false)}>
        <button className='w-full flex justify-end z-30 absolute' onClick={() => setSlideNavbar(false)}>
            <Icon type={'close'} className={'h-8 w-8 text-white'}/>
        </button>
        </div>}
        <div className={`transform top-0 left-0 w-4/6 md:w-3/12 fixed ease-in-out transition-all duration-300 z-30 ${slideNavbar ? 'translate-x-0' : '-translate-x-full'}`}>
            <button className='flex justify-center bg-siggi-soft p-2 w-full' onClick={() => navigate('/')}>
                <img className='h-16 w-16' src={Siggi} alt='siggi'/>
            </button>
            <div className='p-4 h-screen bg-white flex flex-col gap-2'>
                <div className='flex flex-col'>
                    <p className='font-bold text-lg'>PRODUK</p>
                    {loading? <p>Loading...</p>
                    :                    
                        <ul className='flex flex-col ml-2'>
                            <li className='py-2'>
                                <button className='flex items-center font-bold justify-between w-full truncate' onClick={() => {navigate('/products', {state: {name: 'SEMUA PRODUK', id: 'allProduct', selected: 1}}); setSlideNavbar(false)}}>SEMUA PRODUK
                                    <Icon type={`chevron-right`} className={`h-6 w-6`}/>
                                </button>
                            </li>
                            {category.map((val, index) => (
                                <li className='py-2' key={index}>
                                    <button className='flex uppercase items-center font-bold justify-between w-full truncate' onClick={() => {navigate('/products', {state: {name: val.attributes.name, id: val.id, selected: 1}}); setSlideNavbar(false)}}>{val.attributes.name}
                                        <Icon type={`chevron-right`} className={`h-6 w-6`}/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
                <div>
                    <button className='flex uppercase items-center font-bold justify-between w-full truncate text-lg' onClick={() => navigate(`/order-status`)}>STATUS PESANAN <Icon type={`chevron-right`} className={`h-6 w-6`}/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SlidingNavbar