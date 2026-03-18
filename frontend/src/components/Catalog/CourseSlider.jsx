import React from "react"
// We import our Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { useNavigate } from "react-router-dom"

// We import our Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

// We import the required modules for our slider features
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

export default function CourseSlider({ Courses }) {
  const navigate = useNavigate()

  return (
    <>
      {/* We check if we have courses in our array, otherwise we show a fallback message */}
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // We register our modules here
          modules={[FreeMode, Pagination, Autoplay]}
          // We configure our breakpoints so our slider adapts to mobile and desktop
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {/* We map through our courses and create a slide for each one */}
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              {/* We build our individual clickable course card */}
              <div
                onClick={() => navigate(`/courses/${course._id}`)}
                className="flex flex-col gap-2 cursor-pointer hover:scale-[1.02] transition-all duration-200"
              >
                <img
                  src={course.thumbnail}
                  alt="course thumbnail"
                  className="h-[250px] w-full rounded-xl object-cover"
                />
                <div className="flex flex-col gap-1 px-1 py-3">
                  <p className="text-xl text-richblack-5">{course.courseName}</p>
                  <p className="text-sm text-richblack-50">
                    {course?.instructor?.name ||
                      `${course?.instructor?.firstName || ""} ${course?.instructor?.lastName || ""}`.trim() ||
                      "Instructor"}
                  </p>
                  <p className="text-xl text-yellow-50">Rs. {course.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}