import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeFromCart } from "../../../slices/cartSlice"
import RatingStars from "../../common/RatingStars"
import { getAverageRating, getRatingCount } from "../../../utils/ratings"

export default function Wishlist() {
  const { cart: wishlist, total, totalItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="w-full text-white">
      <p className="mb-3 text-sm text-richblack-300">
        Home / Dashboard / <span className="text-yellow-50">Wishlist</span>
      </p>

      <h1 className="text-3xl font-medium text-richblack-5">My Wishlist</h1>

      <p className="mt-6 text-sm text-richblack-300">
        {totalItems} Courses in Wishlist
      </p>

      {totalItems === 0 ? (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your wishlist is empty
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left list */}
          <div className="flex-1 rounded-xl border border-richblack-800">
            {wishlist.map((course, idx) => {
              const avgRating = getAverageRating(course?.ratingAndReviews)
              const reviewCount = getRatingCount(course?.ratingAndReviews)
              return (
                <div
                  key={course?._id || idx}
                  className={`flex flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center ${
                    idx !== wishlist.length - 1 ? "border-b border-richblack-800" : ""
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

                  <div className="flex items-center justify-between gap-6 lg:flex-col lg:items-end">
                    <button
                      onClick={() => dispatch(removeFromCart(course._id))}
                      className="flex items-center gap-2 rounded-md border border-richblack-600 bg-richblack-800 px-4 py-2 text-sm text-pink-200 hover:bg-richblack-700"
                    >
                      <RiDeleteBin6Line />
                      Remove
                    </button>
                    <p className="text-xl font-semibold text-yellow-50">
                      Rs. {course?.price}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right total card */}
          <div className="w-full max-w-[360px] rounded-xl border border-richblack-800 bg-richblack-800 p-6">
            <p className="text-sm text-richblack-300">Total:</p>
            <div className="mt-2">
              <p className="text-3xl font-semibold text-yellow-50">Rs. {total}</p>
              <p className="text-sm text-richblack-400 line-through">
                Rs. {Math.max(total - 900, 0)}
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard/checkout")}
              className="mt-6 w-full rounded-md bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 hover:scale-95 transition-all"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

