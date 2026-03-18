import { FaStar } from "react-icons/fa"

export default function RatingStars({ value = 0, size = 16 }) {
  const filled = Math.floor(Number(value) || 0)
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          size={size}
          className={i < filled ? "text-yellow-50" : "text-richblack-600"}
        />
      ))}
    </div>
  )
}

