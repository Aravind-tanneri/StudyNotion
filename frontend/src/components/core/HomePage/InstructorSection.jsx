import React from 'react'
import { Link } from 'react-router-dom'
import InstructorImage from "../../../assets/Images/Instructor.jpg"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col w-4/5 mx-auto lg:flex-row gap-8 items-center'>

        {/* Left Column - The Image */}
        <div className='w-full lg:w-[50%]'>
            <img 
                src={InstructorImage} 
                alt="Instructor"
                className='relative shadow-[-15px_-15px_0_0_white] mx-auto rounded-1 object-cover w-[90%] min-md:aspect-square min-md:mx-10 my-10'
            />
        </div>

        {/* Right Column - Text Content */}
        <div className='w-full lg:w-[40%] flex flex-col gap-10'>
            
            {/* Heading */}
            <div className='text-4xl font-semibold lg:w-[50%] font-inter text-white'>
                Become an
                <span className='text-blue-gradient font-bold'>
                    {" "}instructor
                </span>
            </div>

            {/* Subtext */}
            <p className='font-medium text-[16px] w-[80%] text-richblack-300 font-inter'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            {/* Yellow Button */}
            <div className='w-fit'>
                <Link to="/signup">
                    <button className='btn-grad'>
                        Start Teaching Today
                        <FaArrowRight />
                    </button>
                </Link>
            </div>

        </div>

      </div>
    </div>
  )
}

export default InstructorSection