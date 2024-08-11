import React from "react";
import Footer from "../Components/common/Footer";
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)] flex flex-col items-center justify-center">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-3xl text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Welcome to ExpenseTracker</h1>
          <p className="text-lg text-gray-100 mb-6">
            Track your expenses and manage your budget effortlessly with ExpenseTracker.
          </p>
          <p className="text-lg text-gray-100 mb-6">
            Sign up today to start managing your finances better and achieve your financial goals.
          </p>
          <div className="flex justify-center">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
