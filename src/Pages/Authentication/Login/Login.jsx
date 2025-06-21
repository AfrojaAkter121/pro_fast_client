import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import SocialLogin from '../../../Shared/SocialLogin/SocialLogin';

const Login = () => {
    return (
        <div>
             {/* Left Section - Form */}
          <div className="max-w-lg p-10">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Login with Profast</p>
  
            <form>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="pietro.schirano@gmail.com"
                className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
  
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full border rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
  
              <div className="text-sm text-green-600 mb-4 cursor-pointer">Forget Password?</div>
  
              <button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-500 text-white py-2 rounded mb-4 font-medium"
              >
                Continue
              </button>
  
              <p className="text-sm text-gray-600 mb-2">
                Don't have any account? <Link to='/register' className="text-green-600 cursor-pointer">Register</Link>
              </p>
  
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="mx-2 text-sm text-gray-400">Or</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
  
              <SocialLogin/>
            </form>
            </div>
        </div>
    );
};

export default Login;