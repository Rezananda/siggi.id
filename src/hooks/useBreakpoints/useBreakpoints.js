import { useEffect, useState } from 'react'

const useBreakpoints = () => {
    const [isDesktop, setIsDekstop] = useState(false)

    const getBreakpoints = () => {
      if (window.innerWidth > 720) {
        setIsDekstop(true)
      } else {
        setIsDekstop(false)
      }
    }
  
    useEffect(() => {
      getBreakpoints()
      return () => {
          getBreakpoints()
      }
    },[])
  return isDesktop
}

export default useBreakpoints