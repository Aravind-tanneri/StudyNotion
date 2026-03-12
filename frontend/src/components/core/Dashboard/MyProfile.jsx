import React from 'react'

const MyProfile = () => {
  // Grab user details from local storage for a quick display
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className='text-white p-8 w-full'>
      <h1 className='text-3xl font-medium mb-14 text-richblack-5'>
        My Profile
      </h1>
      
      {/* Profile Card */}
      <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
        <div className='flex items-center gap-x-4'>
          <img 
            src={user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user?.name}`} 
            alt="profile" 
            className='aspect-square w-[78px] rounded-full object-cover'
          />
          <div className='space-y-1'>
            <p className='text-lg font-semibold text-richblack-5'>
              {user?.name || "Student Name"}
            </p>
            <p className='text-sm text-richblack-300'>
              {user?.email || "student@example.com"}
            </p>
          </div>
        </div>
        <button className='bg-yellow-400 text-black px-4 py-2 font-semibold rounded-md hover:scale-95 transition-all'>
          Edit
        </button>
      </div>
    </div>
  )
}

export default MyProfile