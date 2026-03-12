import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1. ADD TO CART
    addToCart: (state, action) => {
      const course = action.payload
      // Check if the course is already in the cart to prevent duplicate purchases
      const index = state.cart.findIndex((item) => item._id === course._id)

      if (index >= 0) {
        toast.error("Course already in cart")
        return
      }

      // If it's a new course, push it to the array
      state.cart.push(course)
      
      // Increment the total number of items and add the course price to the total cost
      state.totalItems++
      state.total += course.price

      // Instantly sync the Redux state to the browser's localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

      toast.success("Course added to cart")
    },

    // 2. REMOVE FROM CART
    removeFromCart: (state, action) => {
      const courseId = action.payload
      const index = state.cart.findIndex((item) => item._id === courseId)

      if (index >= 0) {
        // Subtract the price of the removed course from the total cost
        state.totalItems--
        state.total -= state.cart[index].price
        
        // Remove the course from the cart array using splice
        state.cart.splice(index, 1)

        // Sync the updated state back to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

        toast.success("Course removed from cart")
      }
    },

    // 3. RESET CART (We will call this after a successful Razorpay payment!)
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0

      // Wipe the localStorage clean
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },
  },
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer