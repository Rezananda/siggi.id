import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Category = () => {
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let isMounted = true
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/categories?populate=*`).
        then(response => {
            if(isMounted){
                setCategory(response.data.data)
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
        
        return () => {
            isMounted = false
        }
    }, [])
    
  return (
    <div className='p-4'>
        <div className='flex items-center'>
            <p className='text-xl font-bold'>KATEGORI</p>
        </div>
        {loading ? 
        <p>Loading...</p>
        :
        <div className='grid grid-cols-2 gap-4'>
            {category.map((val, index) => (
                <div className='relative' key={index}>
                    <img className='flex overflow-hidden rounded-lg drop-shadow-lg brightness-50' src={'http://localhost:1337/'.includes(process.env.REACT_APP_BASE_URL) ?`${process.env.REACT_APP_BASE_URL}${val.attributes.image.data.attributes.url}` : `${val.attributes.image.data.attributes.url}`} alt={val.attributes.image.data.attributes.name}/>
                    <p className='text-white font-bold text-lg uppercase text-center drop-shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{val.attributes.name}</p>
                </div>
            ))}
        </div>
        }
    </div>
  )
}

export default Category