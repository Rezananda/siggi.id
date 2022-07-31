import React from 'react'
import Icon from '../Icon/Icon'

const Search = () => {
  return (
    <div className='flex w-full justify-center px-4 py-4'>
        <div className='w-full flex items-center gap-1'>
            <input type={'text'} placeholder='Cari Produk Siggi' className='bg-gray-100 py-2 px-4 w-full rounded'/>
            <button className='px-2 py-2 bg-yellow-500 text-white rounded font-bold'>
                <Icon type={'search'} className={'h-6 w-6 text-white'}/>
            </button>
        </div>
    </div>
  )
}

export default Search