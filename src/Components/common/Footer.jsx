// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
        <p className="text-sm">Made with ❤️ by Durgesh Paliwal</p>
        {/* <div className="mt-2">
          <a href="/" className="text-blue-400 hover:underline mx-2">Home</a>
          <a href="/about" className="text-blue-400 hover:underline mx-2">About</a>
          <a href="/contact" className="text-blue-400 hover:underline mx-2">Contact</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
