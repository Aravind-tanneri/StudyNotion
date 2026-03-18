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
        <ReviewSlider />
      
    </div>
  )
}

export default About
