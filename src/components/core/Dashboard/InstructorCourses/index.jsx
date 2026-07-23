import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { VscAdd } from 'react-icons/vsc'
import { HiClock } from 'react-icons/hi'

import {
  fetchInstructorCourses,
  deleteCourse,
} from '../../../../services/operations/courseAPI'
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
import ConfirmationModal from '../../../common/confirmationModal'
import IconBtn from '../../../common/iconBtn'
import { COURSE_STATUS } from '../../../../utils/constants'

export default function InstructorCourses() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [courses, setCourses] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const fetchCourses = async () => {
    const result = await fetchInstructorCourses(token)
    setCourses(result)
  }

  useEffect(() => {
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEditCourse = (course) => {
    dispatch(setCourse(course))
    dispatch(setEditCourse(true))
    dispatch(setStep(1))
    navigate("/dashboard/edit-course/" + course._id)
  }

  const handleDeleteCourse = async (courseId) => {
    await deleteCourse({ courseId }, token)
    setConfirmationModal(null)
    fetchCourses()
  }

  return (
    <div className="text-white">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-medium">My Courses</h1>
        <Link to="/dashboard/add-course">
          <IconBtn text="Add Course">
            <VscAdd />
          </IconBtn>
        </Link>
      </div>

      {!courses ? (
        <div>Loading...</div>
      ) : courses.length === 0 ? (
        <p className="text-richblack-300">You haven't created any courses yet</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex flex-col gap-4 rounded-md border border-richblack-700 bg-richblack-800 p-4 sm:flex-row sm:items-center"
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="h-[120px] w-[200px] rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">{course.courseName}</p>
                <p className="mt-1 text-sm text-richblack-300 line-clamp-2">
                  {course.courseDescription}
                </p>
                <p className="mt-2 text-xs text-richblack-400">
                  Created: {new Date(course.createdAt || Date.now()).toDateString()}
                </p>
                <div className="mt-2 flex items-center gap-x-2">
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <span className="flex items-center gap-1 rounded-full bg-richblack-700 px-2 py-1 text-xs text-pink-100">
                      <HiClock /> Drafted
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-richblack-700 px-2 py-1 text-xs text-yellow-100">
                      Published
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 sm:flex-col">
                <p className="text-lg font-medium">Rs. {course.price}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="text-sm text-richblack-300 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Course?",
                        text2: "All the section, lectures and data related to this course will be permanently deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteCourse(course._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    className="text-sm text-pink-200 underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}
