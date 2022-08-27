import React from 'react'

const FloatingButton = () => {
  const askWa = () => {
    let text = 'Hi Siggi, aku mau bertanya dong!'
    let phoneNumberDestination = '6281259672716'
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumberDestination}&text=${text}`)
  }
  return (
    <div className='fixed bottom-4 right-4 z-20' onClick={() => askWa()}>
        <img src="https://img.icons8.com/color/64/000000/whatsapp--v1.png" alt='whatsapp'/>
    </div>
  )
}

export default FloatingButton