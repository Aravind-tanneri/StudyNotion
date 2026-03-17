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

export default Contact