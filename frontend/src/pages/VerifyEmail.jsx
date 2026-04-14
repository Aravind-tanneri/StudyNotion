import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import { sendOtp, signUp } from '../services/operations/authAPI'
import { BiArrowBack } from 'react-icons/bi'
import { RxCountdownTimer } from 'react-icons/rx'

const VerifyEmail = () => {
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { signupData, loading } = useSelector((state) => state.auth)

    // Route protection: If there is no signup data, send back to signup
    useEffect(() => {
        if (!signupData) {
            navigate("/signup")
        }
    }, [navigate, signupData])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        
        const { accountType, firstName, lastName, email, password, confirmPassword, contactNumber } = signupData
        
        dispatch(
            signUp(accountType, `${firstName} ${lastName}`, email, password, confirmPassword, contactNumber, otp, navigate)
        )
    }

    return (
        <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
            {loading ? (
                <div className='text-white text-2xl font-semibold'>Loading...</div>
            ) : (
                <div className='max-w-[500px] p-4 lg:p-8 text-white'>
                    <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>
                        Verify email
                    </h1>
                    <p className='text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100'>
                        A verification code has been sent to you. Enter the code below
                    </p>
                    
                    <form onSubmit={handleOnSubmit}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className='w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 mx-auto'
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />
                        <button 
                            type="submit" 
                            className='w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 transition-all duration-200 hover:scale-95'
                        >
                            Verify email
                        </button>
                    </form>

                    <div className='mt-6 flex items-center justify-between'>
                        <Link to="/login">
                            <p className='text-richblack-5 flex items-center gap-x-2 hover:underline'>
                                <BiArrowBack /> Back to login
                            </p>
                        </Link>
                        <button 
                            className='flex items-center text-blue-100 gap-x-2 hover:underline'
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                        >
                            <RxCountdownTimer className="text-[20px]" /> Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail