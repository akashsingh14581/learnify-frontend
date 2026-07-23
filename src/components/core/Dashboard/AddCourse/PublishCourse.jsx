import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import IconBtn from '../../../common/iconBtn'
import { editCourseDetails } from '../../../../services/operations/courseAPI'
import {
  resetCourseState,
  setStep,
} from '../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../utils/constants'

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    const currentStatus = course?.status
    const isPublic = getValues("public")

    if (
      (currentStatus === COURSE_STATUS.PUBLISHED && isPublic) ||
      (currentStatus === COURSE_STATUS.DRAFT && !isPublic)
    ) {
      goToCourses()
      return
    }

    const formData = new FormData()
    formData.append("courseId", course._id)
    formData.append("status", isPublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT)

    setLoading(true)
    const result = await editCourseDetails(formData, token)
    setLoading(false)
    if (result) {
      toast.success(
        isPublic ? "Course Published Successfully" : "Course Saved as Draft"
      )
      goToCourses()
    }
  }

  const onSubmit = () => {
    handleCoursePublish()
  }

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6 text-white">
      <p className="mb-4 text-2xl font-semibold">Publish Settings</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="public" className="flex items-center gap-x-3 py-4">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-4 w-4"
          />
          <span>Make this course public (visible in the catalog)</span>
        </label>

        <div className="flex justify-end gap-x-3">
          <button
            type="button"
            disabled={loading}
            onClick={goBack}
            className="rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" type="submit" />
        </div>
      </form>
    </div>
  )
}
