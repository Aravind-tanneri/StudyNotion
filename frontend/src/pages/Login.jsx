import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { login } from '../services/operations/authAPI';
import loginImg from '../assets/Images/login.jpg'; 
import frameImg from '../assets/Images/frameImg.png'; 

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // State to manage account type toggle
    const [accountType, setAccountType] = useState('student');
    
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    
    // State to store form input values
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // Firing off your Redux action just like in your old file!
        dispatch(login(formData.email, formData.password, navigate));
    };

    return (
        <div className="mx-auto flex  min-lg:w-5/6 w-11/12 max-w-maxContent flex-col-reverse justify-center gap-y-12 py-12 md:flex-row md:gap-y-0 min-lg:gap-x-36 max-lg:gap-x-12 min-h-[calc(100vh-3.5rem)] mt-10">
            
            {/* Left Column: Form Section */}
            <div className="mx-auto w-11/12 max-w-[450px] md:mx-0 text-white">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                    Welcome Back
                </h1>
                <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                    <span className="text-richblack-100">Build skills for today, tomorrow, and beyond.</span>{" "}
                    <span className="font-edu-sa font-bold italic text-blue-gradient">
                        Education to future-proof our career.
                    </span>
                </p>

                {/* Tab Toggle for Student/Instructor */}
                <div className="my-6 flex max-w-max gap-x-1 rounded-full bg-richblack-800 p-1">
                    <button
                        className={`${
                            accountType === "student" 
                            ? "bg-richblack-900 text-richblack-5" 
                            : "bg-transparent text-richblack-200"
                        } rounded-full py-2 px-5 transition-all duration-200`}
                        onClick={() => setAccountType("student")}
                    >
                        Student
                    </button>
                    <button
                        className={`${
                            accountType === "instructor" 
                            ? "bg-richblack-900 text-richblack-5" 
                            : "bg-transparent text-richblack-200"
                        } rounded-full py-2 px-5 transition-all duration-200`}
                        onClick={() => setAccountType("instructor")}
                    >
                        Instructors
                    </button>
                </div>

                {/* Login Form */}
                <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-4">
                    
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
                            className="w-full border-b-2 border-richblack-700  rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700"
                        />
                    </label>

                    <label className="relative w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Password <sup className="text-red-400">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleOnChange}
                            placeholder="Enter Password"
                            className="w-full rounded-[0.5rem] border-b-2 border-richblack-700 bg-richblack-800 p-[12px] pr-10 text-richblack-5 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] outline-none focus:bg-richblack-700"
                        />
                        {/* Eye Icon for Password Visibility */}
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
                        
                        {/* Forgot Password Link */}
                        <div className="mt-1 flex justify-end">
                            <Link to="/forgot-password">
                                <span className="max-w-max text-xs text-blue-400 cursor-pointer hover:underline">
                                    Forgot password
                                </span>
                            </Link>
                        </div>
                    </label>

                    <button
                        type="submit"
                        className="mt-6 w-full btn-grad"
                    >
                        Sign in
                    </button>
                </form>

                {/* Don't have an account section */}
                <div className='mt-4 text-center'>
                    <p className='text-sm text-richblack-300'>
                        Don't have an account? <Link to="/signup" className='text-blue-400 hover:underline'>Sign up</Link>
                    </p>
                </div>
            </div>

            {/* Right Column: Image with Pattern Background */}
            <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            
              {/* The Frame */}
              <img
                  src={frameImg}
                  alt="Pattern"
                  width={558}
                  height={504}
                  loading="lazy"
                  className="w-full aspect-square z-0 top-4 left-4 absolute"
              />
              
              {/* The Student Image */}
              <img
                  src={loginImg}
                  alt="Students"
                  width={558}
                  height={504}
                  loading="lazy"
                  className="z-10 w-full relative aspect-square object-cover z-10"
              />
            </div>
        </div>
    );
};

export default Login;