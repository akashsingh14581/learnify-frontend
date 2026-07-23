import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiFillCaretDown } from 'react-icons/ai'

import { setCourse } from '../../../../../slices/courseSlice'
import {
  deleteSection,
  deleteSubSection,
} from '../../../../../services/operations/courseAPI'
import ConfirmationModal from '../../../../common/confirmationModal'
import SubSectionModal from './SubSectionModal'

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id }, token)
    if (result) {
      const updatedCourseContent = course.courseContent.filter(
        (section) => section._id !== sectionId
      )
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId }, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId
          ? {
              ...section,
              subSections: section.subSections.filter(
                (sub) => sub._id !== subSectionId
              ),
            }
          : section
      )
      dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
    }
    setConfirmationModal(null)
  }

  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-700 p-4">
      {course?.courseContent?.map((section) => (
        <details key={section._id} open className="mb-3">
          <summary className="flex cursor-pointer items-center justify-between rounded-md bg-richblack-800 p-3">
            <div className="flex items-center gap-x-3">
              <RxDropdownMenu className="text-xl text-richblack-50" />
              <p className="font-semibold text-richblack-50">{section.sectionName}</p>
            </div>
            <div className="flex items-center gap-x-3" onClick={(e) => e.preventDefault()}>
              <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                <MdEdit className="text-lg text-richblack-300 hover:text-yellow-50" />
              </button>
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this Section?",
                    text2: "All the lectures in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
              >
                <RiDeleteBin6Line className="text-lg text-richblack-300 hover:text-pink-200" />
              </button>
            </div>
          </summary>

          <div className="px-4 py-2">
            {section.subSections?.map((subSection) => (
              <div
                key={subSection._id}
                onClick={() => setViewSubSection(subSection)}
                className="flex cursor-pointer items-center justify-between gap-x-3 border-b border-richblack-600 py-2"
              >
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu className="text-xl text-richblack-50" />
                  <p className="text-richblack-50">{subSection.title}</p>
                </div>
                <div className="flex items-center gap-x-3" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setEditSubSection(subSection)}>
                    <MdEdit className="text-lg text-richblack-300 hover:text-yellow-50" />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Lecture?",
                        text2: "This lecture will be permanently removed",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(subSection._id, section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <RiDeleteBin6Line className="text-lg text-richblack-300 hover:text-pink-200" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => setAddSubSection(section._id)}
              className="mt-3 flex items-center gap-x-1 text-yellow-50"
            >
              <AiFillCaretDown /> Add Lecture
            </button>
          </div>
        </details>
      ))}

      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      )}
      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}
      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}
