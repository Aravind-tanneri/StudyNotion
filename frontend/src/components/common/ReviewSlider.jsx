import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import { FaStar } from "react-icons/fa"
import { getAllRatings } from "../../services/operations/pageAndComponentData"

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getAllRatings()
      setReviews(Array.isArray(data) ? data : [])
    }
    fetchReviews()
  }, [])

  return (
    <div className='relative mx-auto my-8 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
      <h1 className='text-center text-4xl mt-6 font-semibold -mb-4'>
        Reviews from other learners
      </h1>
      <div className='w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
        <div className='my-[50px] h-auto max-w-maxContentTab lg:max-w-maxContent mx-auto'>
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className='w-full'
          >
            {reviews.length === 0 ? (
              <SwiperSlide>
                <div className='flex flex-col gap-3 bg-richblack-800 p-4 rounded-lg text-[14px] text-richblack-25 min-h-[180px]'>
                  <p className="text-richblack-200">No reviews yet</p>
                </div>
              </SwiperSlide>
            ) : (
            reviews.map((review, i) => {
              const userName =
                review?.user?.name ||
                `${review?.user?.firstName || ""} ${review?.user?.lastName || ""}`.trim() ||
                "Learner"
              const courseName = review?.course?.courseName || ""
              const rating = Number(review?.rating || 0)
              const avatar = review?.user?.image
                ? review.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                    userName
                  )}`

              return (
              <SwiperSlide key={i}>
                <div className='flex flex-col gap-3 bg-richblack-800 p-4 rounded-lg text-[14px] text-richblack-25 min-h-[180px]'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={avatar}
                      alt="user"
                      className='h-12 w-12 rounded-full object-cover'
                    />
                    <div className='flex flex-col'>
                      <h1 className='font-semibold text-richblack-5'>
                        {userName}
                      </h1>
                      <h2 className='text-[12px] font-medium text-richblack-500'>
                        {courseName}
                      </h2>
                    </div>
                  </div>

                  <p className='font-medium text-richblack-25'>{review?.review}</p>

                  <div className='flex items-center gap-2 mt-auto pt-2'>
                    <h3 className='font-semibold text-yellow-100'>
                      {rating.toFixed(1)}
                    </h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={20}
                          color={
                            i < Math.floor(rating) ? "#FFD700" : "#2C333F"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )})
            )}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default ReviewSlider