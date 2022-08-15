import React from 'react'
import useGetCurrency from '../../../hooks/useGetCurrency/useGetCurrency';

const Input = ({setAddress, address, provinces, loadingProvince, getCity, city, loadingCity, getDistrict, district, loadingDistrict, getVillage, village, loadingVillage, cart}) => {
  const getCurrency = useGetCurrency()
  return (
    <>
      <div className='bg-white rounded-lg p-4 drop-shadow-md'>
          <p className='font-bold text-lg mb-2'>DATA PESANAN</p>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Nama Lengkap</label>
              <input type={'text'} className='px-4 py-2 bg-gray-50 rounded' placeholder='Nama Lengkap' onChange={(e) => setAddress({...address, name: e.target.value})}/>
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Nomor Handphone</label>
              <input type={'number'} className='px-4 py-2 bg-gray-50 rounded' placeholder='Nomor Handphone' onChange={(e) => setAddress({...address, phoneNumber: e.target.value})}/>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Alamat</label>
              <textarea placeholder='Alamat' className='bg-gray-50 px-4 py-2' onChange={(e) => setAddress({...address, fullAddress: e.target.value})}/>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-bold'>Provinsi</label>
              <select onChange={(e) => {setAddress({...address, province_id: e.target.value, province: e.target.childNodes[e.target.selectedIndex].getAttribute("name")}); getCity(e.target.value);}} className='w-full px-4 py-2 bg-gray-50 rounded'>
                <option defaultValue={'DEFAULT'}>{loadingProvince? 'Loading...' : 'Pilih Provinsi'}</option>
                {provinces.map((val, index) => 
                <option key={index} value={val.id} name={val.name}>{val.name}</option>
                )}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
            <label className='font-bold'>Kabupaten/Kota</label>
              <select onChange={(e) => {setAddress({...address, city_id: e.target.value, city_name: e.target.childNodes[e.target.selectedIndex].getAttribute("name")}); getDistrict(e.target.value)}} className='w-full px-4 py-2 bg-gray-50 rounded'>
                <option defaultValue={'DEFAULT'}>{loadingCity? 'Loading...' : 'Pilih Kabupaten/Kota'}</option>
                {city.map((val, index) => 
                <option key={index} value={val.id} name={val.name}>{val.name}</option>
                )}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
            <label className='font-bold'>Kecamatan</label>
              <select onChange={(e) => {setAddress({...address, district_id: e.target.value, district_name: e.target.childNodes[e.target.selectedIndex].getAttribute("name")}); getVillage(e.target.value)}} className='w-full px-4 py-2 bg-gray-50 rounded'>
                <option defaultValue={'DEFAULT'}>{loadingDistrict? 'Loading...' : 'Pilih Kecamatan'}</option>
                {district.map((val, index) => 
                <option key={index} value={val.id} name={val.name}>{val.name}</option>
                )}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
            <label className='font-bold'>Kelurahan</label>
              <select onChange={(e) => {setAddress({...address, village_id: e.target.value, village_name: e.target.childNodes[e.target.selectedIndex].getAttribute("name")});}} className='w-full px-4 py-2 bg-gray-50 rounded'>
                <option defaultValue={'DEFAULT'}>{loadingVillage? 'Loading...' : 'Pilih Kelurahan'}</option>
                {village.map((val, index) => 
                <option key={index} value={val.id} name={val.name}>{val.name}</option>
                )}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Kode Pos</label>
              <input type={'number'} className='px-4 py-2 bg-gray-50 rounded' placeholder='Kode Pos' onChange={(e) => setAddress({...address, postCode: e.target.value})}/>
            </div>

          </div>
      </div>
        
      <div className='bg-white rounded-lg p-4 drop-shadow-md mb-48'>
        <p className='font-bold text-lg mb-2'>DETAIL TRANSAKSI</p>
        <div className='flex flex-col divide-y'>
          {cart.map((val, index) =>
            <div className='flex w-full items-center p-1 gap-2' key={index}>
              <div className='w-2/12 overflow-hidden rounded'>
                <img src={`${process.env.REACT_APP_BASE_URL}${val.image}`} alt={val.variant_name}></img>
              </div>
              <div className='w-8/12 truncate'>
                <p className='truncate'>{val.name}</p>
                <div className='text-sm bg-yellow-100 text-yellow-500 border border-yellow-500 rounded w-fit px-1'>{val.variant_name}</div>
                {val.is_discount_variant ?
                    <div className='flex flex-col'>
                        <p className='font-bold text-sm text-red-500'>{getCurrency(val.variant_price_final)}</p>
                        <p className='text-gray-400 text-xs line-through'>{getCurrency(val.variant_price)}</p>
                    </div>
                    :
                    <div className='flex items-center gap-2'>
                        <p className='font-bold text-center text-sm'>{getCurrency(val.variant_price)}</p>
                    </div>
                    }
              </div>
              <div className='w-2/12 flex items-center justify-center'>
                <p>x{val.qty}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Input