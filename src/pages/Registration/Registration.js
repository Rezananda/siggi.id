import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'

const Registration = () => {
    const navigate = useNavigate()
    const [registration, setRegistration] = useState({
        userName: "",
        email:"",
        password:"",
        passwordConfirmation:""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const handleRegistration = () => {
        setLoading(true)
        try {
            if(registration.password === registration.passwordConfirmation){
                axios.post('https://calm-fjord-36326.herokuapp.com/api/auth/local/register', {
                    username: registration.userName,
                    email: registration.email,
                    password: registration.password
                }).then(response => {
                    navigate('/login')
                    setLoading(false)
                }).catch(error => {
                    setError(error.message)
                    setLoading(false)
                })
            }
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

  return (
    <div className='min-h-screen flex justify-center bg-gray-100 p-4 w-full'>
        <div className='bg-white w-full h-fit p-4 flex flex-col gap-4 shadow-md rounded'>
            {loading&&<p>Loading...</p>}
            {error&&<p>{error}</p>}
            <div className='border-gray-100'>
                <p>REGISTRASI</p>
            </div>
            <div className='border-b border-gray-200'></div>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col'>
                    <label>Username</label>
                    <input type={'text'} className='px-4 py-2 rounded bg-gray-50' name='userName' onChange={(e) => setRegistration({...registration, [e.target.name] : e.target.value})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Email</label>
                    <input type={'email'} className='px-4 py-2 rounded bg-gray-50' name='email' onChange={(e) => setRegistration({...registration, [e.target.name] : e.target.value})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input type={'password'} className='px-4 py-2 rounded bg-gray-50' name='password' onChange={(e) => setRegistration({...registration, [e.target.name] : e.target.value})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Konfirmasi Password</label>
                    <input type={'password'} className='px-4 py-2 rounded bg-gray-50' name='passwordConfirmation' onChange={(e) => setRegistration({...registration, [e.target.name] : e.target.value})}/>
                </div>
                <Button type={'fill'} size={'large'} label={'REGISTRASI'} onclick={() => handleRegistration()}/>
                <div className='flex items-center gap-1 justify-center'>
                    <button onClick={() => navigate('/registrastion')} className='text-blue-500 underline'>Login Disini</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Registration