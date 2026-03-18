import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { apiConnector } from "../../../../../services/apiconnector"
import { categories } from "../../../../../services/apis"
import RequirementField from "./RequirementField"
import Upload from "./Upload"
import { addCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"

import { HiOutlineCurrencyRupee } from "react-icons/hi"

const CourseInformationForm = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm()
  const [courseCategories, setCourseCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  // Fetch Categories from Backend
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API)
      if (res.data.success) {
        setCourseCategories(res.data.data)
      }
    }
    getCategories()
  }, [])

  const onSubmit = async (data) => {
    // 1. Create a new FormData object
    const formData = new FormData();

    // 2. Append all the text data
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("tag", data.courseTags || [])
    
    // 3. Special Case: Convert the Array into a String for the backend
    formData.append("instructions", JSON.stringify(data.courseRequirements || []))
    
    // 4. Append the Image File
    formData.append("thumbnailImage", data.courseImage)

    // Optional: Add status (Draft by default)
    formData.append("status", "Draft")

    setLoading(true)
    const result = await addCourseDetails(formData, token)
    
    if (result) {
      dispatch(setCourse(result))
      dispatch(setStep(2))
    }
    setLoading(false)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* 1. Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && <span className="text-xs text-pink-200">Course title is required</span>}
      </div>

      {/* 2. Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && <span className="text-xs text-pink-200">Course Description is required</span>}
      </div>

      {/* 3. Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: { value: /^(0|[1-9]\d*)(\.\d+)?$/ },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && <span className="text-xs text-pink-200">Course Price is required</span>}
      </div>

      {/* 4. Category Dropdown */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="form-style w-full"
        >
          <option value="" disabled>Choose a Category</option>
          {courseCategories?.map((category, index) => (
            <option key={index} value={category?._id}>
              {category?.name}
            </option>
          ))}
        </select>
        {errors.courseCategory && <span className="text-xs text-pink-200">Course Category is required</span>}
      </div>

      {/* 5. Course Benefits */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && <span className="text-xs text-pink-200">Benefits of the course is required</span>}
      </div>

      {/* 6. Thumbnail Upload Component */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      {/* 7. Requirements Component */}
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center bg-yellow-50 text-black px-6 py-3 font-semibold rounded-md disabled:cursor-not-allowed disabled:opacity-75"
        >
          {loading ? "Saving..." : "Next"}
        </button>
      </div>
    </form>
  )
}

export default CourseInformationForm