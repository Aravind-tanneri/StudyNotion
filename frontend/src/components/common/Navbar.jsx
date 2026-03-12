import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai"

const Navbar = () => {
    const location = useLocation();

    const matchRoute = (route) => {
        return location.pathname === route;
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-gray-900 transition-all duration-200'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                
                {/* Logo */}
                <Link to="/">
                    <h1 className='text-2xl font-bold text-white'>Study<span className='text-blue-400'>Notion</span></h1>
                </Link>

                {/* Navigation Links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        <li>
                            <Link to="/">
                                <p className={`${matchRoute("/") ? "text-yellow-25" : "text-richblack-25"}`}>Home</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog">
                                <p className={`${matchRoute("/catalog") ? "text-yellow-25" : "text-richblack-25"}`}>Catalog</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                <p className={`${matchRoute("/about") ? "text-yellow-25" : "text-richblack-25"}`}>About Us</p>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Login/Signup/Dashboard */}
                <div className='flex gap-x-4 items-center'>
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar