import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { JwtAuth } from '../../context/JwtContext'
import useLogout from '../../hooks/useLogout/useLogout'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'

const SlidingNavbar = ({slideNavbar, setSlideNavbar}) => {
    const navigate = useNavigate()
    const {jwt} = useContext(JwtAuth)
    const [getLogout] = useLogout()
    const [slidingDown, setSlidingDown] = useState({
        product: false,
        userAuth: false
    })
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
            <div className='p-4 h-screen bg-white'>
                <ul className='flex flex-col divide-y'>
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
                <div className='md:hidden relative w-fit py-2'>
                    <div>
                        {jwt === undefined? 
                            <Button type={'fill'} size={'large'} label={'LOGIN'} onclick={() => navigate('/login')}/>
                            :
                            <div className='flex items-center bg-yellow-500 w-fit px-3 py-1 rounded-full'>
                                <p className='text-xl text-white font-bold'>{jwt.user.username}</p>
                                <button onClick={() => setSlidingDown({...slidingDown, userAuth: !slidingDown.userAuth})}>
                                    <Icon type={'chevron-down'} className={'h-6 w-6 text-white'}/>
                                </button>
                            </div>
                        }
                    </div>     
                    {
                    slidingDown.userAuth&&jwt !== undefined&&
                    <ul className='flex flex-col text-sm gap-4 absolute w-full'>
                        <li className='bg-white drop-shadow-xl w-full p-4 rounded-lg'>
                            <button className='text-start' onClick={() => navigate('/order-status')}>
                                <p>STATUS PESANAN</p>
                            </button>
                        </li>
                        <li className='bg-white drop-shadow-xl w-full p-4 rounded-lg'>
                            <button className='text-start' onClick={() => getLogout()}>
                                <p>LOGOUT</p>
                            </button>
                        </li>
                    </ul>
                    }    
                </div>
            </div>
        </div>
    </div>
  )
}

export default SlidingNavbar