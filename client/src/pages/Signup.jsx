import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { setSignupData } from "../redux/slice/AuthSlice";
import { useDispatch } from "react-redux";
import { sendOtp } from "../services/operations/AuthAPI";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [password, showPassword] = useState(false);
  const [confirmPassword, showConfirmPassword] = useState(false);

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(sendOtp(formData.email, navigate));
    dispatch(setSignupData(formData));

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex justify-center items-center h-full p-5">
      <form
        className="flex flex-col w-[425px] md:max-w-[425px] mx-auto md:p-6 md:border md:shadow-lg md:rounded-lg gap-y-4 text-sm"
        onSubmit={submitHandler}
      >
        {/* Icon and Heading */}
        <div className="mx-auto py-4">
          <VscAccount size={50} className="mx-auto text-gray-800" />
          <h1 className="text-3xl italic font-serif mt-2 text-center text-gray-800">
            Signup
          </h1>
        </div>

        {/* Name Input */}
        <label className="w-full">
          <p className="text-[0.875rem] mb-1">
            Name<sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={changeHandler}
            className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
          />
        </label>

        {/* Email Input */}
        <label className="w-full">
          <p className="text-[0.875rem] mb-1">
            Email Address<sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            onChange={changeHandler}
            className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
          />
        </label>

        {/* Password Input */}
        <label className="w-full relative">
          <p className="text-[0.875rem] mb-1">
            Enter Password<sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type={password ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={changeHandler}
            className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
          />
          <span
            className="absolute right-3 top-[33px] cursor-pointer"
            onClick={() => showPassword((prev) => !prev)}
          >
            {password ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#656464" />
            )}
          </span>
        </label>

        {/* Confirm Password Input */}
        <label className="w-full relative">
          <p className="text-[0.875rem] mb-1">
            Confirm Password<sup className="text-red-600">*</sup>
          </p>
          <input
            required
            type={confirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={changeHandler}
            className="rounded-[8px] w-full pl-3 py-2 border border-b-orange-500 focus:border-b-2 outline-none shadow-sm"
          />
          <span
            className="absolute right-3 top-[33px] cursor-pointer"
            onClick={() => showConfirmPassword((prev) => !prev)}
          >
            {confirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#656464" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#656464" />
            )}
          </span>
        </label>

        {/* Create Account Button */}
        <button className="bg-orange-500 py-2 px-5 text-lg font-semibold rounded-[8px] mt-6 w-full text-white hover:bg-orange-600 transition-all">
          Create Account
        </button>

        {/* Login Link */}
        <div className="text-center mt-2">
          <p>
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-orange-500 hover:text-orange-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
