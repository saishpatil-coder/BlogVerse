import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import { Container, LogOutBtn, Logo } from '../index';

export default function Header() {
    const authStatus = useSelector(state => state.auth.status);
    const user = useSelector(state => state.auth.userData);
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Fallback to 'U' if user or user.name is unavailable
    const avatar = user?.name?.[0]?.toUpperCase() || 'U';

    useEffect(() => {
        console.log(user);
        console.log(user?.name);
        console.log(user?.name?.[0]?.toUpperCase());
    }, [user]);

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'All Posts', slug: '/all-posts', active: true },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Sign Up', slug: '/signup', active: !authStatus },
    ];

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg backdrop-blur-md">
            <Container>
                <nav className="flex items-center justify-between py-4 relative">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 rounded-lg transition-all duration-300" tabIndex={0}>
                        <Logo width="40px" />
                        <span className="text-2xl font-extrabold text-white tracking-tight drop-shadow-lg group-hover:text-indigo-200 group-hover:scale-105 transition-all duration-300">
                            MegaBlog
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-3">
                        {navItems.map((item, index) => (
                            item.active && (
                                <li key={index}>
                                    <Link
                                        to={item.slug}
                                        className={`relative text-sm px-5 py-2 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                                        ${location.pathname === item.slug
                                            ? "bg-gradient-to-r from-white to-blue-100 text-blue-700 shadow-md after:absolute after:bottom-0 after:left-5 after:right-5 after:h-1 after:bg-blue-400 after:rounded-full after:scale-x-100"
                                            : "text-white hover:bg-blue-500 hover:shadow-md hover:scale-105 after:absolute after:bottom-0 after:left-5 after:right-5 after:h-1 after:bg-white/40 after:rounded-full after:scale-x-0 group-hover:after:scale-x-100"}`}
                                    >
                                        {item.name === 'Add Post' && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        )}
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        ))}
                        {authStatus && (
                                <li className="relative group">
                                    <Link
                                        to="/profile"
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-extrabold text-lg shadow-md ring-2 ring-white/60 hover:ring-4 hover:ring-indigo-300 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                                        aria-label="Profile"
                                        tabIndex={0}
                                    >
                                        {avatar}
                                    </Link>
                                    {/* Tooltip */}
                                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                                        Profile
                                    </span>
                                </li>
                        )}
                    </ul>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 bg-white/10 hover:bg-white/20 transition-all duration-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="absolute top-full mt-3 right-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 py-4 px-3 animate-slide-in">
                            {navItems.map((item, index) => (
                                item.active && (
                                    <Link
                                        key={index}
                                        to={item.slug}
                                        className={`block px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200
                                        ${location.pathname === item.slug
                                            ? "bg-gradient-to-r from-blue-100 to-white text-blue-700 shadow"
                                            : "text-gray-800 hover:bg-blue-50 hover:scale-105"}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name === 'Add Post' && (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        )}
                                        {item.name}
                                    </Link>
                                )
                            ))}
                            {authStatus && (
                                    <Link
                                        to="/profile"
                                        className="w-10 h-10 mx-auto mt-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-extrabold text-lg shadow ring-2 ring-blue-200 hover:ring-4 hover:ring-indigo-300 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                                        aria-label="Profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        tabIndex={0}
                                    >
                                        {avatar}
                                    </Link>
                            )}
                        </div>
                    )}
                    {/* Overlay for mobile menu */}
                    {mobileMenuOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300" onClick={()=>setMobileMenuOpen(false)} aria-hidden="true"></div>}
                </nav>
            </Container>
        </header>
    );
}