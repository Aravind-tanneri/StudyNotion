import { toast } from "react-hot-toast"
import { studentEndpoints } from "../apis"
import { apiConnector } from "../apiconnector"
import rzpLogo from "../../assets/Images/logo.png"
import { setPaymentLoading } from "../../slices/courseSlice"
import { resetCart } from "../../slices/cartSlice"

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints

// We dynamically inject the official Razorpay SDK into our HTML body
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src

    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

// We trigger the purchase flow for our students
export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading...")
  try {
    // We load the script and check if it successfully attached to our DOM
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      toast.error("Razorpay SDK failed to load")
      return
    }

    // We initiate the order by hitting our backend capturePayment controller
    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
      Authorization: `Bearer ${token}`,
    })

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message)
    }

    // --- MOCK BYPASS FOR OUR TESTING ---
    // Because our backend is returning a fake 'order_id', Razorpay will crash. 
    // We catch the fake ID and immediately send dummy data to our verification function.
    if (orderResponse.data.orderId.startsWith("order_")) {
      const dummyResponse = {
        razorpay_order_id: orderResponse.data.orderId,
        razorpay_payment_id: `pay_${Date.now()}`,
        razorpay_signature: "mocked_signature_for_testing"
      }
      
      // We skip the UI and manually force the verification step
      verifyPayment({ ...dummyResponse, courses }, token, navigate, dispatch)
      toast.dismiss(toastId)
      return
    }
    // --- END MOCK BYPASS ---

    // We prepare the configuration options for our live Razorpay modal
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse.data.currency,
      amount: orderResponse.data.amount,
      order_id: orderResponse.data.orderId,
      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        // We successfully received payment, now we verify the signature
        sendPaymentSuccessEmail(response, orderResponse.data.amount, token)
        verifyPayment({ ...response, courses }, token, navigate, dispatch)
      },
    }

    // We open the Razorpay payment window for our user
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, payment failed")
      console.log(response.error)
    })
  } catch (error) {
    console.log("PAYMENT API ERROR.....", error)
    toast.error("Could not make Payment")
  }
  toast.dismiss(toastId)
}

// We send a success email to our student
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error)
  }
}

// We verify the transaction signature with our backend
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....")
  dispatch(setPaymentLoading(true))
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Payment Successful, you are added to the course")
    
    // We clear the cart after our successful transaction
    dispatch(resetCart())
    
    // We redirect our user to their new learning dashboard
    navigate("/dashboard/enrolled-courses")
    
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error)
    toast.error("Could not verify Payment")
  }
  toast.dismiss(toastId)
  dispatch(setPaymentLoading(false))
}