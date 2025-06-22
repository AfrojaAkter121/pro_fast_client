import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import SocialLogin from "../../../Shared/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";


const Register = () => {
  const { createUser } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password, name, photo } = data;
    createUser(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
        photoURL: photo,
      })
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
  };

  return (
    <div>
      {/* Left Section - Form */}
      <div className="max-w-md p-10">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-600 mb-6">Register with Profast</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="name"
                {...register("name", { required: true })}
                placeholder="Enter Your Name"
                className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.name?.type === "required" && (
                <p role="alert" className="text-red-500 -mt-3 text-xs">
                  Name is required
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input
                type="photo"
                {...register("photo", { required: true })}
                placeholder="Your Photo URL"
                className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500 -mt-3 text-xs">photo is required</p>
              )}
            </div>
          </div>
          <div className="flex gap-5 mt-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="pietro.schirano@gmail.com"
                className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 -mt-3 text-xs">Email is required</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                })}
                placeholder="Enter Your Password"
                className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 -mt-3 text-xs">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 -mt-3 text-xs">
                  Password must be at least 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-500 -mt-3 text-xs">
                  Password must not exceed 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 -mt-3 text-xs">
                  Password must contain at least one uppercase letter, one
                  lowercase letter, and one number
                </p>
              )}
            </div>
          </div>

          <div className="text-sm text-green-600 mb-4 cursor-pointer">
            Forget Password?
          </div>

          <button
            type="submit"
            className="w-full bg-[#CAEB66]  text-black py-2 rounded mb-4 font-medium"
          >
            Register
          </button>

          <p className="text-sm text-gray-600 mb-2">
            Don't have any account?{" "}
            <Link to="/login" className="text-green-600 cursor-pointer">
              Login
            </Link>
          </p>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-2 text-sm text-gray-400">Or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
