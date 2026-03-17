import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
// import ReactStars from "react-rating-stars-component"
import { FaStar } from "react-icons/fa"
const ReviewSlider = () => {
  const [reviews, setReviews] = useState([
      {
          user: { firstName: "Cody", lastName: "Fisher", image: "https://api.dicebear.com/5.x/initials/svg?seed=Cody%20Fisher" },
          rating: 4.0,
          review: "Coordination of activities improved tremendously with Learn codings."
      },
      {
          user: { firstName: "Esther", lastName: "Howard", image: "https://api.dicebear.com/5.x/initials/svg?seed=Esther%20Howard" },
          rating: 3,
          review: "Everyone's on the same page. Many of our people are not very organized naturally, so Learn codings is a godsend!"
      },
      {
          user: { firstName: "Eleanor", lastName: "Pena", image: "https://api.dicebear.com/5.x/initials/svg?seed=Eleanor%20Pena" },
          rating: 4.0,
          review: "I would recommend Learn codings for anyone trying to get the word out about their business. It has saved me so much time!"
      },
      {
          user: { firstName: "Kristin", lastName: "Watson", image: "https://api.dicebear.com/5.x/initials/svg?seed=Kristin%20Watson" },
          rating: 4.0,
          review: "With Learn codings, we have finally accomplished things that have been waiting forever to get done."
      },
      {
          user: { firstName: "Jacob", lastName: "Jones", image: "https://api.dicebear.com/5.x/initials/svg?seed=Jacob%20Jones" },
          rating: 5.0,
          review: "The best platform I have ever used. Highly recommended for all students!"
      }
  ]);

  return (
    <div className='text-white w-full'>
      <div className='my-[50px] h-auto max-w-maxContentTab lg:max-w-maxContent mx-auto'>
        <Swiper
          // Default settings for mobile
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // Responsive Breakpoints: This is the magic for Desktop vs Mobile
          breakpoints={{
            640: { slidesPerView: 1 }, // Mobile: 1 card
            768: { slidesPerView: 2 }, // Tablet: 2 cards
            1024: { slidesPerView: 4 }, // Desktop: 4 cards (like your image!)
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className='w-full'
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className='flex flex-col gap-3 bg-richblack-800 p-4 rounded-lg text-[14px] text-richblack-25 min-h-[180px]'>
                
                {/* User Info Section */}
                <div className='flex items-center gap-4'>
                  <img 
                    src={review?.user?.image} 
                    alt="user" 
                    className='h-12 w-12 rounded-full object-cover' 
                  />
                  <div className='flex flex-col'>
                    <h1 className='font-semibold text-richblack-5'>
                      {`${review?.user?.firstName} ${review?.user?.lastName}`}
                    </h1>
                    <h2 className='text-[12px] font-medium text-richblack-500'>
                      {review?.user?.firstName.toLowerCase()}@example.com
                    </h2>
                  </div>
                </div>

                {/* Review Text */}
                <p className='font-medium text-richblack-25'>
                  {review?.review}
                </p>

                {/* Rating & Stars */}
                <div className='flex items-center gap-2 mt-auto pt-2'>
                  <h3 className='font-semibold text-yellow-100'>
                    {review.rating.toFixed(1)}
                  </h3>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <FaStar 
                            key={i} 
                            size={20} 
                            color={i < Math.floor(review.rating) ? "#FFD700" : "#2C333F"} 
                        />
                    ))}
                </div>
                </div>
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider