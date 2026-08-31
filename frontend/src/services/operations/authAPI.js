import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"


const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API } = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(accountType, name, email, password, confirmPassword, contactNumber, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType, name, email, password, confirmPassword, contactNumber, otp,
      })


      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })


      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      
      navigate("/dashboard/my-profile")
      
    } catch (error) {
      toast.error("Login Failed")
    }
    
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset link sent to your email")
      setEmailSent(true)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could Not Send Reset Email")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password reset successfully")
      navigate("/login")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could Not Reset Password")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
