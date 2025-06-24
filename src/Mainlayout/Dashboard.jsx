import React from "react";
import { NavLink, Outlet } from "react-router"; // react-router-dom হওয়া উচিত
import ProFastLogo from "../ProfastLogo/ProFastLogo";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle (for mobile) */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar (Mobile only) */}
        <div className="navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 font-semibold"><ProFastLogo/></div>
        </div>

        {/* Page content here */}
        <div className="p-4">
          <Outlet /> {/* Nested routes render here */}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
            <div className="mb-10">
            <ProFastLogo></ProFastLogo>
            </div>
          <li>
            <NavLink
              to="/dashBoard/myParcels"
              className={({ isActive }) =>
                isActive ? "font-bold text-lime-600" : ""
              }
            >
              📦 My Parcels
            </NavLink>
          </li>
          {/* এখানে আরও লিঙ্ক দিতে পারো */}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
