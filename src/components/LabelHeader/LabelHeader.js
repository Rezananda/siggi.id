import React from 'react'
import Icon from '../Icon/Icon'

const LabelHeader = ({label, onClick}) => {
  return (
    <div className='flex items-center justify-between p-2'>
        <p className='text-xl font-bold'>{label}</p>
        <button onClick={onClick} className='text-sm bg-siggi-hard text-white rounded-full px-2 py-1 flex items-center'>Lihat Semua <Icon type={'chevron-right'} className={'h-5 w-5 text-white'}/></button>
    </div>
  )
}

export default LabelHeader