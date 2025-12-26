import React from 'react'
import CTAButton from './Button'
import Instructor from '../../../assets/Images/Instructor.png'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from './HighlightText'
function InstructorSection() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-5 lg:flex-row'>
        <div className='flex-1'>
            <img src={Instructor} alt="Instructor" style={{
    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",  boxShadow: "0 0 25px rgba(255,255,255,0.7)"
  }} />
        </div>
        <div className='flex flex-col flex-1 gap-5'>
            <p className='text-4xl font-semibold'>Become an <HighlightText text={'Instructor'}/></p>
            <p className='font-medium text-richblack-400'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            <CTAButton active={true} linkedTo={'/signup'}>
                <p className='flex items-center gap-2'>
                    Start Teaching Today <FaArrowRight/>
                </p>
                
            </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
