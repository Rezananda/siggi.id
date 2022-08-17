import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
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
        info: false,
        userAuth: false
    })
    
  return (
    <div>
        {slideNavbar&&<div className='h-screen fixed top-0 bottom-0 left-0 right-0 z-30 bg-black opacity-50' onClick={() => setSlideNavbar(false)}></div>}
        <div className={`transform top-0 left-0 w-4/6 md:w-3/12 fixed ease-in-out transition-all duration-300 z-30 ${slideNavbar ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className='p-4 w-full h-screen bg-white'>
                <button className='w-full flex justify-end' onClick={() => setSlideNavbar(false)}>
                    <Icon type={'close'} className={'h-8 w-8 text-black'}/>
                </button>
                <ul className='flex flex-col gap-4'>
                    <li className='flex flex-col'>
                        <div className='flex items-center gap-2'>
                            <p className='text-lg'>PRODUK</p>
                            <button onClick={() => setSlidingDown({...slidingDown, product: !slidingDown.product})}>
                                {slidingDown.product ? 
                                <Icon type={'chevron-up'} className={'h-6 w-6 text-black'}/>
                                :
                                <Icon type={'chevron-down'} className={'h-6 w-6 text-black'}/>
                                }
                            </button>
                        </div>
                        {
                            slidingDown.product&&
                            <ul className='flex flex-col ml-4 text-sm gap-4'>
                                <li>
                                    <button>SEMUA PRODUK</button>
                                </li>
                                <li>
                                    <button>PERABOTAN RUMAH TANGGA</button>
                                </li>
                                <li>
                                    <button>SENDOK & GARPU</button>
                                </li>
                            </ul>
                        }
                    </li>
                    <li>
                        <p className='text-lg'>PESANAN SAYA</p>
                    </li>
                    <li>
                        <div className='flex items-center gap-2'>
                            <p className='text-lg'>INFO</p>
                            <button onClick={() => setSlidingDown({...slidingDown, info: !slidingDown.info})}>
                                {slidingDown.info ? 
                                <Icon type={'chevron-up'} className={'h-6 w-6 text-black'}/>
                                :
                                <Icon type={'chevron-down'} className={'h-6 w-6 text-black'}/>
                                }
                            </button>
                        </div>
                        {
                            slidingDown.info&&
                            <ul className='flex flex-col ml-4 text-sm gap-4'>
                                <li>
                                    <button className='text-start'>
                                        <p>TENTANG</p>
                                    </button>
                                </li>
                                <li>
                                    <button className='text-start'>
                                        <p>KEBIJAKAN PENGEMBALIAN PRODUK</p>
                                    </button>
                                </li>
                                <li>
                                    <button className='text-start'>
                                        <p>SYARAT & KETENTUAN</p>
                                    </button>
                                </li>
                            </ul>
                        }
                    </li>
                    <li className='md:hidden'>
                        <div>
                            {jwt === undefined? 
                                <Button type={'fill'} size={'large'} label={'LOGIN'} onclick={() => navigate('/login')}/>
                                :
                                <div className='flex items-center'>
                                    <Icon type={'user'} className={'h-8 w-8 text-gray-500'}/>
                                    <p className='text-xl'>{jwt.user.username}</p>
                                    <button onClick={() => setSlidingDown({...slidingDown, userAuth: !slidingDown.userAuth})}>
                                        {slidingDown.userAuth ? 
                                        <Icon type={'chevron-up'} className={'h-6 w-6 text-black'}/>
                                        :
                                        <Icon type={'chevron-down'} className={'h-6 w-6 text-black'}/>
                                        }
                                    </button>
                                </div>
                            }
                        </div>     
                        {
                            slidingDown.userAuth&&jwt !== undefined&&
                            <ul className='flex flex-col ml-4 text-sm gap-4'>
                                <li>
                                    <button className='text-start' onClick={() => navigate('/order-status')}>
                                        <p>STATUS PESANAN</p>
                                    </button>
                                </li>
                                <li>
                                    <button className='text-start' onClick={() => getLogout()}>
                                        <p>LOGOUT</p>
                                    </button>
                                </li>
                            </ul>
                        }    
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SlidingNavbar