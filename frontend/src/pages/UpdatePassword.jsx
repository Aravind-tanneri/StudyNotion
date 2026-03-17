import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa' // Imported FaRegCircle for the empty state

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetComplete, setResetComplete] = useState(false)

  // State to track our 5 specific password requirements
  const [validations, setValidations] = useState({
    lowercase: false,
    special: false,
    uppercase: false,
    minChar: false,
    number: false,
  })

  // Watch the password field and update validations dynamically
  useEffect(() => {
    const pass = formData.password
    setValidations({
      lowercase: /[a-z]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[^a-zA-Z0-9]/.test(pass), // Checks for any character that is NOT a letter or number
      minChar: pass.length >= 8,
    })
  }, [formData.password])

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    // Prevent submission if all criteria aren't met
    const allValid = Object.values(validations).every(Boolean)
    if (!allValid) {
        alert("Please ensure your password meets all requirements.")
        return
    }

    if(formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!")
        return
    }

    console.log("Password Data Submitted:", formData)
    setResetComplete(true)
  }

  // Array of requirement objects to map over easily
  const passwordRequirements = [
    { id: "lowercase", text: "one lowercase character" },
    { id: "special", text: "one special character" },
    { id: "uppercase", text: "one uppercase character" },
    { id: "minChar", text: "8 character minimum" },
    { id: "number", text: "one number" },
  ]

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      <div className='max-w-[500px] p-4 lg:p-8'>
        
        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
          {!resetComplete ? "Choose new password" : "Reset complete!"}
        </h1>
        
        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
          {!resetComplete 
            ? "Almost done. Enter your new password and we're all set."
            : "All done! We have sent an email to m***********@gmail.com to confirm"
          }
        </p>

        {!resetComplete ? (
          <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-4'>
            
            <label className='relative w-full'>
              <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                New password <sup className='text-pink-200'>*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="********"
                className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className='relative w-full'>
              <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                Confirm new password <sup className='text-pink-200'>*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                placeholder="********"
                className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            {/* Dynamic Password Requirements Checklist */}
            <div className='mt-2 flex flex-wrap gap-y-2'>
              {passwordRequirements.map((req, index) => (
                <div 
                  key={index} 
                  // Dynamically change text color based on validation state
                  className={`flex w-1/2 items-center gap-2 text-[12px] ${validations[req.id] ? "text-emerald-400" : "text-richblack-300"}`}
                >
                  {/* Swap the icon based on validation state */}
                  {validations[req.id] ? <FaCheckCircle className='text-[14px]' /> : <FaRegCircle className='text-[14px]' />}
                  {req.text}
                </div>
              ))}
            </div>

            <button 
              type="submit" 
              className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 transition-all duration-200 hover:scale-95'
            >
              Reset Password
            </button>
          </form>
        ) : (
          <Link to="/login">
            <button className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 transition-all duration-200 hover:scale-95'>
              Return to login
            </button>
          </Link>
        )}

        <div className='mt-6 flex items-center justify-between'>
          <Link to="/login">
            <p className='flex items-center gap-x-2 text-richblack-5 hover:underline'>
              <BiArrowBack /> Back to login
            </p>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default UpdatePassword