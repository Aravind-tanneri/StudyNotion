import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // Check if user data exists in localStorage so they don't have to log in again after a page refresh
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  // A global loading state we can use when fetching profile data
  loading: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    // 1. SET USER DATA
    setUser(state, value) {
      state.user = value.payload
    },
    // 2. SET LOADING STATE
    setLoading(state, value) {
      state.loading = value.payload
    },
  },
})

export const { setUser, setLoading } = profileSlice.actions
export default profileSlice.reducer