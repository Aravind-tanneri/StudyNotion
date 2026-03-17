import React from 'react'
import know_your_progress from "../../../assets/Images/Know_Your_Progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg"

const LearningLanguageSection = () => {
  return (
    <div className='pt-[70px] mb-12 flex flex-col gap-5 items-center bg-white'>
      
      {/* 1. Heading Section */}
      <div className='text-4xl font-semibold text-center text-richblack-900'>
        Your swiss knife for
        <span className='text-blue-gradient font-bold ml-2'>
          learning any language
        </span>
      </div>

      <div className='text-center text-richblack-700 mx-auto text-base font-medium w-full lg:w-[70%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

      {/* 2. The Overlapping Images Section */}
      <div className='flex flex-col overflow-hidden max-md:mt-10 -my-10  relative lg:flex-row items-center justify-center w-full'>
        
        {/* Left Image (Pulled Right on Desktop, Pulled Down on Mobile) */}
        <img 
            src={know_your_progress} 
            alt="KnowYourProgress" 
            className='object-contain relative lg:-mr-32 max-md:-mb-10 z-0'
        />

        {/* Center Image (Sits on top of the others) */}
        <img 
            src={compare_with_others} 
            alt="CompareWithOthers" 
            className='object-contain relative z-10'
        />

        {/* Right Image (Pulled Left on Desktop, Pulled Up on Mobile) */}
        <img 
            src={plan_your_lessons} 
            alt="PlanYourLessons" 
            className='object-contain relative lg:-ml-36 max-md:-mt-16 z-20'
        />

      </div>

      {/* 3. The Button */}
      <div className='w-fit pb-10'>
        <button className='btn-grad'>
            Learn More
        </button>
      </div>

    </div>
  )
}

export default LearningLanguageSection