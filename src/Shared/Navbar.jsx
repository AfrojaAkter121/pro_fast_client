import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import ProFastLogo from "../ProfastLogo/ProFastLogo";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const {user, logOut} = useContext(AuthContext)

    const  navLink = <>
        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/about'>About Us</NavLink>
        </li>
        <li>
            <NavLink to='/coverage'>Coverage</NavLink>
        </li>
    </>
  return (
    <div className="pt-5">
         <div className="navbar bg-base-100 shadow-sm max-w-7xl mx-auto rounded-2xl  ">
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
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
           {navLink}
          </ul>
        </div>
        <ProFastLogo/>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
         {navLink}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ? (
            <div className="flex gap-4">
               <img src={user?.photoURL} className="w-12 h-12 rounded-full" alt=""/>
            <button onClick={logOut} className="bg-[#CAEB66] px-4 rounded-lg">Log Out</button>
          </div>
          ):
          <div>
          <Link to='/login' className="py-2 px-4 border border-gray-300 mr-3 rounded-lg">Log in</Link>
          <Link to='/register' className="bg-[#CAEB66] py-2 px-3 rounded-lg">Register</Link>
        </div>
        }
      </div>
    </div>
    </div>
  );
};

export default Navbar;
