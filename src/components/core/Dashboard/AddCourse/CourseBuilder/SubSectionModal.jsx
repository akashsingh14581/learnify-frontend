import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from 'react-icons/rx'

import IconBtn from '../../../../common/iconBtn'
import { setCourse } from '../../../../../slices/courseSlice'
import {
  createSubSection,
  updateSubSection,
  fetchCourseDetails,
} from '../../../../../services/operations/courseAPI'

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lectureTitle: view || edit ? modalData.title : "",
      lectureDesc: view || edit ? modalData.description : "",
      lectureVideo: view || edit ? modalData.videoUrl : "",
    },
  })

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [videoPreview, setVideoPreview] = useState(
    view || edit ? modalData.videoUrl : null
  )

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setValue("lectureVideo", file)
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const isFormUpdated = (data) => {
    return (
      data.lectureTitle !== modalData.title ||
      data.lectureDesc !== modalData.description ||
      data.lectureVideo !== modalData.videoUrl
    )
  }

  const handleEditSubSection = async (data) => {
    const formData = new FormData()
    formData.append("sectionId", modalData._id)
    if (data.lectureTitle !== modalData.title) {
      formData.append("title", data.lectureTitle)
    }
    if (data.lectureDesc !== modalData.description) {
      formData.append("description", data.lectureDesc)
    }
    if (data.lectureVideo !== modalData.videoUrl) {
      formData.append("video", data.lectureVideo)
    }
    setLoading(true)
    await updateSubSection(formData, token)
    const result = await fetchCourseDetails(course._id)
    if (result?.data) {
      dispatch(setCourse(result.data))
    }
    setLoading(false)
    setModalData(null)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated(data)) {
        setModalData(null)
        return
      }
      await handleEditSubSection(data)
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("videoUrl", data.lectureVideo)

    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === result._id ? result : section
      )
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
    }
    setLoading(false)
    setModalData(null)
  }

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[600px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => setModalData(null)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5">
              Lecture Video {!view && <sup className="text-pink-200">*</sup>}
            </label>
            {!view && (
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
              />
            )}
            {videoPreview && (
              <video src={videoPreview} controls className="mt-2 max-h-[200px] w-full rounded-md" />
            )}
            {errors.lectureVideo && (
              <span className="text-xs text-pink-200">Lecture video is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureTitle" className="text-sm text-richblack-5">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              id="lectureTitle"
              disabled={view}
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
            />
            {errors.lectureTitle && (
              <span className="text-xs text-pink-200">Lecture title is required</span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureDesc" className="text-sm text-richblack-5">
              Lecture Description {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              id="lectureDesc"
              disabled={view}
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="min-h-[100px] w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
            />
            {errors.lectureDesc && (
              <span className="text-xs text-pink-200">Lecture description is required</span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "Saving..." : edit ? "Save Changes" : "Save"}
                type="submit"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
