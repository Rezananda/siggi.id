import React from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon/Icon'

const Search = () => {
  const navigate = useNavigate()
  return (
    <div className='flex w-full justify-center px-4 py-4'>
        <div className='w-full flex items-center gap-1'>
          <div className='relative w-full'>
            <input type={'text'} onFocus={() => navigate('/search')} placeholder='Cari Produk Siggi' className='bg-gray-100 border border-gray-200 py-2 px-4 w-full rounded'/>
            <Icon type={'search'} className={'h-6 w-6 text-gray-300 absolute z-10 bottom-2 right-2'}/>
          </div>
        </div>
    </div>
  )
}

export default Search