import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from '../../context/UserContext'

const PublicRoute = () => {
    const userAuth = useContext(UserAuth)
    if(userAuth.jwt){
        return <Navigate to={'/'}/>
    }
  return <Outlet/>
}

export default PublicRoute