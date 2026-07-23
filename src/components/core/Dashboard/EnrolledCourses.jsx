import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'

const EnrolledCourses = () => {

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const fetchEnrolledCourses = useCallback(async () => {
    try {
      const response = await getUserEnrolledCourses(token)
      setEnrolledCourses(response)
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses")
    }
  }, [token])

  useEffect(() => {
    fetchEnrolledCourses()
  }, [fetchEnrolledCourses])

  return (
    <div className='text-white'>

      <h1 className='mb-8 text-3xl font-medium'>Enrolled Courses</h1>

      {
        !enrolledCourses ? (
          <div>Loading...</div>
        ) : !enrolledCourses.length ? (
          <p className='text-richblack-300'>You have not enrolled in any course yet</p>
        ) : (
          <div className='space-y-4'>
            {
              enrolledCourses.map((course, index) => (
                <div
                  key={course._id || index}
                  onClick={() => navigate(`/view-course/${course._id}`)}
                  className='flex cursor-pointer flex-col gap-4 rounded-md border border-richblack-700 bg-richblack-800 p-4 sm:flex-row sm:items-center'
                >

                  <img
                    src={course.thumbnail}
                    alt="course thumbnail"
                    className='h-[100px] w-[160px] rounded-md object-cover'
                  />

                  <div className='flex-1'>
                    <p className='font-semibold'>{course.courseName}</p>
                    <p className='mt-1 text-sm text-richblack-300 line-clamp-2'>{course.courseDescription}</p>
                  </div>

                  <div className='sm:w-[150px]'>
                    <p className='mb-1 text-sm text-richblack-300'>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height='8px'
                      isLabelVisible={false}
                    />
                  </div>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  )
}

export default EnrolledCourses
