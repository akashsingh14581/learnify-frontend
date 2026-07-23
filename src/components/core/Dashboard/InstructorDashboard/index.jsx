import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchInstructorCourses } from '../../../../services/operations/courseAPI'

export default function InstructorDashboard() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      const result = await fetchInstructorCourses(token)
      setCourses(result)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalStudents = courses?.reduce(
    (acc, course) => acc + (course.studentsEnrolled?.length || 0),
    0
  )
  const totalIncome = courses?.reduce(
    (acc, course) => acc + (course.studentsEnrolled?.length || 0) * course.price,
    0
  )

  return (
    <div className="text-white">
      <h1 className="mb-1 text-3xl font-medium">
        Hi {user?.firstName} 👋
      </h1>
      <p className="mb-8 text-richblack-300">Let's start something new</p>

      {courses && courses.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
              <p className="text-2xl font-semibold">{courses.length}</p>
              <p className="text-richblack-300">Total Courses</p>
            </div>
            <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
              <p className="text-2xl font-semibold">{totalStudents}</p>
              <p className="text-richblack-300">Total Students</p>
            </div>
            <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
              <p className="text-2xl font-semibold">Rs. {totalIncome}</p>
              <p className="text-richblack-300">Total Income</p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Your Courses</h2>
            <div className="space-y-3">
              {courses.slice(0, 5).map((course) => (
                <div
                  key={course._id}
                  className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-4"
                >
                  <p>{course.courseName}</p>
                  <p className="text-richblack-300">
                    {course.studentsEnrolled?.length || 0} students
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-richblack-300">
          {!courses ? "Loading..." : "You have not created any courses yet"}
        </p>
      )}
    </div>
  )
}
