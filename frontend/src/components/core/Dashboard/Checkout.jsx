import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { buyCourse } from "../../../services/operations/studentFeaturesAPI"
import RatingStars from "../../common/RatingStars"
import { getAverageRating, getRatingCount } from "../../../utils/ratings"

export default function Checkout() {
  const { cart, total } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  const payAmount = useMemo(() => {
    // to match screenshot-like button value
    return Math.round(total * 1.0167) // ~Rs 1200 -> 1220
  }, [total])

  const handlePay = () => {
    const courses = cart.map((c) => c._id)
    dispatch(buyCourse(token, courses, user, navigate, dispatch))
  }

  return (
    <div className="w-full text-white">
      <p className="mb-3 text-sm text-richblack-300">
        Home / Wishlist / <span className="text-yellow-50">Checkout</span>
      </p>

      <h1 className="text-3xl font-medium text-richblack-5">Checkout</h1>
      <p className="mt-6 text-sm text-richblack-300">Order Summary</p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Left order summary */}
        <div className="flex-1 rounded-xl border border-richblack-800">
          {cart.map((course, idx) => {
            const avgRating = getAverageRating(course?.ratingAndReviews)
            const reviewCount = getRatingCount(course?.ratingAndReviews)
            return (
              <div
                key={course?._id || idx}
                className={`flex flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center ${
                  idx !== cart.length - 1 ? "border-b border-richblack-800" : ""
                }`}
              >
                <div className="flex flex-1 flex-col gap-5 sm:flex-row">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[120px] w-[200px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course?.courseName}
                    </p>
                    <p className="text-sm text-richblack-300">
                      {course?.instructor?.name || "Name"}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-yellow-50 font-semibold">
                        {avgRating.toFixed(1)}
                      </span>
                      <RatingStars value={avgRating} />
                      <span className="text-richblack-400">
                        ({reviewCount} Review Count)
                      </span>
                    </div>
                    <p className="text-xs text-richblack-400">
                      Total Courses • Lesson • Beginner
                    </p>
                  </div>
                </div>

                <p className="text-xl font-semibold text-yellow-50 lg:min-w-[140px] lg:text-right">
                  Rs. {course?.price}
                </p>
              </div>
            )
          })}
        </div>

        {/* Right payment details */}
        <div className="w-full max-w-[380px] rounded-xl border border-richblack-800 bg-richblack-800 p-6">
          <p className="text-lg font-semibold text-richblack-5">Payment Details</p>
          <p className="mt-1 text-xs text-richblack-300">
            Complete your purchase details items and providing your payment details to us :
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <label className="text-xs text-richblack-200">
              Full Name <sup className="text-pink-200">*</sup>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter Full Name"
                className="mt-2 w-full rounded-md bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none"
              />
            </label>

            <label className="text-xs text-richblack-200">
              Email ID <sup className="text-pink-200">*</sup>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email ID"
                className="mt-2 w-full rounded-md bg-richblack-700 px-4 py-3 text-sm text-richblack-5 outline-none"
              />
            </label>

            <div className="mt-2 flex items-center justify-between text-sm text-richblack-200">
              <span>Total</span>
              <span className="text-richblack-5">Rs. {total}/-</span>
            </div>

            <button
              onClick={handlePay}
              className="mt-2 w-full rounded-md bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 hover:scale-95 transition-all"
            >
              Pay Rs. {payAmount}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

