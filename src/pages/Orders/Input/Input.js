import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alerts from '../../../components/Alerts/Alerts';
import Icon from '../../../components/Icon/Icon';
import { getAddress } from '../../../context/CartContext';
import useGetCurrency from '../../../hooks/useGetCurrency/useGetCurrency';

const Input = ({setAddress, address, provinces, loadingProvince, getCity, city, loadingCity, getDistrict, district, loadingDistrict, getVillage, village, loadingVillage, cart, handlCheckVoucher, voucher, setVocher, alert, setAlert}) => {
  const getCurrency = useGetCurrency()
  const [getVoucher, setGetVoucher] = useState()
  const [expand, setExpand] = useState({
    transactionDetails: false,
    orderDetails: true,
    voucherDetails: true
  })
  const navigate = useNavigate()

  return (
    <>
      <div>
        <button className={`flex items-center justify-between w-full px-4 py-2 ${expand.transactionDetails ? 'rounded-t-md' : 'rounded-md' } bg-white shadow-md`} onClick={() => setExpand({...expand, transactionDetails: !expand.transactionDetails})}>
          <p className='font-bold text-lg'>DETAIL TRANSAKSI</p>
          {
            expand.transactionDetails?
            <Icon type={`chevron-up`} className={`h-7 w-7 text-gray-500`}/>
            :
            <Icon type={`chevron-down`} className={`h-7 w-7 text-gray-500`}/>

          }
        </button>
        {expand.transactionDetails?        
        <div className='bg-white p-4 shadow-md rounded-b-md border-t border-gray-100'>
          <div className='flex flex-col divide-y'>
            {cart.map((val, index) =>
              <div className='flex w-full items-center p-1 gap-2' key={index}>
                <div className='w-2/12 overflow-hidden rounded'>
                  <img src={'http://localhost:1337/'.includes(process.env.REACT_APP_BASE_URL) ?`${process.env.REACT_APP_BASE_URL}${val.image}` : `${val.image}`} alt={val.variant_name}></img>
                </div>
                <div className='w-8/12 truncate'>
                  <p className='truncate'>{val.name}</p>
                  <div className='text-sm bg-siggi-soft text-siggi-hard border border-siggi-hard rounded w-fit px-1'>{val.variant_name}</div>
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
        :
        ''
        }
      </div>

      <div>
        <button className={`flex items-center justify-between w-full px-4 py-2 ${expand.voucherDetails ? 'rounded-t-md' : 'rounded-md' } bg-white shadow-md`} onClick={() => setExpand({...expand, voucherDetails: !expand.voucherDetails})}>
          <p className='font-bold text-lg'>VOUCHER</p>
          {
            expand.voucherDetails?
            <Icon type={`chevron-up`} className={`h-7 w-7 text-gray-500`}/>
            :
            <Icon type={`chevron-down`} className={`h-7 w-7 text-gray-500`}/>

          }
        </button>
        {expand.voucherDetails?
          <div className='bg-white p-4 flex flex-col gap-2 shadow-md rounded-b-md border-t border-gray-100'>
            <div className='flex items-center justify-between'>
              {voucher.length === 1&&<button className='w-full flex justify-end text-blue-500 underline' onClick={() => setVocher([])}>Hapus</button>}
            </div>
            <div>
              {voucher.length === 1&&
              <>
                <div className='bg-siggi-soft border border-siggi-hard text-siggi-hard px-4 py-2 rounded-lg text-lg'>
                  {voucher[0].attributes.name}
                </div>
                {alert&&<Alerts type={`success`} message={`Berhasil Menambah Voucher`} handleClose={() => setAlert(false)}/>}
              </>
              }
              {voucher.length === 0&& 
              <div className='flex flex-col gap-2'>
                <div className='flex items-center w-full gap-1'>
                  <input type={'text'} className='px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 w-full' onChange={(e) => setGetVoucher(e.target.value)} placeholder='Masukkan Kode Voucher'/>
                  <button className='bg-siggi-hard border border-siggi-hard rounded-lg px-4 py-3 text-white' onClick={() => handlCheckVoucher(getVoucher)}>Tambah</button>
                </div>
                <div className='flex w-full justify-end'>
                  <button className='text-blue-500 underline' onClick={() => navigate('/vouchers')}>Lihat Voucher</button>
                </div>
              </div>
              }
              {voucher === 'not found'&&
              <div className='flex flex-col gap-2'>
                {alert&&<Alerts type={'warning'} message={`Voucher Tidak Ditemukan!.`} handleClose={() => setAlert(false)}/>}
                <div className='flex items-center w-full gap-1'>
                  <input type={'text'} className='px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 w-full' onChange={(e) => setGetVoucher(e.target.value)} placeholder='Masukkan Kode Voucher'/>
                  <button className='bg-siggi-hard border border-siggi-hard rounded-lg px-4 py-3 text-white' onClick={() => handlCheckVoucher(getVoucher)}>Tambah</button>
                </div>
                <div className='flex w-full justify-end'>
                  <button className='text-blue-500 underline' onClick={() => navigate('/vouchers')}>Lihat Voucher</button>
                </div>
              </div>
              }
            </div>
          </div>
          :
          ''
        }
      </div>

      <div>
        <button className={`flex items-center justify-between w-full px-4 py-2 ${expand.orderDetails ? 'rounded-t-md' : 'rounded-md' } bg-white shadow-md`} onClick={() => setExpand({...expand, orderDetails: !expand.orderDetails})}>
          <p className='font-bold text-lg'>DATA PESANAN</p>
          {
            expand.orderDetails?
            <Icon type={`chevron-up`} className={`h-7 w-7 text-gray-500`}/>
            :
            <Icon type={`chevron-down`} className={`h-7 w-7 text-gray-500`}/>

          }
        </button>

        {expand.orderDetails ?        
        <div className='bg-white shadow-md rounded-b-md border-t border-gray-100 p-4 mb-48 '>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Nama Lengkap*</label>
              <input type={'text'} className='px-4 py-2 bg-gray-50 rounded-lg border border-gray-200' placeholder='Nama Lengkap' onChange={(e) => setAddress({...address, name: e.target.value})} value={Object.keys(getAddress()).length === 0 ? undefined : address.name}/>
            </div>
            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Email*</label>
              <input type={`email`} className='px-4 py-2 bg-gray-50 rounded-lg border border-gray-200' placeholder='Email' onChange={(e) => setAddress({...address, email: e.target.value})} value={Object.keys(getAddress()).length === 0 ? undefined : address.email}/>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Nomor Handphone*</label>
              <input type={'number'} className='px-4 py-2 bg-gray-50 rounded-lg border border-gray-200' placeholder='Nomor Handphone' onChange={(e) => setAddress({...address, phoneNumber: e.target.value})} value={Object.keys(getAddress()).length === 0 ? undefined : address.phoneNumber}/>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Alamat*</label>
              <textarea placeholder='Alamat' className='bg-gray-50 px-4 py-2 rounded-lg border border-gray-200' onChange={(e) => setAddress({...address, fullAddress: e.target.value})} defaultValue={Object.keys(getAddress()).length === 0 ? undefined : address.fullAddress}/>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-bold'>Provinsi*</label>
              <select onChange={(e) => {setAddress({...address, province_id: e.target.value, province: e.target.childNodes[e.target.selectedIndex].getAttribute("name")}); getCity(e.target.value);}} className='w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200'>
                {Object.keys(getAddress()).length === 0 ? 
                  <option defaultValue={'DEFAULT'}>{loadingProvince? 'Loading...' : 'Pilih Provinsi'}</option>
                : 
                  <option defaultValue={address.province}>{address.province}</option>
                }
                {provinces.map((val, index) => 
                <option key={index} value={val.id} name={val.name}>{val.name}</option>
                )}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
            <label className='font-bold'>Kabupaten/Kota*</label>
              <select onChange={(e) => {setAddress({...address, city_id: e.target.value, city_name: e.target.childNodes[e.target.selectedIndex].getAttribute("name")}); getDistrict(e.target.value)}} className='w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200'>
                {Object.keys(getAddress()).length === 0 ? 
                  <option defaultValue={'DEFAULT'}>{loadingCity? 'Loading...' : 'Pilih Kabupaten/Kota'}</option>
                : 
                  <option defaultValue={address.city_name}>{address.city_name}</option>
                }
                {city.map((val, index) => 
                <option key={index} value={val.id} name={val.name}>{val.name}</option>
                )}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
            <label className='font-bold'>Kecamatan*</label>
              <select onChange={(e) => {setAddress({...address, district_id: e.target.value, district_name: e.target.childNodes[e.target.selectedIndex].getAttribute("name")}); getVillage(e.target.value)}} className='w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200'>
                {Object.keys(getAddress()).length === 0 ? 
                  <option defaultValue={'DEFAULT'}>{loadingDistrict? 'Loading...' : 'Pilih Kecamatan'}</option>
                : 
                  <option defaultValue={address.district_name}>{address.district_name}</option>
                }
                {district.map((val, index) => 
                <option key={index} value={val.id} name={val.name}>{val.name}</option>
                )}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
            <label className='font-bold'>Kelurahan*</label>
              <select onChange={(e) => {setAddress({...address, village_id: e.target.value, village_name: e.target.childNodes[e.target.selectedIndex].getAttribute("name")});}} className='w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200'>
                {Object.keys(getAddress()).length === 0 ? 
                  <option defaultValue={'DEFAULT'}>{loadingVillage? 'Loading...' : 'Pilih Kecamatan'}</option>
                : 
                  <option defaultValue={address.village_name}>{address.village_name}</option>
                }
                {village.map((val, index) => 
                <option key={index} value={val.id} name={val.name}>{val.name}</option>
                )}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-bold'>Kode Pos*</label>
              <input type={'number'} className='px-4 py-2 bg-gray-50 rounded-lg border border-gray-200' placeholder='Kode Pos' onChange={(e) => setAddress({...address, postCode: e.target.value})} value={Object.keys(getAddress()).length === 0 ? undefined : address.postCode}/>
            </div>
          </div>
        </div>
        :
        ''
        }
      </div>
    </>
  )
}

export default Input