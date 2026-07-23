import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

import { markLectureAsComplete } from '../../../services/operations/courseAPI'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice'
import IconBtn from '../../common/iconBtn'
import CourseReviewModal from './CourseReviewModal'

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const videoRef = useRef(null)

  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector(
    (state) => state.viewCourse
  )

  const [loading, setLoading] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const currentSectionIndex = courseSectionData?.findIndex(
    (section) => section._id === sectionId
  )
  const currentSection = courseSectionData?.[currentSectionIndex]
  const currentSubSectionIndex = currentSection?.subSections?.findIndex(
    (sub) => sub._id === subSectionId
  )
  const currentSubSection = currentSection?.subSections?.[currentSubSectionIndex]

  useEffect(() => {
    if (!courseSectionData?.length) return
    if (!sectionId && !subSectionId) {
      const firstSection = courseSectionData[0]
      const firstSub = firstSection?.subSections?.[0]
      if (firstSub) {
        navigate(
          `/view-course/${courseId}/section/${firstSection._id}/sub-section/${firstSub._id}`,
          { replace: true }
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData])

  const isFirstVideo = currentSectionIndex === 0 && currentSubSectionIndex === 0
  const isLastVideo =
    currentSectionIndex === courseSectionData?.length - 1 &&
    currentSubSectionIndex === currentSection?.subSections?.length - 1

  const goToNextVideo = () => {
    if (currentSubSectionIndex !== currentSection.subSections.length - 1) {
      const nextSub = currentSection.subSections[currentSubSectionIndex + 1]
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSub._id}`)
    } else {
      const nextSection = courseSectionData[currentSectionIndex + 1]
      const nextSub = nextSection?.subSections?.[0]
      if (nextSection && nextSub) {
        navigate(
          `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSub._id}`
        )
      }
    }
  }

  const goToPrevVideo = () => {
    if (currentSubSectionIndex !== 0) {
      const prevSub = currentSection.subSections[currentSubSectionIndex - 1]
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSub._id}`)
    } else {
      const prevSection = courseSectionData[currentSectionIndex - 1]
      const prevSub = prevSection?.subSections?.[prevSection.subSections.length - 1]
      if (prevSection && prevSub) {
        navigate(
          `/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSub._id}`
        )
      }
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const result = await markLectureAsComplete(
      { courseId, subSectionId },
      token
    )
    if (result) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  if (!currentSubSection) {
    return <div className="text-white">Loading lecture...</div>
  }

  const alreadyComplete = completedLectures.includes(subSectionId)

  return (
    <div className="text-white">
      <video
        ref={videoRef}
        key={currentSubSection.videoUrl}
        src={currentSubSection.videoUrl}
        controls
        onEnded={() => {
          if (!alreadyComplete) handleLectureCompletion()
        }}
        className="w-full rounded-md bg-black"
      />

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{currentSubSection.title}</h1>
      </div>
      <p className="mt-2 text-richblack-300">{currentSubSection.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {!isFirstVideo && (
          <button
            onClick={goToPrevVideo}
            className="rounded-md bg-richblack-700 py-2 px-5 font-semibold"
          >
            Prev
          </button>
        )}
        {!isLastVideo && (
          <button
            onClick={goToNextVideo}
            className="rounded-md bg-richblack-700 py-2 px-5 font-semibold"
          >
            Next
          </button>
        )}
        {!alreadyComplete ? (
          <IconBtn
            disabled={loading}
            text={loading ? "Marking..." : "Mark As Completed"}
            onclick={handleLectureCompletion}
          />
        ) : (
          <span className="rounded-md bg-richblack-700 py-2 px-5 text-caribbeangreen-100">
            ✓ Completed
          </span>
        )}
        {isLastVideo && (
          <button
            onClick={() => setShowReviewModal(true)}
            className="rounded-md border border-yellow-50 py-2 px-5 font-semibold text-yellow-50"
          >
            Add Review
          </button>
        )}
      </div>

      {showReviewModal && (
        <CourseReviewModal setReviewModal={setShowReviewModal} />
      )}
    </div>
  )
}
