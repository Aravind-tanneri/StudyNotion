import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
// Standard implementation for a profile dropdown menu
export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Logic to handle logout (assumes an auth service exists)
  const handleLogout = () => {
    dispatch(logout(navigate))
    setOpen(false);
  };

  if (!user) return null;

  return (
    <div
      className="relative cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={() => setOpen(!open)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setOpen(!open)
        }
      }}
    >
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.name || "user"}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-slate-400" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] flex w-[150px] flex-col gap-2 rounded-md border-[1px] border-slate-700 bg-slate-800 p-2"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <button className="btn-dark w-full gap-2">
              <VscDashboard className="text-lg" />
              Dashboard
            </button>
          </Link>
          <button onClick={handleLogout} className="btn-grad w-full gap-2">
            <VscSignOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}