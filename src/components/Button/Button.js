import React from 'react'

const Button = ({type, size, onclick, label}) => {
  return (
<>
    <button className={`
    ${
        type === 'fill'?
            'text-white bg-yellow-500 border border-yellow-500 px-3 py-1 font-bold w-full rounded-full'
        :
        type === 'outline'? 
            'text-yellow-500 bg-white border border-yellow-500 px-3 py-1 font-bold w-full rounded-full'
        :
        type === 'link' ?
            'text-blue-500 underline'
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