import React, { useEffect, useMemo, useState } from "react"
import { Link, matchPath, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"

import logo from "../../assets/Images/logo.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

export default function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)

  useEffect(() => {
    // We fetch the dynamic catalog categories from our database
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        // We store the fetched categories in our local state
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    }
    fetchCategories()
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setIsCatalogOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!isMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMenuOpen])

  // We create a helper function to highlight the active route in our Navbar (yellow text)
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className={`flex min-lg:px-[5%] h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-900 transition-all duration-200`}>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        
        {/* We link our logo back to the home page */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* We map through our navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="group relative flex cursor-pointer items-center gap-1 text-richblack-25">
                    <p>{link.title}</p>
                    <BsChevronDown />
                    
                    {/* We build our dropdown menu for the catalog */}
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      
                      {/* We build the little diamond pointer at the top of the dropdown menu */}
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks?.length ? (
                        <>
                          {subLinks.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <p className="text-center">No Categories Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-50" : "text-richblack-25"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* We render our Login, Signup, Cart, and Profile buttons */}
        <div className="hidden items-center gap-x-4 md:flex">
          {/* We only show the cart if the user is a Student (Instructors don't buy courses) */}
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {/* We show the little notification bubble if there are items in the Redux cart */}
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {/* We show Login/Signup if they are logged out */}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:scale-95 transition-all">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 hover:scale-95 transition-all">
                Sign up
              </button>
            </Link>
          )}
          {/* We show the Profile Dropdown if they are logged in */}
          {token !== null && <ProfileDropdown />}
        </div>
        
        {/* We add a hamburger menu icon for mobile screens */}
        <button
          className="mr-4 md:hidden"
          onClick={() => setIsMenuOpen((p) => !p)}
          aria-label="Open menu"
        >
          {isMenuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[2000] md:hidden relative">
          {/* Backdrop */}
          <button
            className="absolute inset-0 z-0 h-full w-full bg-richblack-900/70"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 z-10 h-full w-[82%] max-w-[360px] overflow-auto bg-richblack-900 border-l border-richblack-700">
            <div className="flex items-center justify-between px-5 py-4 border-b border-richblack-700">
              <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <img src={logo} alt="Logo" width={140} height={28} loading="lazy" />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <AiOutlineClose fontSize={22} fill="#AFB2BF" />
              </button>
            </div>

            <div className="px-5 py-4">
              {/* Mobile nav links */}
              <ul className="flex flex-col gap-2 text-richblack-25">
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <div className="flex flex-col">
                        <button
                          className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-richblack-25 hover:bg-richblack-800"
                          onClick={() => setIsCatalogOpen((p) => !p)}
                        >
                          <span>Catalog</span>
                          <BsChevronDown
                            className={`transition-transform duration-200 ${
                              isCatalogOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isCatalogOpen && (
                          <div className="mt-1 ml-2 flex flex-col rounded-md border border-richblack-700 bg-richblack-800">
                            {loading ? (
                              <p className="px-4 py-3 text-sm text-richblack-200">
                                Loading...
                              </p>
                            ) : subLinks?.length ? (
                              subLinks.map((subLink, i) => (
                                <Link
                                  key={i}
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="px-4 py-3 text-sm text-richblack-25 hover:bg-richblack-700"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subLink.name}
                                </Link>
                              ))
                            ) : (
                              <p className="px-4 py-3 text-sm text-richblack-200">
                                No Categories Found
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={link?.path}
                        className={`block rounded-md px-3 py-3 ${
                          matchRoute(link?.path)
                            ? "bg-richblack-800 text-yellow-50"
                            : "text-richblack-25 hover:bg-richblack-800"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-5 h-px w-full bg-richblack-700" />

              {/* Mobile actions */}
              <div className="flex flex-col gap-3">
                {user && user?.accountType !== "Instructor" && (
                  <Link
                    to="/dashboard/cart"
                    className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-25"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <AiOutlineShoppingCart className="text-xl text-richblack-100" />
                      Cart
                    </span>
                    {totalItems > 0 && (
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}

                {token === null ? (
                  <div className="flex gap-3">
                    <Link to="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-4 py-3 text-sm font-medium text-richblack-100">
                        Log in
                      </button>
                    </Link>
                    <Link to="/signup" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full rounded-md bg-yellow-50 px-4 py-3 text-sm font-semibold text-richblack-900">
                        Sign up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-md border border-richblack-700 bg-richblack-800 px-4 py-3">
                    <ProfileDropdown />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}