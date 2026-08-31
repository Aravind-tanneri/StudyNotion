import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export default function CourseLauncher() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { courseSectionData } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    const firstSection = courseSectionData?.[0]
    if (courseId && firstSection?.subSection?.[0]?._id) {
      navigate(
        `/view-course/${courseId}/section/${firstSection._id}/sub-section/${firstSection.subSection[0]._id}`,
        { replace: true }
      )
    }
  }, [courseSectionData, courseId, navigate])

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
      <div className="flex flex-col items-center gap-4 text-richblack-200">
        <div className="spinner"></div>
        <p className="text-sm">Loading your course...</p>
      </div>
    </div>
  )
}