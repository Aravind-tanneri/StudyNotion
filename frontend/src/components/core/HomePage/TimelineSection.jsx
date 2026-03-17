import React from 'react'
import Logo1 from "../../../assets/home/timeline/logo1.svg"
import Logo2 from "../../../assets/home/timeline/logo2.svg"
import Logo3 from "../../../assets/home/timeline/logo3.svg"
import Logo4 from "../../../assets/home/timeline/logo4.svg"
import timelineVideo from "../../../assets/home/timeline/timelineVideo.mp4"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
];


const TimelineSection = () => {
  return (
    <div className='font-inter bg-gray-50'>
      <div className='flex flex-col  mx-auto w-11/12 lg:w-4/5 lg:flex-row gap-15 pb-20 items-center'>

        {/* Left Box - The Timeline List */}
        <div className='w-full lg:w-[45%] flex flex-col gap-2 justify-center'>
            {
                timeline.map((element, index) => {
                    return (
                        <>
                        <div className='flex flex-row gap-6' key={index}>
                            <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-[#00000012] shadow-[0_0_62px_0]'>
                                <img src={element.Logo} alt="" />
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px] font-inter'>{element.heading}</h2>
                                <p className='text-base font-inter'>{element.Description}</p>
                            </div>
                        </div>
                        {(index<timeline.length-1&&(<div className='h-10 ml-6 w-[1px] border-l-2 border-dashed border-richblack-100'></div>))}
                        </>
                    )
                })
            }
        </div>

        {/* Right Box - Video and Green Stats Box */}
        <div className='relative'>
            
            <div className='bg-white w-full h-full -bottom-[10px] -right-[10px] absolute z-0 shadow-xl'></div>
            
            <video className="relative max-h-[400px] bg-gray-800 border-none shadow-[-10px_-10px_20px_0px_rgba(17,138,178,0.3)] z-10 "
                muted
                disablePictureInPicture
                loop
                controlsList="nodownload nofullscreen noremoteplayback"
                autoPlay>
                <source src={timelineVideo} type="video/mp4" />
            </video>

            {/* The Green Stats Box */}
            <div className='flex flex-col md:flex-row bg-caribbeangreen-900 text-white uppercase max-md:py-2 max-md:gap-0 py-7 gap-5 md:gap-0
                absolute md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%] z-20 max-md:bottom-0 max-md:left-0 md:w-fit'>
                            
                {/* Section 1 */}
                <div className='flex flex-row gap-5 max-md:gap-2 max-md:px-3 items-center lg:border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl max-md:text-xl font-bold max-md:semibold font-inter'>10</p>
                    <p className='text-caribbeangreen-300 text-sm font-inter'>Years of Experience</p>
                </div>

                {/* Section 2 */}
                <div className='flex gap-5 items-center max-md:gap-2 max-md:px-3 px-7'>
                    <p className='text-3xl max-md:text-xl font-bold max-md:semibold font-inter'>250</p>
                    <p className='text-caribbeangreen-300 text-sm font-inter'>Type of Courses</p>
                </div>
                
            </div>

        </div>

      </div>
    </div>
  )
}

export default TimelineSection