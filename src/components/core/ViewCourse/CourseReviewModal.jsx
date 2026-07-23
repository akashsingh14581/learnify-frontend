import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-rating-stars-component'
import { RxCross2 } from 'react-icons/rx'

import IconBtn from '../../common/iconBtn'
import { createRating } from '../../../services/operations/courseAPI'

export default function CourseReviewModal({ setReviewModal }) {
  const { register, handleSubmit, setValue } = useForm()
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)

  const ratingChanged = (newRating) => {
    setRating(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    setLoading(true)
    await createRating(
      {
        courseId: courseEntireData._id,
        rating,
        review: data.courseExperience,
      },
      token
    )
    setLoading(false)
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1100] grid place-items-center bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[500px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <div className="mb-4 flex justify-center">
          <ReactStars
            count={5}
            size={30}
            onChange={ratingChanged}
            activeColor="#ffd700"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            placeholder="Share your experience with this course"
            {...register("courseExperience", { required: true })}
            className="min-h-[120px] w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
          />
          <div className="mt-4 flex justify-end gap-x-3">
            <button
              type="button"
              onClick={() => setReviewModal(false)}
              className="rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900"
            >
              Cancel
            </button>
            <IconBtn disabled={loading} text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
