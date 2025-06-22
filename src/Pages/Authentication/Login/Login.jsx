import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';
import SocialLogin from '../../../Shared/SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Provider/AuthProvider';

const Login = () => {
  const  {loginUser} = useContext(AuthContext);
  console.log(name)
  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    loginUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
      })
      .catch((error) => {
        console.error("Error logging in:", error.code, error.message);
      });
  }



    return (
        <div>
             {/* Left Section - Form */}
          <div className="max-w-lg p-10">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Login with Profast</p>
  
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="pietro.schirano@gmail.com"
                className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 -mt-2 text-xs">
                  Email is required
                </p>
              )}
  
              <label className="block text-sm font-medium mb-1 mt-4">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,20}$/ })}
                placeholder="Enter Your Password"
                className="w-full border rounded px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500  text-xs">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500  text-xs">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-500  text-xs">
                  Password must not exceed 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500  text-xs">
                  Password must contain at least one uppercase letter, one
                  lowercase letter, and one number
                </p>
              )}
  
              <div className="text-sm text-green-600 mb-4 cursor-pointer">Forget Password?</div>
  
              <button
                type="submit"
                className="w-full bg-[#CAEB66]  text-black py-2 rounded mb-4 font-medium"
              >
                Log In
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