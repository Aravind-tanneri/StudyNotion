import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", profileEndpoints.GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })


    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }
    
    // We assign our calculated course data array to our result variable
    result = response?.data?.courses
  } catch (error) {
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId)
  return result
}

// Mark every lecture of the course as completed for the student
export async function markCourseComplete(courseId, token) {
  const toastId = toast.loading("Marking course as completed...")
  let success = false
  try {
    const response = await apiConnector(
      "POST",
      profileEndpoints.MARK_COURSE_COMPLETE_API,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }
    toast.success("Course marked as completed")
    success = true
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not mark course as completed")
  }
  toast.dismiss(toastId)
  return success
}

// Remove the course from the student's enrolled courses
export async function removeCourseFromEnrollment(courseId, token) {
  const toastId = toast.loading("Removing course...")
  let success = false
  try {
    const response = await apiConnector(
      "POST",
      profileEndpoints.REMOVE_COURSE_API,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }
    toast.success("Course removed from your enrollments")
    success = true
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not remove course")
  }
  toast.dismiss(toastId)
  return success
}
