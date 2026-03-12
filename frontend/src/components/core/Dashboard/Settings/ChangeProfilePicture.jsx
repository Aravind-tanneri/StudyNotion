import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  // 1. Click handler for the hidden input
  const handleClick = () => {
    fileInputRef.current.click()
  }

  // 2. Handle the file selection and trigger the preview
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  // 3. Convert the file to a base64 URL so the browser can show it instantly
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  // 4. Handle the actual upload to the backend
  const handleFileUpload = () => {
    if (!imageFile) {
      toast.error("Please select an image first")
      return
    }
    
    try {
      console.log("Uploading Profile Picture...")
      setLoading(true)
      
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
      
      // Simulating loading for now until we build the API
      setTimeout(() => setLoading(false), 1000)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 hover:scale-95 transition-all duration-200"
              >
                Select
              </button>
              <button
                onClick={handleFileUpload}
                disabled={loading}
                className="flex items-center gap-x-2 rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900 hover:scale-95 transition-all duration-200"
              >
                {loading ? "Uploading..." : "Upload"}
                {!loading && <FiUpload className="text-lg text-richblack-900" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}