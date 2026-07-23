import React, { useEffect, useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getFullDetailsOfCourse } from '../services/operations/courseAPI'
import {
  setCourseSectionData,
  setEntireCourseData,
  setCompletedLectures,
  setTotalNoOfLectures,
} from '../slices/viewCourseSlice'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'

export default function ViewCourse() {
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      if (result?.courseDetails) {
        dispatch(setCourseSectionData(result.courseDetails.courseContent))
        dispatch(setEntireCourseData(result.courseDetails))
        dispatch(setCompletedLectures(result.completedVideos || []))

        const totalLectures = result.courseDetails.courseContent?.reduce(
          (acc, section) => acc + (section.subSections?.length || 0),
          0
        )
        dispatch(setTotalNoOfLectures(totalLectures))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  if (loading) {
    return <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-white">Loading...</div>
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <VideoDetailsSidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
