import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

export default function Course_Card({ course }) {
  const avgRating =
    course?.ratingAndReviews?.length > 0
      ? course.ratingAndReviews.reduce((acc, r) => acc + r.rating, 0) /
        course.ratingAndReviews.length
      : 0

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="flex flex-col gap-2 rounded-md border border-richblack-700 bg-richblack-800 p-3 transition-all hover:scale-[1.02] hover:border-richblack-500">
        <img
          src={course?.thumbnail}
          alt={course?.courseName}
          className="h-[180px] w-full rounded-md object-cover"
        />
        <p className="text-lg font-semibold text-richblack-5 line-clamp-2">
          {course?.courseName}
        </p>
        <p className="text-sm text-richblack-300">
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </p>
        <div className="flex items-center gap-x-2">
          <span className="text-yellow-5">{avgRating.toFixed(1)}</span>
          <ReactStars
            count={5}
            value={avgRating}
            size={18}
            edit={false}
            activeColor="#ffd700"
          />
          <span className="text-richblack-400 text-sm">
            ({course?.ratingAndReviews?.length || 0})
          </span>
        </div>
        <p className="text-xl font-medium text-richblack-5">Rs. {course?.price}</p>
      </div>
    </Link>
  )
}
