import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import ReactStars from 'react-rating-stars-component'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { HiOutlineGlobeAlt } from 'react-icons/hi'

import { fetchCourseDetails, buyCourse } from '../services/operations/courseAPI'
import { addToCart } from '../slices/cartSlice'
import Footer from '../components/common/Footer'
import { ACCOUNT_TYPE } from '../utils/constants'

export default function CourseDetails() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { cart } = useSelector((state) => state.cart)

  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await fetchCourseDetails(courseId)
      if (result?.success) {
        setCourseData(result.data)
      }
      setLoading(false)
    })()
  }, [courseId])

  if (loading) {
    return <div className="grid min-h-[50vh] place-items-center text-white">Loading...</div>
  }

  if (!courseData) {
    return (
      <div className="grid min-h-[50vh] place-items-center text-white">
        Could not find this course
      </div>
    )
  }

  const course = courseData
  const avgRating =
    course?.ratingAndReviews?.length > 0
      ? course.ratingAndReviews.reduce((acc, r) => acc + r.rating, 0) /
        course.ratingAndReviews.length
      : 0

  const totalLectures = course?.courseContent?.reduce(
    (acc, section) => acc + (section.subSections?.length || 0),
    0
  )

  const isEnrolled = course?.studentsEnrolled?.includes(user?._id)

  const handleAddToCart = () => {
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course")
      return
    }
    if (!token) {
      toast.error("Please login to add courses to cart")
      return
    }
    dispatch(addToCart(course))
  }

  const handleBuyNow = () => {
    if (!token) {
      toast.error("Please login to purchase this course")
      navigate("/login")
      return
    }
    buyCourse(token, [course._id], user, navigate, dispatch)
  }

  return (
    <div className="text-white">
      <div className="bg-richblack-800 py-8">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse gap-8 lg:flex-row">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold">{course.courseName}</h1>
            <p className="mt-3 text-richblack-200">{course.courseDescription}</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-2">
              <span className="text-yellow-25">{avgRating.toFixed(1)}</span>
              <ReactStars count={5} value={avgRating} size={20} edit={false} activeColor="#ffd700" />
              <span className="text-richblack-300">
                ({course?.ratingAndReviews?.length || 0} ratings)
              </span>
              <span className="text-richblack-300">
                {course?.studentsEnrolled?.length || 0} students enrolled
              </span>
            </div>

            <p className="mt-2 text-richblack-300">
              Created By {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            <div className="mt-2 flex items-center gap-2 text-richblack-300">
              <HiOutlineGlobeAlt /> English
            </div>
          </div>

          {/* mobile price card */}
          <div className="lg:hidden rounded-md border border-richblack-700 bg-richblack-800 p-4">
            <img src={course.thumbnail} alt={course.courseName} className="rounded-md" />
            <PriceBox
              course={course}
              isEnrolled={isEnrolled}
              cart={cart}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              navigate={navigate}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse gap-8 py-10 lg:flex-row">
        <div className="flex-1 space-y-8">
          {/* What you'll learn */}
          <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
            <h2 className="mb-3 text-2xl font-semibold">What you'll learn</h2>
            <p className="whitespace-pre-line text-richblack-200">
              {course.whatYouWillLearn}
            </p>
          </div>

          {/* Course Content */}
          <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Course Content</h2>
              <p className="text-richblack-300">
                {course.courseContent?.length || 0} sections | {totalLectures || 0} lectures
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {course.courseContent?.map((section) => (
                <details key={section._id} className="rounded-md bg-richblack-700 p-3">
                  <summary className="cursor-pointer font-semibold">
                    {section.sectionName}
                  </summary>
                  <div className="mt-2 space-y-1 pl-4">
                    {section.subSections?.map((sub) => (
                      <div key={sub._id} className="flex items-center gap-x-2 text-richblack-200">
                        <BsFillCaretRightFill className="text-sm" />
                        <span>{sub.title}</span>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
            <h2 className="mb-3 text-2xl font-semibold">Instructor</h2>
            <p className="text-lg text-richblack-5">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <p className="mt-1 text-richblack-300">
              {course?.instructor?.additionalDetails?.about}
            </p>
          </div>

          {/* Reviews */}
          <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
            <h2 className="mb-3 text-2xl font-semibold">Reviews</h2>
            {course?.ratingAndReviews?.length ? (
              <div className="space-y-4">
                {course.ratingAndReviews.map((review) => (
                  <div key={review._id} className="border-b border-richblack-700 pb-3">
                    <div className="flex items-center gap-x-2">
                      <ReactStars count={5} value={review.rating} size={16} edit={false} activeColor="#ffd700" />
                    </div>
                    <p className="mt-1 text-richblack-200">{review.review}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-richblack-300">No reviews yet</p>
            )}
          </div>
        </div>

        {/* desktop price card */}
        <div className="hidden lg:block lg:w-[350px] shrink-0">
          <div className="sticky top-6 rounded-md border border-richblack-700 bg-richblack-800 p-4">
            <img src={course.thumbnail} alt={course.courseName} className="rounded-md" />
            <PriceBox
              course={course}
              isEnrolled={isEnrolled}
              cart={cart}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              navigate={navigate}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function PriceBox({ course, isEnrolled, cart, handleAddToCart, handleBuyNow, navigate }) {
  const alreadyInCart = cart?.some((c) => c._id === course._id)

  return (
    <div className="mt-4 space-y-4">
      <p className="text-3xl font-semibold">Rs. {course.price}</p>
      {isEnrolled ? (
        <Link to={`/view-course/${course._id}`}>
          <button className="w-full rounded-md bg-yellow-50 py-3 font-semibold text-richblack-900">
            Go To Course
          </button>
        </Link>
      ) : (
        <>
          <button
            onClick={handleBuyNow}
            className="w-full rounded-md bg-yellow-50 py-3 font-semibold text-richblack-900"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            disabled={alreadyInCart}
            className="w-full rounded-md border border-richblack-500 py-3 font-semibold text-richblack-5 disabled:opacity-50"
          >
            {alreadyInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </>
      )}
    </div>
  )
}
