import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// We import our API connector and endpoints
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCategoryPageDetails } from "../services/operations/pageAndComponentData"

// We import our new Swiper slider component
import CourseSlider from "../components/core/Catalog/CourseSlider"

export default function Catalog() {
  const { catalogName } = useParams()
  
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  // We fetch all categories to find the ID that matches our URL slug
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        
        // We filter the categories to find the exact match from our URL
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

  // We fetch the actual course data once we have the correct category ID
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

  if (!catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="box-content bg-richblack-800 px-4 text-white">
      {/* Our Hero Section for the Category */}
      <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
        <p className="text-sm text-richblack-300">
          Home / Catalog /{" "}
          <span className="text-yellow-25 capitalize">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
        <p className="text-3xl text-richblack-5">
          {catalogPageData?.data?.selectedCategory?.name}
        </p>
        <p className="max-w-[870px] text-richblack-200">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>

      {/* Our Section for Courses to Buy */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">
          Courses to get you started
        </div>
        
        <div className="py-8">
          {/* We pass our fetched courses array directly into our slider component */}
          <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
        </div>
      </div>

      {/* Our Section for Top Courses (Reusing the slider!) */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-bold text-richblack-5 lg:text-4xl">
          Top Courses in {catalogPageData?.data?.selectedCategory?.name}
        </div>
        
        <div className="py-8">
          {/* We reuse our slider component for the top selling courses */}
          <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
        </div>
      </div>
    </div>
  )
}