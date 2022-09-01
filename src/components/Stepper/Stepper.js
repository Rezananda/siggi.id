import React from 'react'

const Stepper = ({step}) => {
  return (
    <div className='flex items-center mb-8'>
        <div className='relative flex flex-col justify-center items-center'>
          <div className={`flex items-center justify-center rounded-full h-8 w-8 ${step === 1 || step === 2 || step === 3 ? 'bg-orange-100 border border-siggi-hard' : 'bg-gray-300'} `}>
              <p className='text-siggi-hard font-bold'>1</p>
          </div>        
          <p className={`absolute mt-16 text-xs text-center ${step === 1 || step === 2 || step === 3 ? 'text-siggi-hard' : 'text-gray-500'}`}>Data Pesanan</p>
        </div>

        <div className='flex-auto border-t border-siggi-hard'></div>

        <div className='relative flex flex-col justify-center items-center'>
          <div className={`flex items-center justify-center rounded-full h-8 w-8 ${step === 2 || step === 3 ? ' bg-orange-100 border border-siggi-hard' : 'bg-gray-300'} `}>
              <p className={`font-bold ${step === 2 || step === 3 ? 'text-siggi-hard' : 'text-gray-500'}`}>2</p>
          </div>
          <p className={`absolute mt-16 text-xs text-center ${step === 2 || step === 3 ? 'text-siggi-hard' : 'text-gray-500'}`}>Konfirmasi Pesanan</p>
        </div>

        <div className={`flex-auto border-t ${step === 2 || step === 3 ? 'border-siggi-hard' : 'border-gray-300'}`}></div>

        <div className='relative flex flex-col justify-center items-center'>
          <div className={`flex items-center justify-center rounded-full h-8 w-8 ${step === 3 ? ' bg-orange-100 border border-siggi-hard' : 'bg-gray-300'} `}>
              <p className={`font-bold ${step === 3 ? 'text-siggi-hard' : 'text-gray-500'}`}>3</p>
          </div>
          <p className={`absolute mt-16 text-xs text-center ${step === 3 ? 'text-siggi-hard' : 'text-gray-500'}`}>Kirim Pesanan</p>
        </div>
    </div>
  )
}

export default Stepper