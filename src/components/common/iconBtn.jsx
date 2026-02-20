import React from 'react'

const iconBtn = ({text, onclick, children, disabled, customClasses, type, outline=false}) => {
  return (
   <button disabled={disabled} onClick={onclick} type={type}>
{
    children ? (<><span>{text}</span> {children}</>):(text)
}
   </button>
  )
}

export default iconBtn
