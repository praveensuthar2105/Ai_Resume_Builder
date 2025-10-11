import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user, login, logout, loading } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { to: "/home", text: "Home" },
        { to: "/services", text: "Services" },
        { to: "/about", text: "About" },
        { to: "/contact", text: "Contact" },
        { to: "/ats-checker", text: "ATS Checker" },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            AI Resume Builder
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
                            >
                                {link.text}
                            </Link>
                        ))}
                        {loading ? null : isAuthenticated ? (
                            <>
                                <span className="text-gray-800 font-medium">Welcome, {user?.name || 'User'}</span>
                                <button
                                    onClick={logout}
                                    className="ml-4 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-300"
                                >
                                    Logout
                                </button>
                                <Link
                                    to="/GenerateResume"
                                    className="ml-4 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300"
                                >
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={login}
                                className="ml-4 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300"
                            >
                                Login with Google
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                        >
                            {link.text}
                        </Link>
                    ))}
                    <div className="mt-4">
                        {loading ? null : isAuthenticated ? (
                            <>
                                <div className="px-3 py-2 text-gray-800 font-medium">Welcome, {user?.name || 'User'}</div>
                                <Link
                                    to="/GenerateResume"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full text-left mt-2 px-3 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Get Started
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="block w-full text-left mt-2 px-3 py-3 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    login();
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left mt-2 px-3 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Login with Google
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
