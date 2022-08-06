import React from 'react'

const useGetCurrency = () => {
    const getCurrency = (val) => {
        const result = parseInt(val).toLocaleString('id', { style: 'currency', currency: 'IDR' })
        return result
      }
  return getCurrency
}

export default useGetCurrency