import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { setCourse, setEditCourse, setStep } from "../../../../slices/courseSlice"
import { createSection, updateSection } from "../../../../services/operations/courseDetailsAPI"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)

  // Handle Form Submission for creating/editing a Section
  const onSubmit = async (data) => {
    setLoading(true)
    let result

    if (editSectionName) {
      result = await updateSection({ sectionName: data.sectionName, sectionId: editSectionName, courseId: course._id }, token)
      console.log("Editing section:", data.sectionName)
    } else {
      result = await createSection({ sectionName: data.sectionName, courseId: course._id }, token)
      console.log("Creating new section:", data.sectionName)
    }

    // If API call is successful, update the Redux store with the new course data
    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section")
      return
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add at least one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit()
            return
        }
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Section name is required</span>
          )}
        </div>
        
        <div className="flex items-end gap-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center border border-yellow-50 bg-transparent cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-yellow-50"
          >
            {editSectionName ? "Edit Section Name" : "Create Section"}
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </button>
          
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
        >
          Back
        </button>
        <button
          disabled={loading}
          onClick={goToNext}
          className="flex items-center bg-yellow-50 text-black py-[8px] px-[20px] font-semibold rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  )
}