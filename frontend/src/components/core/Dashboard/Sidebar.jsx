import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../services/operations/authAPI'
import { VscSignOut } from "react-icons/vsc"

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 h-[calc(100vh-3.5rem)]'>
      <div className='flex flex-col gap-y-4 px-8'>
        
        {/* Links */}
        <Link to="/dashboard/my-profile" className='text-richblack-300 hover:text-white transition-all'>
          My Profile
        </Link>
        <Link to="/dashboard/enrolled-courses" className='text-richblack-300 hover:text-white transition-all'>
          Enrolled Courses
        </Link>

        <Link to="/dashboard/add-course" className='text-richblack-300 hover:text-white transition-all'>
          Add Course
        </Link>

        <div className='mx-auto mt-6 mb-6 h-[1px] w-full bg-richblack-700'></div>
        
        {/* Settings and Logout */}
        <Link to="/dashboard/settings" className='text-richblack-300 hover:text-white transition-all mb-4'>
          Settings
        </Link>
        
        <button 
          onClick={() => dispatch(logout(navigate))}
          className='flex items-center gap-x-2 text-richblack-300 hover:text-white transition-all'
        >
          <VscSignOut className='text-lg'/>
          <span>Logout</span>
        </button>

      </div>
    </div>
  )
}

export default Sidebar