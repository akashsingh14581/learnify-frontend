import React from 'react'

const iconBtn = ({text, onclick, children, disabled, customClasses, type, outline=false}) => {
  return (
   <button
    disabled={disabled}
    onClick={onclick}
    type={type}
    className={`flex items-center gap-x-2 rounded-md py-2 px-5 font-semibold transition-all duration-200
      ${outline
        ? "border border-yellow-50 bg-transparent text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900"
        : "bg-yellow-50 text-richblack-900 hover:scale-95"}
      ${disabled ? "cursor-not-allowed opacity-50" : ""}
      ${customClasses}`}
   >
{
    children ? (<><span>{text}</span> {children}</>):(text)
}
   </button>
  )
}

export default iconBtn
