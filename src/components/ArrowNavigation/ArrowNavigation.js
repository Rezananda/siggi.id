import React from 'react'

const ArrowNavigation = ({prev, next}) => {
  return (
    <div>
        <style>
            {
            `.swiper-button-disabled {
                opacity: 0.5; 
            }`
            }
        </style>
        <button className={`${prev} absolute top-1/2 left-3 transform translate-x-0 -translate-y-1/2 z-20 drop-shadow-lg`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 text-siggi-hard bg-white rounded-full`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
        </button>
        <button className={`${next} absolute top-1/2 right-3 transform translate-x-0 -translate-y-1/2 z-20 drop-shadow-lg`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 text-siggi-hard bg-white rounded-full`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
  )
}

export default ArrowNavigation