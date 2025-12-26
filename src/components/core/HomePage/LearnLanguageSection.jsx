import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button'

function LearnLanguageSection() {
  return (
    <div>
     <div className='flex flex-col items-center'>
      <h2 className='mb-2 text-4xl font-semibold'>Your swiss knife for <HighlightText text={'learning any language'} /></h2>
      <p className='text-richblack-600 lg:w-[50%] sm:text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
      <div className='flex flex-col items-center justify-center mt-4 lg:flex-row'>
        <img className='object-contain -mr-0 mb-[-60px] lg:-mr-32' src={know_your_progress} alt="know_your_progress" />
          <img className='object-contain -mr-0 mb-[-60px] lg:-mr-32' src={compare_with_others} alt="compare_with_others" />
            <img className='object-contain -mr-0 mb-[-60px] lg:-mr-32' src={plan_your_lessons} alt="plan_your_lessons" />
      </div>
      <div className='mt-10'>
        <CTAButton active={true} linkedTo={'/signup'}>Learn More</CTAButton>
      </div>
      
     </div>
    </div>
  )
}

export default LearnLanguageSection
