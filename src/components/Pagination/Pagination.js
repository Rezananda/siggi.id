import React from 'react'
import Icon from '../Icon/Icon'

const Pagination = ({pageNumber, maxPage, handlePage}) => {
  return (
    <div className='flex items-center w-full justify-between'>
        <p>{`Halaman ${pageNumber} dari ${maxPage}`}</p>
        <div className='flex items-center gap-2'>
            <button className={`px-2 rounded-md ${pageNumber === 1? 'bg-yellow-300' : 'bg-yellow-500'}`} onClick={() => handlePage('prev')} disabled={pageNumber === 1}>
                <Icon type={'chevron-left'} className={`h-8 w-8 ${pageNumber === 1? 'text-gray-300' : 'text-white'}`}/>
            </button>
            <button className={`px-2 rounded-md ${pageNumber === maxPage? 'bg-yellow-300' : 'bg-yellow-500'}`} onClick={() => handlePage('next')} disabled={pageNumber === maxPage}>
                <Icon type={'chevron-right'} className={`h-8 w-8 ${pageNumber === maxPage? 'text-gray-300' : 'text-white'}`}/>
            </button>
        </div>
    </div>
  )
}

export default Pagination