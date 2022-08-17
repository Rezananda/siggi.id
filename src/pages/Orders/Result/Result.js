import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Icon from '../../../components/Icon/Icon'

const Result = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-white rounded-lg p-4 drop-shadow-md flex flex-col items-center'>
      <Icon type={'badge-check'} className={'h-24 w-24 text-green-500'}/>
      <p className='font-bold text-lg'>BERHASIL MENGIRIM PESANAN</p>
      <div className='flex flex-col w-full gap-2 mt-4'>
        <Button type={'outline'} label={'Lihat Status Pesanan'} size={'large'} onclick={() => navigate('/order-status')}/>
        <Button type={'outline'} label={'Kembali'} size={'large'} onclick={() => navigate('/')}/>
      </div>
    </div>
  )
}

export default Result