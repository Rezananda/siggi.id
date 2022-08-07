import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { JwtAuth } from '../../context/JwtContext'

const PrivateRoute = () => {
    const {jwt} = useContext(JwtAuth)
    const prevLoc = useLocation()
    if(!jwt){
        return <Navigate to={ '/login'} state={{prevLoc:prevLoc}}/>
    }
    return <Outlet/>
}

export default PrivateRoute