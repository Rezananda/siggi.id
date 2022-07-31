import React from 'react'
import piring1 from '../../assets/img/piringkorea1.jpeg'

const Category = () => {
  return (
    <div className='bg-yellow-50 py-4'>
        <div className='px-4'>
            <p className='text-xl font-bold'>-Ketegori-</p>
        </div>
        <div className='grid grid-cols-2 px-4 gap-4'>
            <div className='w-full h-full drop-shadow-lg'>
                <img src={piring1} alt='piring1'/>
            </div>
            <div className='w-full h-full drop-shadow-lg'>
                <img src={piring1} alt='piring1'/>
            </div>
            <div className='w-full h-full drop-shadow-lg'>
                <img src={piring1} alt='piring1'/>
            </div>
            <div className='w-full h-full drop-shadow-lg'>
                <img src={piring1} alt='piring1'/>
            </div>
            <div className='w-full h-full drop-shadow-lg'>
                <img src={piring1} alt='piring1'/>
            </div>
            <div className='w-full h-full drop-shadow-lg'>
                <img src={piring1} alt='piring1'/>
            </div>
        </div>
    </div>
  )
}

export default Category