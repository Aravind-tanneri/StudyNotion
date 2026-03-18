import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// API & Service Imports
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCategoryPageDetails } from "../services/operations/pageAndComponentData"

// Component Imports
import CourseSlider from "../components/core/Catalog/CourseSlider"
import Course_Card from "../components/core/Catalog/CourseCard"

const Catalog = () => {
  const { catalogName } = useParams()
  
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [activeTab, setActiveTab] = useState(1) // State for Most Popular / New / Trending tabs

  // 1. Fetch all categories to find the ID that matches our URL slug
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        
        // Filter categories to find the exact match from our URL
        const category_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id
        
        setCategoryId(category_id)
      } catch (error) {
        console.log("Could not fetch Categories", error)
      }
    }
    getCategories()
  }, [catalogName])

  // 2. Fetch the actual course data once we have the correct category ID
  useEffect(() => {
    if (categoryId) {
      const getCategoryDetails = async () => {
        try {
          const res = await getCategoryPageDetails(categoryId)
          setCatalogPageData(res)
        } catch (error) {
          console.log(error)
        }
      }
      getCategoryDetails()
    }
  }, [categoryId])

  // Loading State
  if (!catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="box-content bg-richblack-900 text-white pb-20">
        
        {/* Hero Section */}
        <div className="bg-richblack-800 px-4 py-10 lg:py-16">
            <div className="mx-auto flex min-h-[260px] max-w-maxContent flex-col justify-center gap-4 lg:flex-row lg:justify-between lg:items-center w-11/12">
                
                {/* Left Details */}
                <div className="flex flex-col gap-4 lg:w-2/3">
                    <p className="text-sm text-richblack-300">
                        Home / Catalog / <span className="text-yellow-50 capitalize">{catalogPageData?.data?.selectedCategory?.name}</span>
                    </p>
                    <h1 className="text-3xl font-semibold text-richblack-5 capitalize">
                        {catalogPageData?.data?.selectedCategory?.name}
                    </h1>
                    <p className="max-w-[870px] text-richblack-200">
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>

                {/* Right Related Resources */}
                <div className="flex flex-col gap-2 lg:w-1/3 lg:pl-10 mt-6 lg:mt-0">
                    <h2 className="text-lg font-semibold text-richblack-5">Related resources</h2>
                    <ul className="list-disc pl-5 text-richblack-200 text-sm flex flex-col gap-2">
                        <li>Doc {catalogPageData?.data?.selectedCategory?.name}</li>
                        <li>Cheatsheets</li>
                        <li>Articles</li>
                        <li>Community Forums</li>
                        <li>Projects</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Main Content Sections */}
        <div className="mx-auto box-content w-11/12 max-w-maxContent py-12 flex flex-col gap-16">
            
            {/* Section 1: Courses to get you started (Using Selected Category) */}
            <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-semibold text-richblack-5">Courses to get you started</h2>
                <div className="flex border-b border-b-richblack-600 text-sm">
                    <p 
                        className={`px-4 py-2 cursor-pointer ${activeTab === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Most popular
                    </p>
                    <p 
                        className={`px-4 py-2 cursor-pointer ${activeTab === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"}`}
                        onClick={() => setActiveTab(2)}
                    >
                        New
                    </p>
                    <p 
                        className={`px-4 py-2 cursor-pointer ${activeTab === 3 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"}`}
                        onClick={() => setActiveTab(3)}
                    >
                        Trending
                    </p>
                </div>
                {/* Slider for Selected Category */}
                <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
            </div>

            {/* Section 2: Top courses in [Category Name] (Using Different Category data) */}
            <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-semibold text-richblack-5">
                    Top courses in {catalogPageData?.data?.differentCategory?.name || "Other Categories"}
                </h2>
                {/* Slider for Different Category */}
                <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
            </div>

            {/* Section 3: Frequently Bought Together (Using Most Selling Courses in a GRID) */}
            <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-semibold text-richblack-5">Frequently Bought Together</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* We use slice(0, 4) to ensure we only show a maximum of 4 cards in this grid */}
                    {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                        <Course_Card course={course} key={index} Height={"h-[300px]"} />
                    ))}
                </div>
            </div>

        </div>
    </div>
  )
}

export default Catalog