import React from "react"
import ContactDetails from "../components/core/ContactPage/ContactDetails"
import ContactForm from "../components/common/ContactForm"
import ReviewSlider from "../components/common/ReviewSlider"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row mb-20">
        
        {/* Contact Details Sidebar */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form Container */}
        <div className="lg:w-[60%] border border-richblack-600 rounded-xl px-4 lg:px-7 flex gap-3 flex-col">
          <ContactForm heading="Got a Idea? We’ve got the skills. Let’s team up" subHeading="Tall us more about yourself and what you’re got in mind."/>
        </div>

      </div>

      <ReviewSlider />
      
    </div>
  )
}

export default Contact