import React, { createContext, useEffect, useState } from 'react'

export const JwtAuth = createContext()

const JwtContext = ({children}) => {
    const[jwt, setJwt] = useState()
    
    useEffect(() => {
        const theJwt = JSON.parse(localStorage.getItem('jwtSiggi'))
        if(theJwt){
            setJwt(theJwt)
        }else{
            setJwt()
        }
    }, [])
    
  return (
  <JwtAuth.Provider value={{jwt, setJwt}}>
      {children}
  </JwtAuth.Provider>)
}

export default JwtContext