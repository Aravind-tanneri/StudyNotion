import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { deleteSection, deleteSubSection } from "../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../slices/courseSlice"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [addSubSection, setAddSubSection] = useState(null)
  // State to manage the confirmation modal for deleting
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleteSection = async (sectionId) => {
    result = await deleteSection({ sectionId, courseId: course._id }, token)
    if (result) { dispatch(setCourse(result)) }
    setConfirmationModal(null)
    console.log("Deleting Section:", sectionId)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    result = await deleteSubSection({ subSectionId, sectionId }, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) => 
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
    console.log("Deleting SubSection:", subSectionId)
  }

  return (
    <>
      <div className="rounded-lg bg-richblack-700 p-6 px-8" id="nestedViewContainer">
        {course?.courseContent?.map((section) => (
          // Individual Section (Chapter) Dropdown
          <details key={section._id} className="mt-4" open>
            {/* Section Header */}
            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu className="text-2xl text-richblack-50" />
                <p className="font-semibold text-richblack-50">
                  {section.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                >
                  <MdEdit className="text-xl text-richblack-300 hover:text-richblack-50" />
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
                  <RiDeleteBin6Line className="text-xl text-richblack-300 hover:text-pink-200" />
                </button>
                <span className="font-medium text-richblack-300">|</span>
                <AiFillCaretDown className="text-xl text-richblack-300" />
              </div>
            </summary>

            {/* SubSections (Video Lectures) inside this Section */}
            <div className="px-6 pb-4">
              {section.subSection?.map((data) => (
                <div 
                  key={data?._id} 
                  className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                >
                  <div className="flex items-center gap-x-3 py-2 ">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {data.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <button>
                      <MdEdit className="text-xl text-richblack-300 hover:text-richblack-50" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line className="text-xl text-richblack-300 hover:text-pink-200" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add New Lecture Button */}
              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-3 flex items-center gap-x-1 text-yellow-50 font-semibold"
              >
                <FaPlus className="text-lg" />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {/* Render Confirmation Modal if state is not null */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}