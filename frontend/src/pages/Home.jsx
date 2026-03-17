import React from 'react'
import HeroSection from '../components/core/HomePage/HeroSection'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ReviewSlider from '../components/common/ReviewSlider'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'

const Home = () => {
  return (
    <div className='bg-richblack-900'>
      <div className='relative mx-auto flex flex-col w-11/12 min-lg:w-4/5 max-w-maxContent items-center text-white justify-between'>
        <HeroSection />

        {/* Code Section 1 */}
        <div className='w-full'>
            <CodeBlocks 
                position={"flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your <span className='text-blue-gradient'>Coding Potential</span> with our online courses.
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctaBtn1={{ btnText: "Try it Yourself", active: true, linkto: "/signup" }}
                ctaBtn2={{ btnText: "Learn More", active: false, linkto: "/login" }}
                codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a></nav>\n</body>\n</html>`}
                codeColor={"text-yellow-50"}
                backgroundGradient={"bg-[linear-gradient(123.77deg,#8A2BE2_-6.46%,#FFA500_59.04%,#F8F8FF_124.53%)]"}
            />
        </div>

        {/* Code Section 2 */}
        <div className='w-full'>
            <CodeBlocks 
                position={"flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start <span className='text-blue-gradient'>Coding in Seconds</span>
                    </div>
                }
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctaBtn1={{ btnText: "Continue Lesson", active: true, linkto: "/signup" }}
                ctaBtn2={{ btnText: "Learn More", active: false, linkto: "/login" }}
                codeblock={`import React from 'react';\nimport Button from './Button';\n\nconst App = () => {\n  return (\n    <div>\n      <h1>Hello World</h1>\n      <Button text="Click Me!" />\n    </div>\n  );\n};\n\nexport default App;`}
                codeColor="text-[#FF7F50]"
                backgroundGradient={"bg-[linear-gradient(118.19deg,#1FA2FF_-3.62%,#12D8FA_50.44%,#A6FFCB_104.51%)]"}
            />
        </div>
      </div>
      <ExploreMore/>
        <div className='homepage_bg -mt-50 lg:mt-0'></div>

        <div className='flex flex-col px-5 lg:px-30 mx-auto bg-gray-50 font-inter justify-center pt-10 lg:flex-row gap-5 pb-10'>
            <div className='text-4xl font-semibold max-md:text-start lg:w-[70%] text-richblack-600 '>
                <span>Get the skills you need for a</span>
                <span className='text-blue-gradient ml-2 font-bold'>
                    job that is in demand.
                </span>
            </div>

            <div className='flex flex-col gap-10 lg:w-[40%] items-start'>
                <div className='text-[16px]'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
                <button className='btn-grad'>
                    Learn More
                </button>
            </div>
        </div>

        <TimelineSection />
        <LearningLanguageSection/>
        <InstructorSection/>

        <div className='relative mx-auto my-8 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
            <h1 className='text-center text-4xl mt-6 font-semibold -mb-4'>
                Reviews from other learners
            </h1>
            <div className='w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
                <ReviewSlider />
            </div>
        </div>



    </div>
  )
}

export default Home