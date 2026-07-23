import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderSteps from './RenderSteps'
import { resetCourseState } from '../../../../slices/courseSlice'

const AddCourse = () => {
  const dispatch = useDispatch()
  const { editCourse } = useSelector((state) => state.course)

  // start from a clean slate whenever entering "Add Course" fresh (not editing)
  useEffect(() => {
    if (!editCourse) {
      dispatch(resetCourseState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='text-white flex flex-col lg:flex-row gap-x-8 gap-y-8'>
      <div className='flex-1'>
        <h1 className='mb-8 text-3xl font-medium'>{editCourse ? "Edit Course" : "Add Course"}</h1>
        <div>
          <RenderSteps />
        </div>
      </div>

      <div className='lg:w-[350px] shrink-0'>
        <div className='rounded-md border border-richblack-700 bg-richblack-800 p-6'>
          <p className='mb-4 text-lg font-semibold text-richblack-5'>⚡ Course Upload Tips</p>
          <ul className='ml-5 flex flex-col gap-y-3 list-disc text-sm text-richblack-300'>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make sure the completed course has a minimum of 5 sections/lectures.</li>
            <li>Add Screenshots in the Course Overview Page.</li>
            <li>Give a proper title to the course.</li>
            <li>Your course will be public only after it's published.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
