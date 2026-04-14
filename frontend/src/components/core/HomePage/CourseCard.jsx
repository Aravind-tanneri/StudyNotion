import React from 'react'
import { HiUsers } from "react-icons/hi"
import { ImTree } from "react-icons/im"

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div 
        className={`w-full max-w-[360px] lg:w-[30%] lg:max-w-none h-[300px] flex flex-col justify-between p-6 cursor-pointer transition-all duration-200
        ${currentCard === cardData.heading 
            ? "bg-white text-richblack-800 shadow-[12px_12px_0_0_#FFD60A]" // The Active Yellow Shadow Look
            : "bg-richblack-800 text-richblack-25" // The Inactive Dark Look
        }`}
        onClick={() => setCurrentCard(cardData.heading)}
    >
        {/* Top Section */}
        <div className='flex flex-col gap-3'>
            <h1 className={`font-bold text-[20px] 
                ${currentCard === cardData.heading ? "text-richblack-800" : "text-richblack-5"}`}>
                {cardData.heading}
            </h1>
            <p className='text-richblack-400'>
                {cardData.description}
            </p>
        </div>

        {/* Bottom Section with Dashed Line */}
        <div className={`flex justify-between px-2 py-4 border-t border-dashed 
            ${currentCard === cardData.heading ? "border-richblack-50 text-blue-300" : "border-richblack-600 text-richblack-300"}
        `}>
            <div className='flex items-center gap-2 text-[16px]'>
                <HiUsers />
                <p>{cardData.level}</p>
            </div>
            <div className='flex items-center gap-2 text-[16px]'>
                <ImTree />
                <p>{cardData.lessonNumber} Lesson</p>
            </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default CourseCard