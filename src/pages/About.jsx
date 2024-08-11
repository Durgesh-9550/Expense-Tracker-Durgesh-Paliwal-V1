import React from "react";
import Footer from "../Components/common/Footer";

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[rgb(142,118,145)] via-[rgba(142,118,145,0.689)] to-[rgba(148,187,233,1)] flex flex-col items-center justify-center">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-3xl text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About ExpenseTracker</h1>
          <p className="text-lg text-gray-100 mb-4">
            ExpenseTracker is a powerful tool designed to help you manage your finances with ease.
          </p>
          <p className="text-lg text-gray-100 mb-4">
            Our mission is to provide a user-friendly platform where you can keep track of your expenses, set budgets, and achieve your financial goals.
          </p>
          <p className="text-lg text-gray-100 mb-4">
            Built using the MERN stack, ExpenseTracker combines the best of MongoDB, Express.js, React.js, and Node.js to deliver a seamless and responsive experience.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
