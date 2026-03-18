import React from "react"
import { FiEdit2 } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

const MyProfile = () => {
  // Grab user details from local storage for a quick display
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  const displayName = user?.name || "Student Name"
  const [firstName, ...rest] = displayName.split(" ")
  const lastName = rest.join(" ")

  return (
    <div className="w-full text-white">
      <p className="mb-3 text-sm text-richblack-300">
        Home / Dashboard / <span className="text-yellow-50">My Profile</span>
      </p>

      <h1 className="text-3xl font-medium mb-10 text-richblack-5">My Profile</h1>
      
      {/* Profile Card */}
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img 
            src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.name}`} 
            alt="profile" 
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {displayName}
            </p>
            <p className="text-sm text-richblack-300">
              {user?.email || "student@example.com"}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center gap-2 rounded-md bg-yellow-50 px-4 py-2 font-semibold text-richblack-900 hover:scale-95 transition-all"
        >
          <FiEdit2 />
          Edit
        </button>
      </div>

      {/* Personal Details Card */}
      <div className="mt-8 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex items-center gap-2 rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 hover:scale-95 transition-all"
          >
            <FiEdit2 />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-10 md:grid-cols-2">
          <div>
            <p className="text-xs text-richblack-400">First Name</p>
            <p className="text-sm text-richblack-5">{firstName || "-"}</p>
          </div>
          <div>
            <p className="text-xs text-richblack-400">Last Name</p>
            <p className="text-sm text-richblack-5">{lastName || "-"}</p>
          </div>
          <div>
            <p className="text-xs text-richblack-400">Email</p>
            <p className="text-sm text-richblack-5">{user?.email || "-"}</p>
          </div>
          <div>
            <p className="text-xs text-richblack-400">Phone Number</p>
            <p className="text-sm text-richblack-5">
              {user?.contactNumber ? `(+91) ${user.contactNumber}` : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile