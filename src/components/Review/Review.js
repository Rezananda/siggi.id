import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading'

const Review = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let isMounted = true
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/reviews`).then(response => {
            if(isMounted){
                setReviews(response.data.data)
                setLoading(false)
            }
        }).catch(err=>{
            console.log(err)
            setLoading(false)
    })
    
      return () => {
        isMounted = false
      }
    }, [])
    
  return (
    <div className='p-4 w-full'>
        <style>
          {
          `.scrollable::-webkit-scrollbar {
              display: none;
          }`
          }
        </style>
        <div className='flex items-center'>
            <p className='text-xl font-bold'>TESTIMONI</p>
        </div>
        {loading? 
        <div>
          <SpinnerLoading/>
        </div>
        :
        <div className='flex overflow-x-auto scrollable'>
          {reviews.map((val, index) => (
            <div className='mb-4 px-2' key={index}>
              <div className='flex flex-col w-full p-4 rounded-lg shadow-lg h-fit bg-white'>
                  <p className='font-bold truncate'>{val.attributes.name}</p>
                  <div className='flex items-center relative'>             
                    {Array.from(Array(5), (val, index) => (
                      <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <div className='flex items-center absolute z-10'>
                      {Array.from(Array(val.attributes.rating), (val, index) => (
                        <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className='text-gray-500 text-sm'>{val.attributes.description}</p>
              </div>
            </div>
            ))}
        </div>
        }
    </div>
  )
}

export default Review