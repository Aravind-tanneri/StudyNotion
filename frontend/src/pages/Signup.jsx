import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { setSignupData } from '../slices/authSlice';
import { sendOtp } from '../services/operations/authAPI';

import signupImg from '../assets/Images/signup.jpg';
import frameImg from '../assets/Images/frameImg.png';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Updated state to match the Figma design (First & Last Name)
  const [formData, setFormData] = useState({
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "", 
    confirmPassword: "", 
    contactNumber: ""
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    const signupData = { ...formData, accountType };
    console.log("Signup Data:", signupData);

    // Firing our Redux actions!
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));
  };

  return (
    <div className="mx-auto flex lg:w-5/6 w-11/12 max-w-maxContent flex-col-reverse justify-center gap-y-12 py-12 md:flex-row md:gap-y-0 gap-x-24 min-md:gap-x-36 min-h-[calc(100vh-3.5rem)] mt-10">
      
      {/* Left Column: Form Section */}
      <div className="mx-auto w-11/12 max-w-[500px] md:mx-0 text-white">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
          Welcome Back
        </h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
          <span className="text-richblack-100">Discover your passions,</span>{" "}
          <span className="font-edu-sa font-bold italic text-blue-gradient">
            Be Unstoppable
          </span>
        </p>

        {/* Tab Toggle for Student/Instructor */}
        <div className="my-6 flex max-w-max gap-x-1 rounded-full bg-richblack-800 p-1">
          <button
            className={`${
              accountType === "Student" 
              ? "bg-richblack-900 text-richblack-5" 
              : "bg-transparent text-richblack-200"
            } rounded-full py-2 px-5 transition-all duration-200`}
            onClick={() => setAccountType("Student")}
          >
            Student
          </button>
          <button
            className={`${
              accountType === "Instructor" 
              ? "bg-richblack-900 text-richblack-5" 
              : "bg-transparent text-richblack-200"
            } rounded-full py-2 px-5 transition-all duration-200`}
            onClick={() => setAccountType("Instructor")}
          >
            Instructors
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
          
          {/* First Name & Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                First Name <sup className="text-red-400">*</sup>
              </p>
              <input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                className="w-full border-b-2 border-richblack-700 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700"
              />
            </label>
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Last Name <sup className="text-red-400">*</sup>
              </p>
              <input
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                className="w-full border-b-2 border-richblack-700 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700"
              />
            </label>
          </div>

          {/* Email */}
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-red-400">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full border-b-2 border-richblack-700 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700"
            />
          </label>

          {/* Phone Number */}
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Phone Number <sup className="text-red-400">*</sup>
            </p>
            <div className="flex gap-4">
              <select
                name="countrycode"
                className="w-[80px] border-b-2 border-richblack-700 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                required
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleOnChange}
                placeholder="12345 67890"
                className="w-full border-b-2 border-richblack-700 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700"
              />
            </div>
          </label>

          {/* Passwords */}
          <div className="flex flex-col md:flex-row gap-4">
            <label className="relative w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Create Password <sup className="text-red-400">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full border-b-2 border-richblack-700 rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            
            <label className="relative w-full">
              <p className="mb-1 text-[0.875rem]  leading-[1.375rem] text-richblack-5">
                Confirm Password <sup className="text-red-400">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full border-b-2 border-richblack-700 rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 btn-grad w-full"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* Right Column: Image with Pattern Background */}
      <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
        <img
            src={frameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
            className="w-full aspect-square z-0 absolute top-4 left-4"
        />
        <img
            src={signupImg}
            alt="Students"
            width={558}
            height={504}
            loading="lazy"
            className="relative aspect-square z-10 w-full object-cover"
        />
      </div>
      
    </div>
  );
};

export default Signup;