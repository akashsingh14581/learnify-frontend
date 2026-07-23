import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'

import IconBtn from '../../../../common/iconBtn'
import RequirementField from './RequirementField'
import { getAllCategories } from '../../../../../services/operations/categoryAPI'
import {
  addCourseDetails,
  editCourseDetails,
} from '../../../../../services/operations/courseAPI'
import { setCourse, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])
  const [thumbnailPreview, setThumbnailPreview] = useState(
    course?.thumbnail || null
  )

  useEffect(() => {
    ;(async () => {
      const categories = await getAllCategories()
      setCourseCategories(categories)
    })()

    // pre-fill form when editing an existing course
    if (editCourse && course) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag?.join(", "))
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category?._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setValue("courseImage", file)
      const reader = new FileReader()
      reader.onload = () => setThumbnailPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const isFormUpdated = () => {
    const currentValues = getValues()
    if (!course) return true
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags?.split(",").map((t) => t.trim()).join(",") !==
        course.tag?.join(",") ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category?._id ||
      currentValues.courseImage
    )
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const formData = new FormData()
        formData.append("courseId", course._id)
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(
          data.courseTags.split(",").map((t) => t.trim())
        ))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        if (data.courseImage) {
          formData.append("thumbnailImage", data.courseImage)
        }

        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setCourse(result))
          dispatch(setStep(2))
        }
      } else {
        toast.error("No changes made so far")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append(
      "tag",
      JSON.stringify(data.courseTags.split(",").map((t) => t.trim()))
    )
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    setLoading(true)
    const result = await addCourseDetails(formData, token)
    setLoading(false)
    if (result) {
      dispatch(setCourse(result))
      dispatch(setStep(2))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
        />
        {errors.courseTitle && (
          <span className="text-xs text-pink-200">Course title is required</span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-[130px] w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
        />
        {errors.courseShortDesc && (
          <span className="text-xs text-pink-200">Course description is required</span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="coursePrice" className="text-sm text-richblack-5">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            type="number"
            placeholder="Enter Course Price"
            {...register("coursePrice", { required: true, valueAsNumber: true, min: 0 })}
            className="w-full rounded-md bg-richblack-700 p-3 pl-10 text-richblack-5"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-richblack-300" />
        </div>
        {errors.coursePrice && (
          <span className="text-xs text-pink-200">Course price is required</span>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
        >
          <option value="" disabled>Choose a Category</option>
          <option value="react">react</option>
          {courseCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && (
          <span className="text-xs text-pink-200">Course category is required</span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTags" className="text-sm text-richblack-5">
          Tags <sup className="text-pink-200">*</sup> <span className="text-richblack-400">(comma separated)</span>
        </label>
        <input
          id="courseTags"
          placeholder="e.g. React, Frontend, Web Development"
          {...register("courseTags", { required: true })}
          className="w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
        />
        {errors.courseTags && (
          <span className="text-xs text-pink-200">At least one tag is required</span>
        )}
      </div>

      {/* Thumbnail */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseImage" className="text-sm text-richblack-5">
          Course Thumbnail {!editCourse && <sup className="text-pink-200">*</sup>}
        </label>
        <input
          id="courseImage"
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
        />
        {thumbnailPreview && (
          <img src={thumbnailPreview} alt="thumbnail preview" className="mt-2 h-32 rounded-md object-cover" />
        )}
      </div>

      {/* What You Will Learn */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="What will students learn in this course?"
          {...register("courseBenefits", { required: true })}
          className="min-h-[130px] w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-pink-200">Benefits are required</span>
        )}
      </div>

      {/* Requirements */}
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex justify-end gap-x-3">
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
          type="submit"
        />
      </div>
    </form>
  )
}

export default CourseInformationForm
