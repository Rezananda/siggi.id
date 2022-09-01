import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardVoucher from '../../components/Card/CardVoucher'
import Footer from '../../components/Footer/Footer'
import TopNavbar from '../../components/Navbar/TopNavbar'
import Pagination from '../../components/Pagination/Pagination'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'

const Voucher = () => {
    const [voucher, setVoucher] = useState([])
    const [loading, setLoading] = useState(false)
    const [maxPage, setMaxPage] = useState()
    const [selectedPage, setSelectedPage] = useState(1)

    const handlePage = (page) => {
        if(page === 'prev'){
            setSelectedPage(selectedPage - 1)
        }else if(page === 'next'){
            setSelectedPage(selectedPage + 1)
        }
    }

    useEffect(()=> {
        setLoading(true)
        let isMounted = true
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/vouchers?&populate=*&pagination[page]=${selectedPage}&pagination[pageSize]=1`).then(response => {
            if(isMounted){
                setMaxPage(response.data.meta.pagination.pageCount)
                setVoucher(response.data.data)
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [selectedPage])

    useEffect(() => {
      window.scrollTo(0,0)
    }, [])
    
  return (
      <>
        <div className='min-h-screen bg-gray-50'>
            <TopNavbar label={'Vouchers'} route={-1}/>
            <div className='p-4'>
                {loading ? 
                <div>
                    <SpinnerLoading/>
                </div>
                :
                <div className='flex flex-col gap-4'>
                    {voucher.length > 0 ?              
                        <div className='flex flex-col gap-2'>
                            {voucher.map((val, index) => (
                                <CardVoucher key={index} val={val.attributes} id={val.id}/>
                            ))}
                        </div>
                        :
                        <p className='flex justify-center'>Belum Ada Voucher.</p>
                    }
                    <Pagination pageNumber={selectedPage} maxPage={maxPage} handlePage={handlePage}/>
                </div>
                }
            </div>
        </div>
        <Footer/>
      </>
  )
}

export default Voucher