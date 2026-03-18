import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../common/RatingStars"
import { getAverageRating, getRatingCount } from "../../../utils/ratings"

const CourseCard = ({ course, Height }) => {
  const instructorName =
    course?.instructor?.name ||
    `${course?.instructor?.firstName || ""} ${course?.instructor?.lastName || ""}`.trim() ||
    "Instructor"

  const avgRating = getAverageRating(course?.ratingAndReviews)
  const ratingCount = getRatingCount(course?.ratingAndReviews)

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="flex flex-col gap-2 hover:scale-[1.03] transition-all duration-200">
          
          {/* Course Image & Badge */}
          <div className="relative rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full rounded-xl object-cover`}
            />
            {/* Optional Bestseller Badge - assuming we pass it in the course object */}
            {course?.isBestseller && (
              <div className="absolute top-2 left-2 bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-xs font-bold">
                Bestseller
              </div>
            )}
          </div>

          {/* Course Details */}
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-xl text-richblack-5 font-medium">
              {course?.courseName}
            </p>
            <p className="text-sm text-richblack-300">
              {instructorName}
            </p>
            
            {/* Rating Section */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-50">{avgRating.toFixed(1)}</span>
              <RatingStars value={avgRating} size={14} />
              <span className="text-richblack-400 text-sm">
                ({ratingCount} ratings)
              </span>
            </div>
            
            {/* Price */}
            <p className="text-xl text-richblack-5 font-semibold">
              Rs. {course?.price}
            </p>
          </div>
          
        </div>
      </Link>
    </>
  )
}

export default CourseCard