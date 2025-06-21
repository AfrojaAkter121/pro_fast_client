import React from 'react';
import { Outlet } from 'react-router';
import ProFastLogo from '../ProfastLogo/ProFastLogo';
import authImg from "../assets/authImage.png"

const AuthLayout = () => {
    return (
        <div className=" flex items-center justify-center">
        {/* Left Section - Form */}
        <div className="flex-1 p-10 ">
            <div className='-mt-6'>
            <ProFastLogo></ProFastLogo>
            </div>
            <div className='max-w-md mx-auto'>
            <Outlet />
            </div>
          </div>
  
          {/* Right Section - Image */}
          <div className=" bg-[#f0f7d5] flex-1 min-h-screen flex justify-center items-center">
            <img
              src={authImg}
              alt="Login illustration"
              className="w-[568px] "
            />
          </div>
      </div>
    );
};

export default AuthLayout;