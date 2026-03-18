import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import RenderSteps from "./RenderSteps"
import { resetCourseState } from "../../../../slices/courseSlice"

const AddCourse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    // When landing on the create course flow, start from step 1
    dispatch(resetCourseState())
  }, [dispatch])

  return (
    <div className="flex w-full items-start gap-x-6">
      <div className="flex flex-col flex-1">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 w-fit text-sm text-richblack-300 hover:text-richblack-5"
        >
          &larr; Back to Dashboard
        </button>

        <RenderSteps />
      </div>

      {/* Course Upload Tips Sidebar */}
      <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
        <p className="mb-8 text-lg font-semibold text-richblack-5">
          ⚡ Course Upload Tips
        </p>
        <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
          <li>Information from the Additional Data section shows up on the course single page.</li>
          <li>Make Announcements to notify any important updates.</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  )
}

export default AddCourse