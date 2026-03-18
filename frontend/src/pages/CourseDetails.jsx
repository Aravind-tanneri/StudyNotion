import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { addToCart } from "../slices/cartSlice"
import { toast } from "react-hot-toast"

import { BiInfoCircle } from 'react-icons/bi'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import CourseBuyCard from '../components/core/Catalog/CourseBuyCard'
import RatingStars from "../components/common/RatingStars"
import { getAverageRating, getRatingCount } from "../utils/ratings"

export default function CourseDetails() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { courseId } = useParams()

    const [courseData, setCourseData] = useState(null)
    const [activeSections, setActiveSections] = useState([])

    const avgRating = getAverageRating(courseData?.ratingAndReviews)
    const ratingCount = getRatingCount(courseData?.ratingAndReviews)

    // 1. Fetch the course data exactly like your old file
    useEffect(() => {
        const getCourseSpecificDetails = async () => {
            try {
                const res = await fetchCourseDetails(courseId)
                setCourseData(res?.data?.courseDetails)
            } catch (error) {
                console.log("Could not fetch Course Details")
            }
        }
        getCourseSpecificDetails()
    }, [courseId])

    // 2. Your Buy Course Logic
    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch)
            return
        }
        toast.error("Please log in to purchase the course")
        navigate("/login")
    }

    // 3. Your Add To Cart Logic
    const handleAddToCart = () => {
        if (user && user?.accountType === "Instructor") {
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }
        if (token) {
            dispatch(addToCart(courseData))
            return
        }
        toast.error("Please log in to add to cart")
        navigate("/login")
    }

    const toggleSection = (id) => {
        setActiveSections(
            activeSections.includes(id) 
            ? activeSections.filter((sec) => sec !== id) 
            : [...activeSections, id]
        )
    }

    // Loading Screen
    if (loading || !courseData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
                <div className="spinner text-white">Loading...</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-richblack-900 text-white min-h-screen pb-20">
            
            {/* HERO SECTION */}
            <div className="bg-richblack-800 relative">
                <div className="w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row py-10 lg:py-16 relative">
                    
                    <div className="lg:w-2/3 flex flex-col gap-4 pr-4 border-r border-transparent">
                        <p className="text-sm text-richblack-300">
                            Home / Learning / <span className="text-yellow-50">{courseData?.category?.name || "Category"}</span>
                        </p>
                        <h1 className="text-4xl font-semibold text-richblack-5 sm:text-[42px] leading-tight">
                            {courseData?.courseName}
                        </h1>
                        <p className="text-richblack-200 text-lg">
                            {courseData?.courseDescription}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 text-md">
                            <span className="text-yellow-50 font-bold">{avgRating.toFixed(1)}</span>
                            <RatingStars value={avgRating} size={18} />
                            <span className="text-richblack-25">({ratingCount} ratings)</span>
                            <span className="text-richblack-25 ml-2">{courseData?.studentsEnrolled?.length || 0} students</span>
                        </div>

                        <p className="text-richblack-25">
                            Created by {courseData?.instructor?.name || "Instructor"}
                        </p>
                        <div className="flex flex-wrap gap-5 text-lg text-richblack-25">
                            <p className="flex items-center gap-2">
                                <BiInfoCircle /> Created at {new Date(courseData?.createdAt).toLocaleDateString()}
                            </p>
                            <p className="flex items-center gap-2">
                                <HiOutlineGlobeAlt /> English
                            </p>
                        </div>
                    </div>

                    {/* Desktop Buy Card */}
                    <div className="hidden lg:block lg:w-1/3 absolute right-0 top-10 z-10">
                        <CourseBuyCard 
                            course={courseData} 
                            handleAddToCart={handleAddToCart} 
                            handleBuyCourse={handleBuyCourse} 
                        />
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT SECTION */}
            <div className="w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row py-10">
                
                <div className="lg:w-[65%] flex flex-col gap-10 pr-4 lg:pr-10">
                    
                    {/* Mobile Buy Card */}
                    <div className="lg:hidden w-full mb-8">
                        <CourseBuyCard 
                            course={courseData} 
                            handleAddToCart={handleAddToCart} 
                            handleBuyCourse={handleBuyCourse} 
                        />
                    </div>

                    {/* What you'll learn */}
                    <div className="border border-richblack-700 bg-richblack-800 p-8 rounded-md">
                        <p className="text-3xl font-semibold text-richblack-5 mb-5">What you'll learn</p>
                        <div className="text-richblack-50 leading-relaxed">
                            {/* Rendered directly as text since DB usually stores it as a single block */}
                            {courseData?.whatYouWillLearn}
                        </div>
                    </div>

                    {/* Course Content Accordion */}
                    <div className="flex flex-col gap-4">
                        <p className="text-3xl font-semibold text-richblack-5">Course content</p>
                        <div className="flex justify-between items-center text-sm text-richblack-200">
                            <p>{courseData?.courseContent?.length || 0} sections</p>
                            <button className="text-yellow-50" onClick={() => setActiveSections([])}>
                                Collapse all sections
                            </button>
                        </div>

                        <div className="border border-richblack-600 rounded-md">
                            {courseData?.courseContent?.map((section) => (
                                <div key={section._id} className="border-b border-richblack-600 last:border-none">
                                    
                                    <div 
                                        className="bg-richblack-700 px-5 py-4 flex justify-between cursor-pointer hover:bg-richblack-600 transition-all duration-200"
                                        onClick={() => toggleSection(section._id)}
                                    >
                                        <div className="flex items-center gap-3 text-richblack-5 font-medium">
                                            <MdOutlineArrowForwardIos className={`${activeSections.includes(section._id) ? "rotate-90" : ""} transition-all duration-200`} />
                                            <p>{section.sectionName}</p>
                                        </div>
                                        <p className="text-yellow-50 text-sm">{section?.subSection?.length || 0} lectures</p>
                                    </div>

                                    {activeSections.includes(section._id) && (
                                        <div className="bg-richblack-900 px-5 py-4 flex flex-col gap-3 text-sm text-richblack-50">
                                            {section?.subSection?.map((sub, i) => (
                                                <p key={i} className="flex items-center gap-2">
                                                    <span>🎥</span> {sub.title}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Author Profile */}
                    <div className="flex flex-col gap-4 mt-6">
                        <p className="text-3xl font-semibold text-richblack-5">Author</p>
                        <div className="flex items-center gap-4">
                            <img 
                                src={courseData?.instructor?.image} 
                                alt="Author" 
                                className="h-14 w-14 rounded-full object-cover" 
                            />
                            <p className="text-lg font-medium text-richblack-5">
                                {courseData?.instructor?.name || "Instructor"}
                            </p>
                        </div>
                        <p className="text-richblack-50 text-sm mt-2 leading-relaxed">
                            {courseData?.instructor?.additionalDetails?.about || "This instructor has not provided an about section yet."}
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )
}