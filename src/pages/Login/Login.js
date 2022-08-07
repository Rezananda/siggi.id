import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Icon from '../../components/Icon/Icon'
import { JwtAuth } from '../../context/JwtContext'

const Login = () => {
    const navigate = useNavigate()
    const {setJwt} = useContext(JwtAuth)
    const location = useLocation()
    const [login, setLogin] = useState({
        email:"",
        password:""
    })
    const [loading, setLoading] = useState(false)
    const handleLogin = () => {
        setLoading(true)
        try {
            axios.post('https://calm-fjord-36326.herokuapp.com/api/auth/local',{
                identifier:login.email,
                password:login.password
            }).then(response => {
                localStorage.setItem('jwtSiggi', JSON.stringify(response.data))
                setJwt(response.data)
                navigate(location.state === null ? '/' : location.state.prevLoc.pathname)
                setLoading(false)
            }).catch(error => {
                console.log(error.message)
                setLoading(false)
            })
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        }
    }
  return (
    <div className='min-h-screen flex justify-center bg-gray-100 p-4 w-full'>
        <div className='bg-white w-full h-fit p-4 flex flex-col gap-4 shadow-md rounded'>
            {loading&&<p>Loading...</p>}
            <div className='border-gray-100 flex items-center gap-1'>
                <button onClick={() => navigate('/')}>
                    <Icon type={'arrow-back'} className={'text-yellow-500 h-7 w-7'}/>
                </button>
                <p className='text-xl font-bold text-yellow-500'>LOGIN</p>
            </div>
            <div className='border-b border-gray-200'></div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col'>
                    <label>Email</label>
                    <input type={'email'} className='px-4 py-2 rounded bg-gray-50' placeholder='Email' name='email' onChange={(e) => setLogin({...login, [e.target.name]: e.target.value})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input type={'password'} className='px-4 py-2 rounded bg-gray-50' placeholder='Password' name='password' onChange={(e) => setLogin({...login, [e.target.name]: e.target.value})}/>
                </div>
                <Button type={'fill'} size={'large'} label={'LOGIN'} onclick={() => handleLogin()}/>
                <div className='flex items-center gap-1 justify-center'>
                    <p>Belum punya akun? Registrasi </p><button onClick={() => navigate('/registrastion')} className='text-blue-500 underline'>disini</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login