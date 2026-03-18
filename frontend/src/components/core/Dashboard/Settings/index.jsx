import ChangeProfilePicture from "./ChangeProfilePicture"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import DeleteAccount from "./DeleteAccount"
import { Link } from "react-router-dom"

export default function Settings() {
  return (
    <div className="w-full text-white">
      <Link to="/dashboard/my-profile" className="mb-3 inline-block text-sm text-richblack-300 hover:text-richblack-5">
        &larr; Back
      </Link>
      <h1 className="mb-10 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      
      {/* Section 1: Update Profile Picture */}
      <ChangeProfilePicture />

      {/* Section 2: Update Profile Details */}
      <EditProfile />

      {/* Section 3: Update Password */}
      <UpdatePassword />

      {/* Section 4: Delete Account */}
      <DeleteAccount />
    </div>
  )
}