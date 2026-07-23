import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { IoAddCircleOutline } from 'react-icons/io5'
import { MdNavigateNext } from 'react-icons/md'

import IconBtn from '../../../../common/iconBtn'
import NestedView from './NestedView'
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import {
  createSection,
  updateSection,
} from '../../../../../services/operations/courseAPI'

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const onSubmit = async (data) => {
    setLoading(true)
    let result
    if (editSectionName) {
      result = await updateSection(
        { sectionName: data.sectionName, sectionId: editSectionName, courseId: course._id },
        token
      )
    } else {
      result = await createSection(
        { sectionName: data.sectionName, courseId: course._id },
        token
      )
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
  }

  const goToNext = () => {
    if (!course?.courseContent?.length) {
      toast.error("Please add at least one section")
      return
    }
    if (course.courseContent.some((section) => !section.subSections?.length)) {
      toast.error("Please add at least one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className='space-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-6 text-white'>
      <p className='text-2xl font-semibold'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="sectionName" className="text-sm text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id='sectionName'
            placeholder='Add a section to build your course'
            {...register("sectionName", { required: true })}
            className="w-full rounded-md bg-richblack-700 p-3 text-richblack-5"
          />
          {errors.sectionName && (
            <span className="text-xs text-pink-200">Section name is required</span>
          )}
        </div>
        <div className='mt-4 flex items-center gap-x-4'>
          <button
            type='submit'
            disabled={loading}
            className='flex items-center gap-x-2 rounded-md border border-yellow-50 py-2 px-5 font-semibold text-yellow-50'
          >
            {editSectionName ? "Edit Section Name" : "Create Section"} <IoAddCircleOutline size={20} />
          </button>
          {editSectionName && (
            <button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline'>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className='flex justify-end gap-x-3'>
        <button
          onClick={goBack}
          className='rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900'
        >
          Back
        </button>
        <IconBtn text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm
