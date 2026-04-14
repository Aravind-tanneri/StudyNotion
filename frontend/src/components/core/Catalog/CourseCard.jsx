import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../common/RatingStars"
import { getAverageRating, getRatingCount } from "../../../utils/ratings"
import fallbackImg from "../../../assets/Images/login.jpg"

// Fallback logic
const getValidThumbnail = (url, courseName) => {
  if (!url) return fallbackImg;
  // Replace dead DSA link
  if (url.includes("1515879218367")) return "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80"; 
  // Replace dead Aeroponics link
  if (url.includes("1558618666")) return "https://images.unsplash.com/photo-1530836369250-ef71a3a58910?w=800&q=80";
  return url;
}

const CourseCard = ({ course, Height }) => {
  const instructorName =
    course?.instructor?.name ||
    `${course?.instructor?.firstName || ""} ${course?.instructor?.lastName || ""}`.trim() ||
    "Instructor"

  const avgRating = getAverageRating(course?.ratingAndReviews)
  const ratingCount = getRatingCount(course?.ratingAndReviews)
  const studentCount = course?.studentsEnrolled?.length || 0

  // Get tag names (tag is populated as objects with .name)
  const tags = (course?.tag || [])
    .map(t => (typeof t === "string" ? t : t?.name))
    .filter(Boolean)
    .slice(0, 2)

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="flex flex-col gap-2 hover:scale-[1.03] transition-all duration-200 group">
          
          {/* Course Image & Badge */}
          <div className="relative rounded-xl overflow-hidden aspect-video">
            <img
              src={getValidThumbnail(course?.thumbnail, course?.courseName)}
              alt={course?.courseName || "Course thumbnail"}
              className={`w-full h-full object-cover group-hover:brightness-90 transition-all duration-300`}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = fallbackImg
              }}
            />
            {/* Bestseller Badge */}
            {course?.isBestseller && (
              <div className="absolute top-2 left-2 bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-xs font-bold">
                Bestseller
              </div>
            )}
            {/* Enrolled count overlay */}
            {studentCount > 0 && (
              <div className="absolute bottom-2 right-2 bg-richblack-900 bg-opacity-80 text-richblack-200 text-xs px-2 py-1 rounded-lg">
                {studentCount.toLocaleString()} students
              </div>
            )}
          </div>

          {/* Course Details */}
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-base font-semibold text-richblack-5 leading-snug line-clamp-2">
              {course?.courseName}
            </p>
            <p className="text-sm text-richblack-300">{instructorName}</p>
            
            {/* Rating Section */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-50 font-semibold text-sm">{avgRating.toFixed(1)}</span>
              <RatingStars value={avgRating} size={14} />
              <span className="text-richblack-400 text-xs">
                ({ratingCount.toLocaleString()})
              </span>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-richblack-700 text-richblack-300 text-xs px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Price */}
            <p className="text-lg text-richblack-5 font-bold mt-1">
              ₹{course?.price?.toLocaleString()}
            </p>
          </div>
          
        </div>
      </Link>
    </>
  )
}

export default CourseCard