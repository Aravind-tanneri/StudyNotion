import * as Icons from "react-icons/vsc"
import { NavLink, matchPath, useLocation } from "react-router-dom"

export default function SidebarLink({ link, iconName }) {
  // We dynamically grab the correct icon from react-icons/vsc based on the string name
  const Icon = Icons[iconName]
  const location = useLocation()

  // This checks if our current browser URL matches this specific link's path
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium transition-all duration-200 ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5"
      }`}
    >
      {/* The yellow left-border that shows up when the link is active */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 transition-all duration-200 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      
      <div className="flex items-center gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}