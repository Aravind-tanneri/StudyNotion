import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'
import banner from "../../../assets/home/heroSection.mp4"
const HeroSection = () => {
  return (
    <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-4'>
      
      {/* Become an Instructor Button */}
      <Link to={"/signup"}>
        <div className='group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit border-b-1 border-gray-600 hover:border-none'>
          <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </div>
      </Link>

      {/* Heading */}
      <div className='text-center text-4xl font-semibold mt-7'>
        Empower Your Future with <span className='font-bold text-blue-gradient'>Coding Skills</span>
      </div>

      {/* Sub Heading */}
      <div className='mt-4 w-[90%] text-center text-lg font-bold max-md:font-medium max-md:text-md text-richblack-300'>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
      </div>

      {/* CTA Buttons */}
      <div className='flex flex-row gap-7 mt-8'>
        <Link to="/signup">
          <button className='btn-grad'>
            Learn More
          </button>
        </Link>
        <Link to="/login">
          <button className='btn-dark'>
            Book a Demo
          </button>
        </Link>
      </div>

      {/* Hero Video/Image Placeholder */}
      <div className='mx-3 my-12 shadow-blue-400/30 shadow-[10px_-5px_50px_-5px]'>
        <div className='relative mx-auto'>
          <div className='bg-white w-full h-full -bottom-[10px] -right-[10px] absolute '></div>
          <div className='w-full h-full bg-gray-800 flex items-center justify-center border border-gray-700'>
                <video
                    className="max-h-[400px] bg-gray-800 z-10 border-none"
                    muted
                    disablePictureInPicture
                    loop
                    controlsList="nodownload nofullscreen noremoteplayback"
                    autoPlay
                    playsInline
                    
                  >
                    {/* We use the imported 'banner' variable as the source */}
                    <source src={banner} type="video/mp4" />
                </video>
          </div>
        </div>
             
      </div>
    </div>
  )
}

export default HeroSection