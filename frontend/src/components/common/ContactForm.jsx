import React from 'react'

const ContactForm = ({heading,subHeading}) => {
  return (
    <div className='mx-auto flex flex-col items-center justify-center mt-10 mb-20 px-3'>
        
        {/* Header section */}
        <div className='text-center mb-10 mx-auto'>
            <h1 className='text-4xl min-md:max-w-[80%] mx-auto max-md:text-2xl font-semibold text-richblack-5 mb-3'>
                {heading}
            </h1>
            <p className='text-richblack-300'>
                {subHeading}
            </p>
        </div>

        {/* Form section */}
        <form className='flex flex-col gap-7 w-full lg:w-[500px]'>
            
            {/* First Name & Last Name */}
            <div className='flex flex-col lg:flex-row gap-5'>
                <div className='flex flex-col w-full'>
                    <label htmlFor='firstName' className='mb-1 text-[14px] text-richblack-5'>First Name</label>
                    <input 
                        type='text' 
                        name='firstName' 
                        id='firstName' 
                        placeholder='Enter first name' 
                        className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor='lastName' className='mb-1 text-[14px] text-richblack-5'>Last Name</label>
                    <input 
                        type='text' 
                        name='lastName' 
                        id='lastName' 
                        placeholder='Enter last name' 
                        className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
                    />
                </div>
            </div>

            {/* Email */}
            <div className='flex flex-col'>
                <label htmlFor='email' className='mb-1 text-[14px] text-richblack-5'>Email Address</label>
                <input 
                    type='email' 
                    name='email' 
                    id='email' 
                    placeholder='Enter email address' 
                    className='bg-richblack-800 rounded-[0.5rem] border-b border-richblack-500 text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
                />
            </div>

            {/* Phone Number */}
            <div className='flex flex-col'>
                <label htmlFor='phonenumber' className='mb-1 text-[14px] text-richblack-5'>Phone Number</label>
                <div className='flex flex-row gap-5'>
                    {/* Country Code Dropdown */}
                    <div className='flex flex-col w-[90px]'>
                        <select 
                            name='countrycode' 
                            id='countrycode' 
                            className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
                        >
                            <option value='+91'>+91</option>
                            <option value='+1'>+1</option>
                            <option value='+44'>+44</option>
                            <option value='+61'>+61</option>
                        </select>
                    </div>
                    {/* Number Input */}
                    <div className='flex w-full flex-col'>
                        <input 
                            type='text'
                            maxLength={10} 
                            name='phonenumber' 
                            id='phonenumber' 
                            placeholder='12345 67890' 
                            className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
                        />
                    </div>
                </div>
            </div>

            {/* Message */}
            <div className='flex flex-col'>
                <label htmlFor='message' className='mb-1 text-[14px] text-richblack-5'>Message</label>
                <textarea 
                    name='message' 
                    id='message' 
                    cols='30' 
                    rows='7' 
                    placeholder='Enter message' 
                    className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700 resize-none'
                />
            </div>

            {/* Submit Button */}
            <button 
                type='submit' 
                className='btn-grad'
            >
                Send Message
            </button>

        </form>
    </div>
  )
}

export default ContactForm