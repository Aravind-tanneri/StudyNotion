import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogData, courseEndpoints } from "../apis"

// We fetch all the courses associated with a specific category ID
export const getCategoryPageDetails = async (categoryId) => {
  const toastId = toast.loading("Loading Catalog...")
  let result = []
  
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId }
    )
    
    console.log("CATALOG PAGE DATA API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could not Fetch Category page data")
    }

    result = response?.data
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error)
    toast.error(error.message)
    result = error.response?.data
  }
  
  toast.dismiss(toastId)
  return result
}

// Fetch all ratings/reviews for homepage slider
export const getAllRatings = async () => {
  try {
    const response = await apiConnector("GET", courseEndpoints.GET_ALL_RATING_API)
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch ratings")
    }
    return response?.data?.data || []
  } catch (error) {
    console.log("GET_ALL_RATING_API ERROR....", error)
    toast.error(error?.response?.data?.message || "Could not fetch ratings")
    return []
  }
}