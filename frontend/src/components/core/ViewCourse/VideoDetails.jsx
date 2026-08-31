import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Player, BigPlayButton } from "video-react"
import "video-react/dist/video-react.css"
import { FaCheckCircle, FaRedo } from "react-icons/fa"

import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const playerRef = useRef(null)

  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return
      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses")
      } else {
        // Find the exact section and subsection from Redux
        const filteredData = courseSectionData.filter((course) => course._id === sectionId)
        const filteredVideoData = filteredData?.[0]?.subSection.filter((data) => data._id === subSectionId)

        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false) // Reset video state when switching videos
      }
    }
    setVideoSpecificDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  // Helper function to check if this is the very first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // Helper function to check if this is the absolute last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // Go to the Next Video
  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      // Go to next video in the SAME section
      const nextSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    } else {
      // Go to the first video of the NEXT section
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  // Go to the Previous Video
  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      // Go to previous video in the SAME section
      const prevSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    } else {
      // Go to the last video of the PREVIOUS section
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token)
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          
          {/* OVERLAY: Shows up only when the video finishes playing */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              <div className="flex flex-col items-center gap-3">
                {!completedLectures.includes(subSectionId) && (
                  <button
                    disabled={loading}
                    onClick={handleLectureCompletion}
                    className="flex cursor-pointer items-center gap-x-2 rounded-lg bg-yellow-50 px-8 py-4 text-lg font-bold text-richblack-900 shadow-lg shadow-black/40 transition-all duration-200 hover:scale-95 hover:bg-yellow-100 disabled:opacity-60"
                  >
                    <FaCheckCircle size={24} />
                    {loading ? "Loading..." : "Mark As Completed"}
                  </button>
                )}

                <button
                  disabled={loading}
                  onClick={() => {
                    if (playerRef?.current) {
                      playerRef?.current?.seek(0)
                      playerRef?.current?.play()
                      setVideoEnded(false)
                    }
                  }}
                  className="flex cursor-pointer items-center gap-x-2 rounded-lg border-2 border-richblack-400/60 bg-richblack-900/60 px-8 py-3 text-lg font-semibold text-richblack-5 backdrop-blur-sm transition-all duration-200 hover:scale-95 hover:border-richblack-200 disabled:opacity-60"
                >
                  <FaRedo size={20} />
                  Rewatch
                </button>
              </div>

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="rounded-lg border border-richblack-400/40 bg-richblack-900/60 px-6 py-3 font-semibold text-richblack-100 backdrop-blur-sm transition-all duration-200 hover:scale-95 hover:bg-richblack-800"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="rounded-lg bg-richblack-700 px-6 py-3 font-semibold text-richblack-5 transition-all duration-200 hover:scale-95 hover:bg-richblack-600"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}
