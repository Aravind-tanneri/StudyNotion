import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-8'>
      
      {/* Become an Instructor Button */}
      <Link to={"/signup"}>
        <div className='group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
          <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>

      {/* Heading */}
      <div className='text-center text-4xl font-semibold mt-7'>
        Empower Your Future with <span className='font-bold text-blue-400'>Coding Skills</span>
      </div>

      {/* Sub Heading */}
      <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
      </div>

      {/* CTA Buttons */}
      <div className='flex flex-row gap-7 mt-8'>
        <Link to="/signup">
          <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold bg-yellow-400 text-black hover:scale-95 transition-all duration-200'>
            Learn More
          </button>
        </Link>
        <Link to="/login">
          <button className='text-center text-[13px] px-6 py-3 rounded-md font-bold bg-richblack-800 text-white hover:scale-95 transition-all duration-200'>
            Book a Demo
          </button>
        </Link>
      </div>

      {/* Hero Video/Image Placeholder */}
      <div className='mx-3 my-12 shadow-blue-200 shadow-[10px_-5px_50px_-5px]'>
          <div className='shadow-[20px_20px_rgba(255,255,255)]'>
             <div className='w-full h-[400px] bg-gray-800 flex items-center justify-center border border-gray-700'>
                <p className='text-gray-500'>[Hero Video Placeholder]</p>
             </div>
          </div>
      </div>
    </div>
  )
}

export default HeroSection