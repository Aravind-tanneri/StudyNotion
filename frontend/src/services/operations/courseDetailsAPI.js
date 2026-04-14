import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const { CREATE_COURSE_API } = courseEndpoints


// Fetch Course Details for the Public Sales Page (No Token Required)
export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("POST", courseEndpoints.COURSE_DETAILS_API, {
      courseId,
    })
    console.log("COURSE_DETAILS_API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API ERROR............", error)
    result = error.response.data
  }
  toast.dismiss(toastId)
  return result
}

export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Creating your course...")
  
  try {
    const response = await apiConnector(
      "POST", 
      CREATE_COURSE_API, 
      data, 
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("CREATE COURSE API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }

    toast.success("Course Details Added Successfully!")
    result = response?.data?.data 
    
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  
  toast.dismiss(toastId)
  return result
}

export const editCourseDetails = async (data,token )=>{
  let result = null
  const toastId = toast.loading("Updating Course..")
  try{
    const response = await apiConnector(
      "POST",
      courseEndpoints.EDIT_COURSE_API,
      data,
      {
        "Content-Type":"multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    )

    if(!response?.data?.success){
      throw new Error("Couldn't Update Course Details")
    }

    toast.success("COURSE UPDATED SUCCESSFULLY")
    
    result=response?.data?.data
  }catch(error){
    console.log("EDIT COURSE API ERROR...",error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result;
}

// CREATE A SECTION
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Creating Section...")
  try {
    const response = await apiConnector(
      "POST", 
      courseEndpoints.CREATE_SECTION_API, 
      data, 
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("CREATE SECTION API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }

    toast.success("Section Created Successfully")
    
    result = response?.data?.updatedCourse || response?.data?.data
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// UPDATE A SECTION
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Updating Section...")
  try {
    const response = await apiConnector(
      "POST", 
      courseEndpoints.UPDATE_SECTION_API, 
      data, 
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("UPDATE SECTION API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }

    toast.success("Section Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Deleting Section...")
  try {
    const response = await apiConnector(
      "DELETE",
      courseEndpoints.DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Section Deleted Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Deleting Sub Section...")
  try {
    const response = await apiConnector(
      "DELETE",
      courseEndpoints.DELETE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("DELETE SUB SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Sub Section")
    }
    toast.success("Sub Section Deleted Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// DELETE A SECTION
export const deleteSectionVideo = async (data, token) => {
  let result = null
  const toastId = toast.loading("Deleting Section...")
  try {
    const response = await apiConnector(
      "DELETE",
      courseEndpoints.DELETE_SECTION_API,
      data, 
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Section Deleted Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}



//create a Sub section(video lec)

export const createSubSection=async (data,token)=>{
  let result=null
  const toastId=toast.loading("Uploading Lecture Video.. This might take a minute.")
  try{
    const response = await apiConnector(
      "POST",
      courseEndpoints.CREATE_SUBSECTION_API,
      data,
      {
        "Content-Type":"multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("create subSectionAPI response..",response)

    if(!response?.data?.success){
      throw new Error("Couldnt Add Lecture")
    }

    toast.success("Lecture Added Successfully")

    result=response?.data?.data

  }catch(error){
    console.log("Create subsectionAPI error..",error);
    toast.error(error.message);
  }
  toast.dismiss(toastId)
  return result
}


//update subsection

export const updateSubSection= async (data,token)=>{
  let result=null;
  const toastId=toast.loading("Updating Lecture...")
  try{
    const response =await apiConnector(
      "POST",
      courseEndpoints.UPDATE_SUBSECTION_API,
      data,
    {
      "Content-Type":"multipart/form-data",
      Authorization:`Bearer ${token}`,
    }
    )

    console.log("update SubSectionAPI response..",response)

    if(!response?.data?.success){
      throw new Error("Couldn't Update Lecture")
    }
  }catch(error){
    console.log("Update subsectionAPI error..",error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}


export const fetchInstructorCourses = async (token)=>{
  let result=[]
  const toastId=toast.loading("Loading your courses..")

  try{
    const response = await apiConnector(
      "GET",
      courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`
      }
    )
    console.log("INSTRUCTOR COURSES API RESPONSE....",response)

    if(!response?.data?.success){
      throw new Error("Couldnt fetch Instructor Courses")
    }

    result= response?.data?.data
  }catch(error){
    console.log("INSTRUCTOR COURSE API Error..",error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// DELETE A COURSE
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Deleting Course...")
  try {
    const response = await apiConnector(
      "DELETE", 
      courseEndpoints.DELETE_COURSE_API, 
      data, 
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("DELETE COURSE API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }

    toast.success("Course Deleted Successfully")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

// FETCH FULL COURSE DETAILS (Authenticated for Instructor Editing)
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading course details...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    // Return the massive object containing the course and all its nested videos
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// Tell the database the student finished a specific video
export const markLectureAsComplete = async (data, token) => {
  let result = false
  const toastId = toast.loading("Updating Progress...")
  try {
    const response = await apiConnector("POST", courseEndpoints.LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Lecture Completed!")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API ERROR............", error)
    toast.error(error.response?.data?.message || "Could not mark as complete")
    result = false
  }
  toast.dismiss(toastId)
  return result
}

// Submit the Star Rating and Review text
export const createRating = async (data, token) => {
  const toastId = toast.loading("Submitting Review...")
  let success = false
  try {
    const response = await apiConnector("POST", courseEndpoints.CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Review Submitted Successfully")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE_RATING_API ERROR............", error)
    toast.error(error.response?.data?.message || "Something went wrong")
  }
  toast.dismiss(toastId)
  return success
}
