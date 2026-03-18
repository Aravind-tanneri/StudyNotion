import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const [instructorData, setInstructorData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // We fetch our analytics data when the dashboard loads
    const getCourseDataWithStats = async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      if (instructorApiData.length) {
        setInstructorData(instructorApiData)
      }
      setLoading(false)
    }
    getCourseDataWithStats()
  }, [token])

  // We calculate our grand totals for the summary block
  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)
  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-richblack-5">
          Hi {user?.name} 👋
        </h1>
        <p className="font-medium text-richblack-200">
          Let's start something new
        </p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : instructorData?.length > 0 ? (
        <div>
          {/* We wrap our chart and our statistics in a flex row */}
          <div className="my-4 flex h-[450px] space-x-4">
            
            {/* We render our Recharts component */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6 text-xl text-richblack-50">
                Not Enough Data To Visualize
              </div>
            )}

            {/* We build our statistics summary box */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-5">
                    {instructorData.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-5">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-5">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* We display a quick view of the instructor's latest courses */}
          <div className="rounded-md bg-richblack-800 p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-richblack-5">Your Courses</p>
              <button
                onClick={() => navigate("/dashboard/my-courses")}
                className="text-xs font-semibold text-yellow-50"
              >
                View All
              </button>
            </div>
            <div className="my-4 flex items-start space-x-6">
              {/* We slice the array to only show the first 3 courses */}
              {instructorData.slice(0, 3).map((course) => (
                <div key={course._id} className="w-1/3">
                  <p className="mt-3 text-sm font-medium text-richblack-5">
                    {course.courseName}
                  </p>
                  <div className="mt-1 flex items-center space-x-2">
                    <p className="text-xs font-medium text-richblack-300">
                      {course.totalStudentsEnrolled} students
                    </p>
                    <p className="text-xs font-medium text-richblack-300">|</p>
                    <p className="text-xs font-medium text-richblack-300">
                      Rs. {course.totalAmountGenerated}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20 text-center text-2xl font-bold text-richblack-5">
          You have not created any courses yet.
          <button
            onClick={() => navigate("/dashboard/add-course")}
            className="mt-4 bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:scale-95 transition-all block mx-auto"
          >
            Create a Course
          </button>
        </div>
      )}
    </div>
  )
}