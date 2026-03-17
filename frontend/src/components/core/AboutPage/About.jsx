import React from 'react'
import aboutus1 from "../../../assets/Images/aboutus1.webp"
import aboutus2 from "../../../assets/Images/aboutus2.webp"
import aboutus3 from "../../../assets/Images/aboutus3.webp"
import FoundingStoryImage from "../../../assets/Images/FoundingStoryImage.jpg"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"


const About = () => {
  return (
    <div className='w-full text-white flex flex-col bg-richblack-900'>
      {/* 1. Top Section (Dark Grey Background) */}
      <section className='bg-richblack-800 pt-2 pb-52'>
        
      <p className='mx-auto w-full text-center my-5 text-xl font-medium text-gray-500'>About us</p>
        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-center text-center gap-4'>
          
          <header className='text-4xl font-semibold text-richblack-5 mx-auto lg:w-[50%]'>
            Driving Innovation in Online Education for a
            <span className='text-blue-gradient font-bold'>
              {" "}Brighter Future
            </span>
          </header>

          <p className='mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[70%]'>
            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
          </p>

        </div>
      </section>

      {/* 2. Bottom Section (Darker Black Background) */}
      <section className='flex flex-col bg-richblack-900 pb-20 '>
        
        {/* The Overlapping Images */}
        <div className='mx-auto w-2/3 max-w-maxContent flex flex-col lg:flex-row gap-5 lg:gap-8 justify-center items-center -mt-24 lg:-mt-44'>
          <img src={aboutus1} alt="about1" className='w-full lg:w-1/3' />
          <img src={aboutus2} alt="about2" className='w-full lg:w-1/3' />
          <img src={aboutus3} alt="about3" className='w-full lg:w-1/3' />
        </div>

        {/* The Quote Area */}
        <div className='mx-auto w-11/12 max-w-maxContent mt-12 lg:mt-16 text-center text-2xl lg:text-4xl font-semibold text-richblack-100 leading-snug lg:w-[90%]'>
          <FaQuoteLeft className="inline-block text-richblack-600 opacity-50 mr-2 -translate-y-3 text-2xl lg:text-4xl" />
          We are passionate about revolutionizing the way we learn. Our innovative platform
          <span className='text-blue-gradient font-bold'>
            {" "}combines technology
          </span>
          ,
          <span className='bg-gradient-to-br from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold'>
            {" "}expertise
          </span>
          , and community to create an
          <span className='bg-gradient-to-br from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold'>
            {" "}unparalleled educational experience. <FaQuoteRight className="inline-block text-richblack-600 opacity-50 mr-2 -translate-y-3 text-2xl lg:text-4xl" />
          </span>
        </div>

      </section>
       <div className='border-b-2 border-gray-900 my-5'></div>
      {/* Section 3: Founding Story, Vision, and Mission */}
        <section className='bg-richblack-900'>
        <div className='mx-auto w-5/6 max-w-maxContent pb-10 flex flex-col justify-between gap-5 text-richblack-500'>
            
            {/* Row 1: Founding Story */}
            <div className='flex flex-col lg:flex-row justify-between gap-5 items-center mt-2'>
                
                {/* Left Box - Text */}
                <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
                    <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>
                        Our Founding Story
                    </h1>
                    <p className='text-base font-normal text-richblack-300 lg:w-[95%]'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className='text-base font-normal text-richblack-300 lg:w-[95%]'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>

                {/* Right Box - Glowing Image */}
                <div className='lg:w-[40%]'>
                    <img 
                        src={FoundingStoryImage} 
                        alt="Founding Story" 
                        className='shadow-[0_0_30px_0] shadow-blue-600/40'
                    />
                </div>
            </div>

            {/* Row 2: Vision and Mission */}
            <div className='flex flex-col lg:flex-row justify-between lg:gap-10 mb-5'>
                
                {/* Left Box - Vision */}
                <div className='mb-4 flex lg:w-[40%] flex-col gap-5'>
                    <h1 className='bg-gradient-to-br from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>
                        Our Vision
                    </h1>
                    <p className='text-base font-normal text-richblack-300'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>

                {/* Right Box - Mission */}
                <div className='mb-4 flex lg:w-[40%] flex-col gap-5'>
                    <h1 className='bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>
                        Our Mission
                    </h1>
                    <p className='text-base font-medinormalum text-richblack-300'>
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>

            </div>

        </div>
        </section>

    </div>
  )
}

export default About