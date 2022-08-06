import React from 'react'

const Typography = ({size, label, width}) => {
  return (
    <div className='relative'>
        <div className={`${width} h-3 bg-yellow-500 rounded-full`}></div>
        <p className={`text-${size} font-bold absolute z-20 w-full text-center -inset-y-3 inset-x-0 text-black`}>{label}</p>
  </div>
  )
}

export default Typography