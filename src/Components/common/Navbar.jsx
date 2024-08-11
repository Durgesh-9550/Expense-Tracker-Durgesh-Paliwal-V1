import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown after login
  useEffect(() => {
    if (isLoggedIn) {
      setDropdownOpen(false);
    }
  }, [isLoggedIn]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="text-xl font-bold">
          <Link to="/">ExpenseTracker</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:bg-gray-700 px-4 py-2 rounded">
            Home
          </Link>
          <Link to="/about" className="hover:bg-gray-700 px-4 py-2 rounded">
            About
          </Link>
          <Link to="/contact" className="hover:bg-gray-700 px-4 py-2 rounded">
            Contact
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:bg-gray-700 px-4 py-2 rounded">
                Login
              </Link>
              <Link to="/register" className="hover:bg-gray-700 px-4 py-2 rounded">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:bg-gray-700 px-4 py-2 rounded">
                Dashboard
              </Link>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-gray-700 p-2 rounded hover:bg-gray-600"
                >
                  {user?.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg w-40">
                    <button className="w-full text-left px-4 py-2">
                      {user?.name || "User"}
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-600"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
