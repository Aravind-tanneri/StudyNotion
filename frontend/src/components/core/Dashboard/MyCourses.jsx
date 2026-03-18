import React,{useEffect,useState} from 'react'
import {VscAdd} from "react-icons/vsc"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {fetchInstructorCourses} from "../../../services/operations/courseDetailsAPI"
import CoursesTable from "./CoursesTable.jsx"

const MyCourses = () => {
    const {token}= useSelector((state)=>state.auth)
    const navigate= useNavigate()

    const [courses,setCourses]=useState([])

    useEffect(()=>{
        const fetchCourses =async()=>{
            const result = await fetchInstructorCourses(token)
            if(result)setCourses(result)
        }
        fetchCourses()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
      <p className="mb-3 text-sm text-richblack-300">
        Home / Dashboard / <span className="text-yellow-50">Courses</span>
      </p>
      {/* Header Section */}
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Course</h1>
        
        {/* Navigation Button */}
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="flex items-center gap-x-2 rounded-md bg-yellow-50 px-6 py-3 text-richblack-900 font-semibold hover:scale-95 transition-all duration-200"
        >
          <VscAdd className="text-lg" />
          New
        </button>
      </div>

      {/* The Table Section */}
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses
