import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { IoCheckmarkCircle } from 'react-icons/io5'
import ProgressBar from '@ramonak/react-progress-bar'

export default function VideoDetailsSidebar() {
  const navigate = useNavigate()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse)

  const progressPercentage = totalNoOfLectures
    ? Math.round((completedLectures.length / totalNoOfLectures) * 100)
    : 0

  return (
    <div className="flex w-[280px] shrink-0 flex-col border-r border-richblack-700 bg-richblack-800 text-white">
      <div className="flex items-center gap-x-3 border-b border-richblack-700 p-4">
        <Link to="/dashboard/enrolled-courses">
          <IoIosArrowBack className="text-2xl" />
        </Link>
        <div>
          <p className="font-semibold line-clamp-1">{courseEntireData?.courseName}</p>
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="mb-1 text-sm text-richblack-300">
          {completedLectures.length} / {totalNoOfLectures} lectures completed
        </p>
        <ProgressBar completed={progressPercentage} height="6px" isLabelVisible={false} />
      </div>

      <div className="flex-1 overflow-auto">
        {courseSectionData?.map((section) => (
          <div key={section._id} className="border-b border-richblack-700">
            <p className="bg-richblack-700 px-4 py-2 text-sm font-semibold">
              {section.sectionName}
            </p>
            {section.subSections?.map((sub) => {
              const isActive = sub._id === subSectionId
              const isComplete = completedLectures.includes(sub._id)
              return (
                <div
                  key={sub._id}
                  onClick={() =>
                    navigate(
                      `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${sub._id}`
                    )
                  }
                  className={`flex cursor-pointer items-center gap-x-2 px-4 py-3 text-sm
                    ${isActive ? "bg-yellow-900 text-yellow-50" : "text-richblack-100 hover:bg-richblack-700"}`}
                >
                  {isComplete ? (
                    <IoCheckmarkCircle className="text-green-400" />
                  ) : (
                    <span className="h-3 w-3 rounded-full border border-richblack-300" />
                  )}
                  <span>{sub.title}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
