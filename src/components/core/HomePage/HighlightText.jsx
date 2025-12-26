import React from 'react'

function HighlightText({text}) {
  return (
    <span className='text-transparent bg-gradient-to-r from-richblue-200 to-blue-500 bg-clip-text'> 
        {" "}
        {text}
    </span>
  )
}

export default HighlightText
