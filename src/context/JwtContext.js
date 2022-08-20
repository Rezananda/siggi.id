import Cookies from 'js-cookie'
import React, { createContext, useEffect, useState } from 'react'

export const JwtAuth = createContext()

const JwtContext = ({children}) => {
    const[jwt, setJwt] = useState()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        const theJwt = JSON.parse(Cookies.get('user') || "{}")
        let isMounted = true
        if(isMounted){
            if(Object.keys(theJwt).length > 0){
                setJwt(theJwt)
                setLoading(false)
            }else{
                setJwt()
                setLoading(false)
            }
        }
        return () => {
            isMounted = false
        }
    }, [])

    if(loading){
        return <p>Loading...</p>
    }
    
  return (
  <JwtAuth.Provider value={{jwt, setJwt}}>
      {children}
  </JwtAuth.Provider>)
}

export default JwtContext