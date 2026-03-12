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

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-gray-900 flex flex-col font-inter">
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

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
          <Route path="/dashboard/enrolled-courses" element={<div className="text-white">Enrolled Courses Here</div>} />
          <Route path="/dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
        
        </Route>
      </Routes>

      <Toaster /> 
    </div>
  )
}

export default App