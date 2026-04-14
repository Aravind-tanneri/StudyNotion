import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ContactForm = ({ heading, subHeading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    // Simulate a short delay like a real API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success("Message sent! We'll get back to you soon.")
    reset()
  }

  return (
    <div className='mx-auto flex flex-col items-center justify-center mt-10 mb-20 px-3'>

      {/* Header section */}
      <div className='text-center mb-10 mx-auto'>
        <h1 className='text-4xl min-md:max-w-[80%] mx-auto max-md:text-2xl font-semibold text-richblack-5 mb-3'>
          {heading}
        </h1>
        <p className='text-richblack-300'>{subHeading}</p>
      </div>

      {/* Form section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-7 w-full lg:w-[500px]'
      >

        {/* First Name & Last Name */}
        <div className='flex flex-col lg:flex-row gap-5'>
          <div className='flex flex-col w-full'>
            <label htmlFor='firstName' className='mb-1 text-[14px] text-richblack-5'>
              First Name <span className='text-pink-200'>*</span>
            </label>
            <input
              type='text'
              id='firstName'
              placeholder='Enter first name'
              className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
              {...register('firstName', { required: 'First name is required' })}
            />
            {errors.firstName && (
              <span className='text-pink-200 text-xs mt-1'>{errors.firstName.message}</span>
            )}
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor='lastName' className='mb-1 text-[14px] text-richblack-5'>
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              placeholder='Enter last name'
              className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
              {...register('lastName')}
            />
          </div>
        </div>

        {/* Email */}
        <div className='flex flex-col'>
          <label htmlFor='email' className='mb-1 text-[14px] text-richblack-5'>
            Email Address <span className='text-pink-200'>*</span>
          </label>
          <input
            type='email'
            id='email'
            placeholder='Enter email address'
            className='bg-richblack-800 rounded-[0.5rem] border-b border-richblack-500 text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <span className='text-pink-200 text-xs mt-1'>{errors.email.message}</span>
          )}
        </div>

        {/* Phone Number */}
        <div className='flex flex-col'>
          <label htmlFor='phonenumber' className='mb-1 text-[14px] text-richblack-5'>
            Phone Number
          </label>
          <div className='flex flex-row gap-5'>
            <div className='flex flex-col w-[90px]'>
              <select
                id='countrycode'
                className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
                {...register('countrycode')}
              >
                <option value='+91'>+91</option>
                <option value='+1'>+1</option>
                <option value='+44'>+44</option>
                <option value='+61'>+61</option>
              </select>
            </div>
            <div className='flex w-full flex-col'>
              <input
                type='text'
                maxLength={10}
                id='phonenumber'
                placeholder='12345 67890'
                className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700'
                {...register('phonenumber', {
                  minLength: { value: 10, message: 'Phone number must be 10 digits' },
                  maxLength: { value: 10, message: 'Phone number must be 10 digits' },
                  pattern: { value: /^[0-9]+$/, message: 'Only digits allowed' },
                })}
              />
              {errors.phonenumber && (
                <span className='text-pink-200 text-xs mt-1'>{errors.phonenumber.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className='flex flex-col'>
          <label htmlFor='message' className='mb-1 text-[14px] text-richblack-5'>
            Message <span className='text-pink-200'>*</span>
          </label>
          <textarea
            id='message'
            cols='30'
            rows='7'
            placeholder='Enter message'
            className='bg-richblack-800 border-b border-richblack-500 rounded-[0.5rem] text-richblack-5 w-full p-[12px] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700 resize-none'
            {...register('message', { required: 'Message cannot be empty' })}
          />
          {errors.message && (
            <span className='text-pink-200 text-xs mt-1'>{errors.message.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='btn-grad disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

      </form>
    </div>
  )
}

export default ContactForm