import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState("Student")
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "", contactNumber: ""
  })

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    const signupData = { ...formData, accountType }
    console.log("Signup Data:", signupData)

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))
    // We will trigger the OTP step here later!
  }

  return (
    <div className='flex w-11/12 max-w-maxContent mx-auto mt-12 justify-center items-center text-white mb-10'>
      <div className='w-full max-w-[500px] p-8 border border-richblack-700 bg-richblack-800 rounded-lg shadow-sm shadow-blue-200'>
        <h1 className='text-3xl font-semibold mb-2'>Join the Millions Learning to Code</h1>
        <p className='text-[1.125rem] leading-[1.625rem] text-richblack-100 mb-6'>
          Discover your passions, and be unstoppable.
        </p>

        {/* Tab for Student or Instructor */}
        <div className='flex bg-richblack-900 p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <button onClick={() => setAccountType("Student")} className={`${accountType === "Student" ? "bg-richblack-800 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}>
                Student
            </button>
            <button onClick={() => setAccountType("Instructor")} className={`${accountType === "Instructor" ? "bg-richblack-800 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}>
                Instructor
            </button>
        </div>

        <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-4'>
          <label>
            <p className='text-[0.875rem] text-richblack-5 mb-1'>Full Name <sup className='text-pink-200'>*</sup></p>
            <input required type="text" name="name" value={formData.name} onChange={handleOnChange} placeholder="Enter full name" className='w-full rounded-[0.5rem] bg-richblack-900 p-[12px] text-richblack-5 border border-richblack-700 focus:outline-none focus:border-blue-400' />
          </label>

          <label>
            <p className='text-[0.875rem] text-richblack-5 mb-1'>Email Address <sup className='text-pink-200'>*</sup></p>
            <input required type="email" name="email" value={formData.email} onChange={handleOnChange} placeholder="Enter email address" className='w-full rounded-[0.5rem] bg-richblack-900 p-[12px] text-richblack-5 border border-richblack-700 focus:outline-none focus:border-blue-400' />
          </label>

          <label>
            <p className='text-[0.875rem] text-richblack-5 mb-1'>Contact Number <sup className='text-pink-200'>*</sup></p>
            <input required type="text" name="contactNumber" value={formData.contactNumber} onChange={handleOnChange} placeholder="Enter contact number" className='w-full rounded-[0.5rem] bg-richblack-900 p-[12px] text-richblack-5 border border-richblack-700 focus:outline-none focus:border-blue-400' />
          </label>

          <div className='flex gap-x-4'>
            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1'>Create Password <sup className='text-pink-200'>*</sup></p>
                <input required type="password" name="password" value={formData.password} onChange={handleOnChange} placeholder="Enter Password" className='w-full rounded-[0.5rem] bg-richblack-900 p-[12px] text-richblack-5 border border-richblack-700 focus:outline-none focus:border-blue-400' />
            </label>
            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1'>Confirm Password <sup className='text-pink-200'>*</sup></p>
                <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleOnChange} placeholder="Confirm Password" className='w-full rounded-[0.5rem] bg-richblack-900 p-[12px] text-richblack-5 border border-richblack-700 focus:outline-none focus:border-blue-400' />
            </label>
          </div>

          <button type="submit" className='mt-6 rounded-[8px] bg-yellow-400 py-[8px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200'>
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup