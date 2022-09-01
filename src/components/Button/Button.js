import React from 'react'

const Button = ({type, size, onclick, label}) => {
  return (
<>
    <button className={`
    ${
        type === 'fill'?
            'text-white bg-siggi-hard border border-siggi-hard px-3 py-1 font-bold w-full rounded-full'
        :
        type === 'outline'? 
            'text-siggi-hard bg-white border border-siggi-hard px-3 py-1 font-bold w-full rounded-full'
        :
        type === 'link' ?
            'text-blue-500 underline'
        :
        type === 'disable'?
            'text-white bg-orange-100 border border-orange-100 px-3 py-1 font-bold w-full rounded-full'
        :
            ''
    }

    ${
        size === 'small'?
            'text-sm'
        :
        size === 'medium'?
            'text-base'
        :
        size === 'large'?
            'text-lg'
        :
        size === 'extra-small'?
            'text-xs'
        :
            ''
    }

    `} onClick={onclick}>
        {label}
    </button>
</>
  )
}

export default Button