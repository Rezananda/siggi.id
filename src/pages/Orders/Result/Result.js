import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Icon from '../../../components/Icon/Icon'

const Result = ({order}) => {
  const navigate = useNavigate()
  const [alert, setAlert] = useState(false)
  const copyText = () => {
    navigator.clipboard.writeText(order.attributes.transaction_id)
    setAlert(true)
  }

  return (
    <div className='bg-white rounded-lg p-4 drop-shadow-md flex flex-col items-center'>
      <Icon type={'badge-check'} className={'h-24 w-24 text-green-500'}/>
      <p className='font-bold text-lg'>BERHASIL MENGIRIM PESANAN</p>
      <div className='bg-siggi-soft p-2 rounded border-l-4 border-siggi-hard flex flex-col gap-2'>
        <p className='text-siggi-hard'>Cek status pesananmu via Kode Pesanan di bawah.</p>
        <div>
        <div className={`bg-gray-50 border rounded p-2 flex items-center justify-between ${alert? `border-green-500` : `border-gray-200`}`}>
          <p className='text-gray-500'>{order.attributes.transaction_id}</p>
          <Icon type={'copy'} className={'h-8 w-8 text-gray-300'} onclick={() => copyText()}/>
          </div>
          {alert&&<p className='text-green-500 text-sm'>Tersalin!</p>}
        </div>
      </div>
      <div className='flex flex-col w-full gap-2 mt-4'>
        <Button type={'outline'} label={'Lihat Status Pesanan'} size={'large'} onclick={() => navigate('/order-status')}/>
        <Button type={'outline'} label={'Kembali'} size={'large'} onclick={() => navigate('/')}/>
      </div>
    </div>
  )
}

export default Result