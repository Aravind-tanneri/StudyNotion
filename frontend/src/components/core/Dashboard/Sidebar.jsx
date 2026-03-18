import React, { useState } from 'react'
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI'

// Import our reusable link component and the modal
import SidebarLink from './SidebarLink'
import ConfirmationModal from '../../common/ConfirmationModal'

// Hardcoding the links here for you, but usually, this comes from a separate data file!
const sidebarLinks = [
  { id: 1, name: "My Profile", path: "/dashboard/my-profile", icon: "VscAccount" },
  { id: 2, name: "Dashboard", path: "/dashboard/instructor", type: "Instructor", icon: "VscDashboard" },
  { id: 3, name: "My Courses", path: "/dashboard/my-courses", type: "Instructor", icon: "VscVm" },
  { id: 4, name: "Add Course", path: "/dashboard/add-course", type: "Instructor", icon: "VscAdd" },
  { id: 5, name: "Enrolled Courses", path: "/dashboard/enrolled-courses", type: "Student", icon: "VscMortarBoard" },
  { id: 6, name: "Cart", path: "/dashboard/cart", type: "Student", icon: "VscHistory" },
]

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // State to control our logout modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner text-white">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 h-[calc(100vh-3.5rem)]'>
        <div className='flex flex-col'>
          
          {/* Dynamic Links based on Account Type */}
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}

          <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'></div>
          
          {/* Settings Link */}
          <SidebarLink 
            link={{ name: "Settings", path: "/dashboard/settings" }} 
            iconName="VscSettingsGear" 
          />
          
          {/* Logout Button triggering the Modal */}
          <button 
            onClick={() => 
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className='px-8 py-2 text-sm font-medium text-richblack-300 hover:text-richblack-5 transition-all mt-2'
          >
            <div className='flex items-center gap-x-2'>
              <VscSignOut className='text-lg'/>
              <span>Logout</span>
            </div>
          </button>

        </div>
      </div>

      {/* Render the modal ONLY if confirmationModal state has data */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default Sidebar