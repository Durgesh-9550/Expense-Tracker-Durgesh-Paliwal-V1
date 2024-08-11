import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../common/Footer";
import axiosInstance from "../../apis/axiosInstance";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    income: "", // Added income field
  });

  const { name, email, password, income } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate password whenever it changes
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (!uppercase.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!lowercase.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
    } else if (!number.test(password)) {
      setPasswordError("Password must contain at least one number");
    } else if (!specialChar.test(password)) {
      setPasswordError("Password must contain at least one special character");
    } else {
      setPasswordError(""); // Clear error if all conditions are met
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      // Prevent form submission if there is a password error
      return;
    }

    const newUser = {
      name,
      email,
      password,
      income, // Include income in the newUser object
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(newUser);

      const res = await axiosInstance.post("/users", body, config);

      // Show success toast
      toast.success("User Registered successfully");

      // Delay navigation to allow toast to be visible
      setTimeout(() => {
        navigate("/login");
      }, 1000); // 2-second delay
    } catch (err) {
      if (err.response && err.response.data.errors) {
        // Check if there is a specific error message for user already registered
        const errorMsg = err.response.data.errors.find(
          (error) => error.msg === "User already exists"
        );
        if (errorMsg) {
          toast.error("The User is Already Registered with us!!");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)] pt-20">
        <div className="w-full md:w-[30%] max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <form
            onSubmit={onSubmit}
            className="flex justify-center flex-col items-center"
          >
            {/* Name */}
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            {/* Income */}
            <input
              type="number"
              placeholder="Enter Your Income"
              name="income"
              value={income}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            {/* Password */}
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[15px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>

            {/* Password Error */}
            {passwordError && (
              <p className="text-red-500 text-sm mb-4">{passwordError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={!!passwordError} // Disable the button if there's a password error
            >
              Register
            </button>

            <p className="text-gray-600 mb-1 mt-2">Or</p>
            <div className="flex items-center">
              <p className="text-gray-700 mr-2">Already a user?</p>
              <button
                onClick={onClickLogin}
                className="text-blue-500 hover:text-blue-600 font-semibold transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <Toaster /> {/* Include Toaster component to display toasts */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
