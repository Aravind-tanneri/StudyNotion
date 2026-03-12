import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../services/operations/authAPI'

const Login = () => {
  const navigate = useNavigate()
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    email: "", password: ""
  })

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log("Login Data:", formData)
    dispatch(login(formData.email, formData.password, navigate))
    navigate("/dashboard")
  }

  return (
    <div className='flex w-11/12 max-w-maxContent mx-auto mt-20 justify-center items-center text-white'>
      <div className='w-full max-w-[450px] p-8 border border-richblack-700 bg-richblack-800 rounded-lg shadow-sm shadow-blue-200'>
        <h1 className='text-3xl font-semibold mb-2'>Welcome Back</h1>
        <p className='text-[1.125rem] leading-[1.625rem] text-richblack-100 mb-8'>
          Build skills for today, tomorrow, and beyond.
        </p>

        <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-4'>
          <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
              Email Address <sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className='w-full rounded-[0.5rem] bg-richblack-900 p-[12px] text-richblack-5 border border-richblack-700 focus:outline-none focus:border-blue-400'
            />
          </label>

          <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
              Password <sup className='text-pink-200'>*</sup>
            </p>
            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className='w-full rounded-[0.5rem] bg-richblack-900 p-[12px] text-richblack-5 border border-richblack-700 focus:outline-none focus:border-blue-400'
            />
          </label>

          <button type="submit" className='mt-6 rounded-[8px] bg-yellow-400 py-[8px] px-[12px] font-medium text-richblack-900 hover:scale-95 transition-all duration-200'>
            Sign In
          </button>
        </form>

        <div className='mt-4 text-center'>
            <p className='text-sm text-richblack-300'>Don't have an account? <Link to="/signup" className='text-blue-400 hover:underline'>Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login