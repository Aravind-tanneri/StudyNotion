import React from 'react'
import { useLocation } from 'react-router-dom'

const TopPromoBanner = () => {
    const location = useLocation();

    const hiddenRoutes = ["/dashboard", "/view-course"];
    const shouldHide = hiddenRoutes.some((route) => location.pathname.includes(route));

    if (shouldHide) {
        return null;
    }

    return (
        <div className='flex h-[2.25rem] w-full items-center justify-center px-2 text-wrap bg-[#CBD5E1] text-center text-sm font-medium font-inter text-black'>
            PI DAY SALE: Get 31.4% off our Pro annual membership. <span className='font-bold'>USE STUDYNOTION</span>
        </div>
    )
}

export default TopPromoBanner