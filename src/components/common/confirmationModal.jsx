import React from 'react'
import IconButton from './iconBtn'
const confirmationModal = ({modalData}) => {
  return (
    <div>
        <div>{modalData.text1}</div> 
        <div>{modalData.text2}</div>
        <div>
            <IconButton onclick={modalData?.btnHandler} text={modalData?.btnText} />
            <button onclick={modalData?.btn2Handler} >{modalData?.btn2Text}</button>
        </div>
    </div>
  )
}

export default confirmationModal
