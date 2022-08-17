import Cookies from 'js-cookie'
import React, { createContext, useEffect, useState } from 'react'

export const JwtAuth = createContext()

const JwtContext = ({children}) => {
    const[jwt, setJwt] = useState()
    const theJwt = JSON.parse(Cookies.get('user') || "{}")
    
    useEffect(() => {
        let isMounted = true
        if(isMounted){
            if(Object.keys(theJwt).length > 0){
                setJwt(theJwt)
            }else{
                setJwt()
            }
        }
        return () => {
            isMounted = false
        }
    }, [])
    
  return (
  <JwtAuth.Provider value={{jwt, setJwt}}>
      {children}
  </JwtAuth.Provider>)
}

export default JwtContext