export function getAverageRating(ratingAndReviews) {
  if (!Array.isArray(ratingAndReviews) || ratingAndReviews.length === 0) return 0

  const sum = ratingAndReviews.reduce((acc, r) => acc + Number(r?.rating || 0), 0)
  return sum / ratingAndReviews.length
}

export function getRatingCount(ratingAndReviews) {
  return Array.isArray(ratingAndReviews) ? ratingAndReviews.length : 0
}

