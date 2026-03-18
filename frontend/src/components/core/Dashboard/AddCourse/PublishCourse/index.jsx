import {useEffect,useState} from "react"
import {useForm} from "react-hook-form"
import {useDispatch,useSelector}from "react-redux"
import {useNavigate} from "react-router-dom"
import {editCourseDetails} from "../../../../../services/operations/courseDetailsAPI"
import {resetCourseState,setStep} from "../../../../../slices/courseSlice"
import {COURSE_STATUS} from "../../../../../utils/constants"

export default function PublishCourse(){
    const {register,handleSubmit,setValue,getValues}=useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {token }=useSelector((state)=> state.auth)
    const {course}= useSelector((state)=>state.course)
    const [loading,setLoading]=useSelector(false)

    useEffect(()=>{
        if(course?.status==="Published"){
            setValue("public",true)
        }
    },[])

    const goBack=()=>{
        dispatch(setStep(2))
    }

    const goToCourses=()=>{
        dispatch(resetCourseState())
        navigate("/dashboard/myCourses")
    }

    const handleCoursePublish = async () =>{
        if (
            (course?.status === "Published" && getValues("public") === true) ||
            (course?.status === "Draft" && getValues("public") === false)
            ) {
            goToCourses()
            return
        }

        const formData= new FormData()
        formData.append("courseId",course._id)
        const courseStatus= getValues("public")?"Published":"Draft"
        formData.append("status",courseStatus)

        setLoading(true)

        const result = await editCourseDetails(formData, token)
        if(result)goToCourses();

        setLoading(false)
    }

    const onSubmit = () => {
        handleCoursePublish()
    }

    return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Publish Settings</p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* The Checkbox Wrapper */}
        <div className="my-6 mb-8 flex items-center rounded-lg border-richblack-400 bg-richblack-800 p-4">
          <label htmlFor="public" className="inline-flex items-center text-lg cursor-pointer">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 hover:bg-richblack-200 transition-all duration-200"
          >
            Back
          </button>
          <button
            disabled={loading}
            className="flex items-center bg-yellow-50 text-black py-[8px] px-[20px] font-semibold rounded-md hover:scale-95 transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}