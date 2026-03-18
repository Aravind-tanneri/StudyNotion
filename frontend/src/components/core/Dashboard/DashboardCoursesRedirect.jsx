import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function DashboardCoursesRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/catalog", { replace: true })
  }, [navigate])

  return null
}

