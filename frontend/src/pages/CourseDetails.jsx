import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { addToCart } from "../slices/cartSlice"
import { toast } from "react-hot-toast"

export default function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()

  const [courseData, setCourseData] = useState(null)

  useEffect(() => {
    // We fetch the public course data when the page loads
    const getCourseSpecificDetails = async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setCourseData(res?.data?.courseDetails)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    }
    getCourseSpecificDetails()
  }, [courseId])

  // We handle the direct purchase flow
  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    // If they aren't logged in, we force them to the login page
    toast.error("Please log in to purchase the course")
    navigate("/login")
  }

  // We handle adding the item to the Redux cart
  const handleAddToCart = () => {
    if (user && user?.accountType === "Instructor") {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(courseData))
      return
    }
    toast.error("Please log in to add to cart")
    navigate("/login")
  }

  if (loading || !courseData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center text-white bg-richblack-800">
      {/* Hero Section */}
      <div className="w-full bg-richblack-800 px-4 py-8 md:px-8 lg:px-24 border-b border-richblack-700">
        <div className="flex flex-col gap-4 border-r border-richblack-700 w-full md:w-[60%] py-4">
          <h1 className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
            {courseData?.courseName}
          </h1>
          <p className="text-richblack-200">{courseData?.courseDescription}</p>
          <p className="text-xl font-semibold text-yellow-50">Rs. {courseData?.price}</p>
          <p className="text-richblack-200">Created By {courseData?.instructor?.firstName}</p>
          
          <div className="flex flex-col gap-4 py-4 md:w-1/2">
             <button
                onClick={handleBuyCourse}
                className="bg-yellow-50 text-richblack-900 font-semibold py-3 px-6 rounded-md hover:scale-95 transition-all"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-richblack-800 text-richblack-5 border border-richblack-50 font-semibold py-3 px-6 rounded-md hover:bg-richblack-900 transition-all"
              >
                Add to Cart
              </button>
          </div>
        </div>
      </div>

      {/* Course Content / Syllabus Section */}
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px] py-12">
        <div className="max-w-[830px]">
          <h2 className="text-3xl font-semibold mb-6">Course Content</h2>
          <div className="flex flex-col gap-2">
            {courseData?.courseContent?.map((section, index) => (
              <div key={index} className="border border-richblack-600 rounded-md p-4 bg-richblack-700">
                <p className="font-medium">{section.sectionName}</p>
                {/* we can map over the subSections here to show video titles later! */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}