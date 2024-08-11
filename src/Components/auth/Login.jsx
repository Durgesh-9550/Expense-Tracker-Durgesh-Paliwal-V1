import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Footer from "../common/Footer";
import axiosInstance from "../../apis/axiosInstance";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the values to make sure they are correct
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await axiosInstance.post("/auth", {
        email,
        password,
      });

      const { token, user } = res.data;

      // Call login function to update context state
      login(token, user);
    } catch (err) {
      console.error("Error response:", err.response); // This logs the full error response from the server
      setError("Invalid Credentials");
      toast.error("Invalid Credentials");
    }
  };

  const onClickRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)] pt-16">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[45px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            <p className="text-gray-600 mb-4 mt-6 text-center">Or</p>
            <div className="flex justify-center items-center">
              <p className="text-gray-700 mr-2">Don't have an account?</p>
              <button
                onClick={onClickRegister}
                className="text-blue-500 hover:text-blue-600 font-semibold transition duration-300"
              >
                Register
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

export default Login;
