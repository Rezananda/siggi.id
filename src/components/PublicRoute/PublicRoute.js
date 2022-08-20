import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { JwtAuth } from '../../context/JwtContext'

const PublicRoute = () => {
  const {jwt} = useContext(JwtAuth)
    if(jwt){
        return <Navigate to={'/'}/>
    }
  return <Outlet/>
}

export default PublicRoute