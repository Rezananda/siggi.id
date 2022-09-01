import React, { useEffect } from 'react'
import Icon from '../Icon/Icon'

const Alerts = ({type, message, handleClose}) => {

    useEffect(() => {
      const timer = setTimeout(() => {
          handleClose()
      }, 3000)
    
      return () => {
        clearTimeout(timer)
      }
    }, [])

  return (
    <div className='absolute top-0 left-0 right-0 z-50 p-4'>
        {type === 'success'? 
        <div className='flex items-center p-4 rounded-lg border border-green-500 bg-green-100 justify-between'>
            <div className='flex items-center gap-2'>
                <Icon type={`badge-check`} className={`h-8 w-8 text-green-500`}/>
                <p className='text-green font-bold text-green-500'>{message}</p>
            </div>
            <button onClick={handleClose}>
                <Icon type={`close`} className={`h-6 w-6 text-gray-500`}/>
            </button>
        </div>
        :
        type === 'warning' ?
        <div className='flex items-center p-4 rounded-lg border border-red-500 bg-red-100 justify-between'>
            <div className='flex items-center gap-2'>
                <Icon type={`warning`} className={`h-8 w-8 text-red-500`}/>
                <p className='text-green font-bold text-red-500'>{message}</p>
            </div>
            <button onClick={handleClose}>
                <Icon type={`close`} className={`h-6 w-6 text-gray-500`}/>
            </button>
        </div>
        :
        ''
        }
    </div>
  )
}

export default Alerts