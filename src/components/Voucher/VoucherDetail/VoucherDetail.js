import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Icon from '../../Icon/Icon'
import TopNavbar from '../../Navbar/TopNavbar'

const VoucherDetail = () => {
    const {id} = useParams()
    const [voucher, setVoucher] = useState({
        attributes:{
            name:"",
            voucher_code:"",
            description:"",
            end_date:""
        }
    })
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)

    const copyText = () => {
        navigator.clipboard.writeText(voucher.attributes.voucher_code)
        setAlert(true)
    }

    useEffect(() => {
      let isMounted = true
      setLoading(true)
      axios.get(`http://localhost:1337/api/vouchers/${id}`).then(response => {
          if(isMounted){
              setVoucher(response.data.data)
              setLoading(false)
          }
      }).catch(err => {
          console.log(err)
          setLoading(false)
      })
    
      return () => {
        isMounted = false
      }
    }, [id])

    if(loading){
        return <p>Loading...</p>
    }

  return (
    <div className='min-h-screen bg-gray-50'>
        <TopNavbar label={'Detail Voucher'} route={'/'}/>
        <div className='p-4 flex flex-col gap-4'>
            <div className='bg-white rounded-lg p-4 drop-shadow-md'>
                <p className='font-bold text-lg mb-2'>{voucher.attributes.name}</p>
                <p className='text-sm text-gray-500'>{`Berakhir pada ${new Date(voucher.attributes.end_date).toLocaleDateString('en-GB')}`}</p>
                <p>{voucher.attributes.description}</p>
                <div>
                    <div className={`bg-gray-50 border rounded p-2 flex items-center justify-between ${alert? `border-green-500` : `border-gray-200`}`}>
                        <p className='text-xl text-gray-500 font-bold'>{voucher.attributes.voucher_code}</p>
                        <Icon type={'copy'} className={'h-8 w-8 text-gray-300'} onclick={() => copyText()}/>
                    </div>
                    {alert&&<p className='text-green-500 text-sm'>Tersalin!</p>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default VoucherDetail