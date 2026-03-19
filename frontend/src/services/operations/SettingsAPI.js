import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

// 1. UPDATE PROFILE PICTURE
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Uploading...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      toast.success("Display Picture Updated Successfully")
      // Update Redux state so the UI changes instantly
      dispatch(setUser(response.data.data))
      // Update LocalStorage so it survives a page refresh
      localStorage.setItem("user", JSON.stringify(response.data.data))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}

// 2. UPDATE PROFILE DETAILS (Name, DOB, Bio)
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      // The backend usually returns the updated user details inside response.data.updatedUserDetails
      // Make sure this matches exactly what Node.js controller sends back!
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      
      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      )
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.updatedUserDetails, image: userImage })
      )
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

// 3. CHANGE PASSWORD
export async function changePassword(token, formData) {
  const toastId = toast.loading("Updating...")
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API ERROR............", error)
    toast.error(error.response.data.message || "Could Not Update Password")
  }
  toast.dismiss(toastId)
}

// 4. DELETE ACCOUNT
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      
      // If the account is gone, we must log the user out and wipe their local storage!
      dispatch(logout(navigate))
    } catch (error) {
      console.log("DELETE_PROFILE_API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}