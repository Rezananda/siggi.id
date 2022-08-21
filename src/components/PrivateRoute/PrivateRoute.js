import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = () => {
    const prevLoc = useLocation()
    const theJwt = JSON.parse(Cookies.get('user') || "{}" )
    if(Object.keys(theJwt).length === 0){
        return <Navigate to={ '/login'} state={{prevLoc:prevLoc}}/>
    }
    return <Outlet/>
}

export default PrivateRoute