import React from 'react'
import { FaShareSquare } from 'react-icons/fa'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import fallbackImg from "../../../assets/Images/login.jpg"

// Fallback logic for broken Unsplash links in the demo DB
const getValidThumbnail = (url) => {
  if (!url) return fallbackImg;
  if (url.includes("1515879218367")) return "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80"; 
  if (url.includes("1558618666")) return "https://images.unsplash.com/photo-1530836369250-ef71a3a58910?w=800&q=80";
  return url;
}

// Notice we added handleAddToCart and handleBuyCourse as props here!
const CourseBuyCard = ({ course, handleAddToCart, handleBuyCourse }) => {
    
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Course Link Copied to Clipboard!")
    }

    return (
        <div className='flex flex-col gap-4 rounded-xl bg-richblack-700 p-4 text-richblack-5 shadow-lg'>
            
            <img 
                src={getValidThumbnail(course?.thumbnail)} 
                alt="course thumbnail" 
                className='max-h-[300px] min-h-[180px] w-full rounded-xl object-cover'
                onError={(e) => {
                    e.target.onerror = null
                    e.target.src = fallbackImg
                }}
            />
            
            <div className='flex flex-col gap-4 px-2'>
                <div className='text-3xl font-semibold mt-2'>
                    Rs. {course?.price}
                </div>
                
                <div className='flex flex-col gap-3'>
                    {/* Wired up the Add to Cart Prop */}
                    <button 
                        onClick={handleAddToCart} 
                        className='w-full rounded-md bg-yellow-50 py-3 font-semibold text-richblack-900 hover:scale-95 transition-all duration-200'
                    >
                        Add to Cart
                    </button>
                    {/* Wired up the Buy Now Prop */}
                    <button 
                        onClick={handleBuyCourse} 
                        className='w-full rounded-md bg-richblack-800 py-3 font-semibold text-richblack-5 border border-richblack-700 hover:bg-richblack-900 hover:scale-95 transition-all duration-200'
                    >
                        Buy now
                    </button>
                </div>
                
                <p className='text-center text-sm text-richblack-25'>
                    30-Day Money-Back Guarantee
                </p>
                
                <div className='mt-2'>
                    <p className='my-2 text-xl font-semibold'>This course includes:</p>
                    <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                        {/* Standard fallback if instructions aren't an array in your DB yet */}
                        <p className='flex items-center gap-2'><BsFillCaretRightFill /> 8 hours on-demand video</p>
                        <p className='flex items-center gap-2'><BsFillCaretRightFill /> Full Lifetime access</p>
                        <p className='flex items-center gap-2'><BsFillCaretRightFill /> Access on Mobile and TV</p>
                        <p className='flex items-center gap-2'><BsFillCaretRightFill /> Certificate of completion</p>
                    </div>
                </div>
                
                <div className='text-center'>
                    <button 
                        onClick={handleShare}
                        className='mx-auto flex items-center gap-2 py-4 text-yellow-100 hover:text-yellow-50' 
                    >
                        <FaShareSquare /> Share
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CourseBuyCard