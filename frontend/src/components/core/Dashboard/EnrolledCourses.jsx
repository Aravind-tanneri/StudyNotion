import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { BsThreeDotsVertical } from "react-icons/bs"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [activeTab, setActiveTab] = useState("All")
  const [openMenuFor, setOpenMenuFor] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token)
      setEnrolledCourses(response)
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses")
    }
  }

  useEffect(() => {
    getEnrolledCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // If data is still null, we are waiting for the API
  if (!enrolledCourses) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <p className="mb-3 text-sm text-richblack-300">
        Home / Dashboard / <span className="text-yellow-50">Enrolled Courses</span>
      </p>

      <div className="text-3xl text-richblack-50 font-medium">Enrolled Courses</div>

      {/* Tabs */}
      <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-richblack-800 p-1 text-sm">
        {["All", "Pending", "Completed"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`rounded-full px-4 py-2 transition-all ${
              activeTab === t ? "bg-richblack-900 text-richblack-5" : "text-richblack-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      
      {/* If the array is empty, the student hasn't bought anything yet */}
      {enrolledCourses?.length === 0 ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Table Headings */}
          <div className="flex rounded-t-lg bg-richblack-800 border border-richblack-700">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Durations</p>
            <p className="flex-1 px-2 py-3">Progress</p>
            <p className="w-[40px] px-2 py-3"></p>
          </div>
          
          {/* Mapping over the enrolled courses */}
          {(enrolledCourses || [])
            .filter((course) => {
              const progress = Number(course.progressPercentage || 0)
              if (activeTab === "Completed") return progress >= 100
              if (activeTab === "Pending") return progress < 100
              return true
            })
            .map((course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              {/* Thumbnail & Title - Clickable to open the course player */}
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3 transition-all hover:bg-richblack-800"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>

              {/* Course Duration */}
              <div className="w-1/4 px-2 py-3">
                {course?.totalDuration || "2h 30m"}
              </div>

              {/* Progress Bar */}
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p className="text-xs text-richblack-200">
                  {Number(course.progressPercentage || 0) >= 100
                    ? "Completed"
                    : `Progress ${course.progressPercentage || 0}%`}
                </p>
                <div className="h-2 w-full rounded-full bg-richblack-700">
                  <div
                    className="h-full rounded-full bg-blue-50"
                    style={{
                      width: `${course.progressPercentage || 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="relative w-[40px] px-2 py-3">
                <button
                  className="rounded-md p-2 text-richblack-200 hover:bg-richblack-800"
                  onClick={() =>
                    setOpenMenuFor((prev) => (prev === course._id ? null : course._id))
                  }
                >
                  <BsThreeDotsVertical />
                </button>

                {openMenuFor === course._id && (
                  <div className="absolute right-6 top-10 z-20 w-[160px] overflow-hidden rounded-md border border-richblack-700 bg-richblack-800 text-sm">
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-richblack-700"
                      onClick={() => {
                        setOpenMenuFor(null)
                        // UI-only: mark as completed is not wired to backend yet
                      }}
                    >
                      Mark as Completed
                    </button>
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-richblack-700"
                      onClick={() => {
                        setOpenMenuFor(null)
                        // UI-only: remove is not wired to backend yet
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}