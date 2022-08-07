import { useContext } from 'react'
import { JwtAuth } from '../../context/JwtContext'

const useLogout = () => {
    const {setJwt} = useContext(JwtAuth)
    
    const getLogout = () => {
        setJwt()
        localStorage.removeItem('jwtSiggi')
    }

  return [getLogout]
}

export default useLogout