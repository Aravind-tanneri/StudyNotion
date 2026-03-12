import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      console.log("Updated Profile Data:", data)
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information Container */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          
          <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-10">
            {/* First Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="text-richblack-5 text-sm">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                className="form-style bg-richblack-700 p-3 rounded-md text-richblack-5"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="text-pink-200 text-xs">Please enter your first name.</span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="text-richblack-5 text-sm">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                className="form-style bg-richblack-700 p-3 rounded-md text-richblack-5"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="text-pink-200 text-xs">Please enter your last name.</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-10">
            {/* Date of Birth */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="text-richblack-5 text-sm">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="form-style bg-richblack-700 p-3 rounded-md text-richblack-5"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="text-pink-200 text-xs">{errors.dateOfBirth.message}</span>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="text-richblack-5 text-sm">
                Gender
              </label>
              <select
                id="gender"
                className="form-style bg-richblack-700 p-3 rounded-md text-richblack-5"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-pink-200 text-xs">Please enter your Date of Birth.</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-10">
            {/* Contact Number */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="text-richblack-5 text-sm">
                Contact Number
              </label>
              <input
                type="tel"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style bg-richblack-700 p-3 rounded-md text-richblack-5"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="text-pink-200 text-xs">{errors.contactNumber.message}</span>
              )}
            </div>

            {/* About */}
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="text-richblack-5 text-sm">
                About
              </label>
              <input
                type="text"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style bg-richblack-700 p-3 rounded-md text-richblack-5"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="text-pink-200 text-xs">Please enter your Bio.</span>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 hover:scale-95 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 hover:scale-95 transition-all duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}