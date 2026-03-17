import React from 'react'
import AboutSections from '../components/core/AboutPage/About'
import ReviewSlider from '../components/common/ReviewSlider'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactForm from '../components/common/ContactForm'
const About = () => {
  return (
    <div className='bg-richblack-900'>
        <AboutSections/>
        <StatsComponent/>
        <LearningGrid/>
        <ContactForm heading="Get in Touch" subHeading="We\’d love to here for you, Please fill out this form."/>

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

export default About
