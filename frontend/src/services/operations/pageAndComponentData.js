import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogData } from "../apis"

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