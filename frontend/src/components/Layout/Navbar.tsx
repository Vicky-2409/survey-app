import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../../constants/routes.constant";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../UI/Button";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(Routes.HOME);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={Routes.HOME} className="flex items-center">
              <span className="text-xl font-bold text-blue-600">
                Survey App
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to={Routes.SURVEY_FORM}
              className="text-gray-600 hover:text-blue-600 transition duration-200 text-sm font-medium"
            >
              Take Survey
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={Routes.SURVEY_LIST}
                  className="text-gray-600 hover:text-blue-600 transition duration-200 text-sm font-medium"
                >
                  View Submissions
                </Link>
                <Button
                  variant="secondary"
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-200 text-sm font-medium"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                to={Routes.LOGIN}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200 text-sm font-medium"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to={Routes.SURVEY_FORM}
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Take Survey
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={Routes.SURVEY_LIST}
                  className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  View Submissions
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={Routes.LOGIN}
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
