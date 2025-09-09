import React, { useState } from "react";
import { Link } from "react-router-dom";

function navBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm shadow-xl border-b border-blue-100 px-4 sm:px-6 lg:px-8 py-4 relative z-[100]">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-all duration-300">
                    <span className="hidden sm:inline">Resume Builder</span>
                    <span className="sm:hidden">Resume</span>
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="flex-none hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3">
                    <li>
                        <Link 
                            to="/home" 
                            className="btn btn-ghost text-gray-700 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-full px-6 py-3 transition-all duration-300 font-medium"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/services" 
                            className="btn btn-ghost text-gray-700 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-full px-6 py-3 transition-all duration-300 font-medium"
                        >
                            Service
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/about" 
                            className="btn btn-ghost text-gray-700 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-full px-6 py-3 transition-all duration-300 font-medium"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/contact" 
                            className="btn btn-ghost text-gray-700 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-full px-6 py-3 transition-all duration-300 font-medium"
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/GenerateResume" 
                            className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none rounded-full px-8 py-3 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                        >
                            Get Started
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex-none lg:hidden">
                <button 
                    className="btn btn-ghost btn-square p-2 text-gray-700 hover:text-blue-600 hover:bg-white/50"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="fixed top-[80px] left-0 right-0 bg-white shadow-2xl border-t border-gray-200 lg:hidden z-[200]">
                    <ul className="px-4 py-3 space-y-2">
                        <li>
                            <Link 
                                to="/home" 
                                className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-3 px-4 text-base font-medium transition-all duration-300 no-underline"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/services" 
                                className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-3 px-4 text-base font-medium transition-all duration-300 no-underline"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Service
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/about" 
                                className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-3 px-4 text-base font-medium transition-all duration-300 no-underline"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/contact" 
                                className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-3 px-4 text-base font-medium transition-all duration-300 no-underline"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </li>
                        <li className="mt-3">
                            <Link 
                                to="/GenerateResume" 
                                className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-3 px-4 text-base font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 no-underline"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
export default navBar;
