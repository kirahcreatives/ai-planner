import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip } from './Help';
import { componentHelp } from '../utils/helpContent';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Header = ({ title, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 shadow-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo className="text-white" showTextOnMobile={false} />
            </div>
            <div className="ml-4 md:ml-8 flex items-center">
              <span className="block md:hidden text-xl font-bold text-white">
                AI Planner
              </span>
              <h1 className="hidden md:block text-xl font-semibold text-white">
                {title}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Tooltip content={componentHelp.header.newPlan} position="bottom">
                    <Link to="/" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
                      New Plan
                    </Link>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip content={componentHelp.header.viewItinerary} position="bottom">
                    <Link to="/results" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
                      View Itinerary
                    </Link>
                  </Tooltip>
                </li>
                {!user ? (
                  <>
                    <li>
                      <Link to="/login" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors duration-200 font-medium">
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="relative">
                    <div className="relative">
                      <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors duration-200 font-medium focus:outline-none"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center text-blue-600 dark:text-blue-200">
                          {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span>{user.firstName ? `${user.firstName} ${user.lastName}` : 'User'}</span>
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${isMenuOpen ? 'transform rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isMenuOpen && (
                        <>
                          <div
                            className="fixed inset-0 h-full w-full z-10"
                            onClick={() => setIsMenuOpen(false)}
                          ></div>
                          <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20">
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                              Sign Out
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </li>
                )}
              </ul>
            </nav>
            {children}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-blue-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-20 left-0 right-0 bg-indigo-600 shadow-lg md:hidden">
              <nav className="px-4 py-3">
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="block text-blue-100 hover:text-white transition-colors duration-200 py-2 px-4 rounded hover:bg-indigo-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      New Plan
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/results"
                      className="block text-blue-100 hover:text-white transition-colors duration-200 py-2 px-4 rounded hover:bg-indigo-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View Itinerary
                    </Link>
                  </li>
                  {user ? (
                    <>
                      <li className="border-t border-indigo-500 mt-2 pt-2">
                        <div className="px-4 py-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-700 flex items-center justify-center text-blue-600 dark:text-blue-200">
                              {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="text-white font-medium">
                              {user.firstName ? `${user.firstName} ${user.lastName}` : 'User'}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left text-blue-100 hover:text-white transition-colors duration-200 py-2 px-4 rounded hover:bg-indigo-700"
                        >
                          Sign Out
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="block text-blue-100 hover:text-white transition-colors duration-200 py-2 px-4 rounded hover:bg-indigo-700"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className="block bg-white text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 py-2 px-4 rounded"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-30"></div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;