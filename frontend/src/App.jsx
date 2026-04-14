import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import { Navigate } from 'react-router-dom'
import Settings from './components/core/Dashboard/Settings/index'
import AddCourse from './components/core/Dashboard/AddCourse'
import MyCourses from './components/core/Dashboard/MyCourses'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import { ACCOUNT_TYPE } from "./utils/constants";
import CourseDetails from "./pages/CourseDetails"
import EditCourse from "./components/core/Dashboard/EditCourse"
import ViewCourse from "./pages/ViewCourse"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import Instructor from "./components/core/Dashboard/Instructor"
import { useSelector } from 'react-redux'
import Footer from "./components/common/Footer"
import About from "./pages/About"
import Contact from './pages/Contact'
import TopPromoBanner from './components/common/TopPromoBanner'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from "./pages/UpdatePassword"
import Cart from "./components/core/Dashboard/Cart"
import Checkout from "./components/core/Dashboard/Checkout"
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory"
import DashboardCoursesRedirect from "./components/core/Dashboard/DashboardCoursesRedirect"
import Catalog from './pages/Catalog'


const App = () => {
  
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <TopPromoBanner/>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path="/catalog/:catalogName" element={<Catalog/>} />

        {/* Protected Dashboard Routes */}
        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Navigate to="/dashboard/my-profile" />} />
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
          <Route path="/dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
          <Route path="/dashboard/cart" element={<Cart />} />
          <Route path="/dashboard/checkout" element={<Checkout />} />
          <Route path="/dashboard/purchase-history" element={<PurchaseHistory />} />
          <Route path="/dashboard/courses" element={<DashboardCoursesRedirect />} />
          <Route element={<ViewCourse />}>
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route 
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
                element={<VideoDetails />} 
            />)}
          </Route>
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="instructor" element={<Instructor />} />
            </>
          )}
        </Route>
      </Routes>


      <Footer/>
          

      <Toaster /> 
    </div>
  )
}

export default App