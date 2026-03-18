import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi' // Using the correct icon we just fixed!
import { useDispatch, useSelector } from "react-redux"
import { getPasswordResetToken } from "../services/operations/authAPI"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false) // Toggle between the two screens
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      <div className='max-w-[500px] p-4 lg:p-8'>
        
        {/* Dynamic Heading */}
        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
          {!emailSent ? "Reset your password" : "Check email"}
        </h1>
        
        {/* Dynamic Paragraph */}
        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
          {!emailSent 
            ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`
          }
        </p>

        <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-4'>
          
          {/* Only show the input field if the email hasn't been sent yet */}
          {!emailSent && (
            <label className='w-full'>
              <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                Email Address <sup className='text-pink-200'>*</sup>
              </p>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className='w-full rounded-[0.5rem] border-b-2 border-richblack-700 bg-richblack-800 p-[12px] text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
              />
            </label>
          )}

          {/* Dynamic Button */}
          <button 
            type="submit" 
            disabled={loading}
            className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 transition-all duration-200 hover:scale-95 disabled:cursor-not-allowed disabled:opacity-75'
          >
            {!emailSent ? (loading ? "Sending..." : "Reset Password") : (loading ? "Sending..." : "Resend email")}
          </button>
        </form>

        <div className='mt-6 flex items-center justify-between'>
          <Link to="/login">
            <p className='flex items-center gap-x-2 text-richblack-5'>
              <BiArrowBack /> Back to login
            </p>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword