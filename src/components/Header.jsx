import React, { use } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { toast } from "react-toastify";

export default function Header() {
    const { user, singOutUser } = use(AuthContext);
      const handleSingout = () => {
        singOutUser()
          .then(() => {
            toast("Sign-out successful");
          })
          .catch((error) => {
            error
          });
      };
  const links = <>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/bills">Bills</NavLink>
    <NavLink to="/about">About</NavLink>
    {user?<><NavLink to="/mybills">My-Pay-Bills</NavLink></>:""}
  </>;
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu gap-3 menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to='/' className="text-xl font-extrabold">Bill Management</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {!user ?<Link to='/auth' className="btn">Login</Link>:<>
          <div className="">
            <img className="h-20 w-20 rounded-full p-4" 
            src={user.profile_image?user?.profile_image:`https://i.ibb.co.com/6RC2Y5PX/elementor-placeholder-image.png`}
            alt="" />
          </div>
          <Link onClick={handleSingout} className="btn">Sing Out</Link>
          </>}
        </div>
      </div>
    </div>
  );
}
