import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import { Container, Logo } from '../index';

export default function Header() {
  const authStatus = useSelector(state => state.auth.status);
  const user = useSelector(state => state.auth.userData);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const avatar = user?.name?.[0]?.toUpperCase() || 'U';

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Sign Up', slug: '/signup', active: !authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between py-4 relative">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Logo width="40px" />
            <span className="text-2xl font-extrabold text-white drop-shadow-sm group-hover:text-gray-300 transition-all duration-300">
              MegaBlog
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-4">
            {navItems.map((item, i) =>
              item.active && (
                <li key={i}>
                  <Link
                    to={item.slug}
                    className={`relative px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-1 transition-all duration-300 focus:outline-none focus-visible:ring-2
                    ${location.pathname === item.slug
                      ? 'bg-white text-gray-900 shadow after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-1 after:bg-gray-700 after:rounded-full'
                      : 'text-gray-200 hover:bg-gray-700/50 hover:shadow-md hover:scale-105'}`}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
            {authStatus && (
              <li className="relative group">
                <Link
                  to="/profile"
                  className="w-10 h-10 rounded-full bg-white text-gray-800 font-bold flex items-center justify-center shadow ring-2 ring-white hover:ring-4 transition-all duration-300"
                  aria-label="Profile"
                >
                  {avatar}
                </Link>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  Profile
                </span>
              </li>
            )}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <>
              <div className="absolute top-full mt-3 right-0 w-64 bg-gray-900 rounded-xl shadow-2xl z-50 p-4 animate-slide-in space-y-3 border border-gray-700">
                {navItems.map((item, index) =>
                  item.active && (
                    <Link
                      key={index}
                      to={item.slug}
                      className={`block px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none
                      ${location.pathname === item.slug
                        ? 'bg-gray-700 text-white shadow'
                        : 'text-gray-300 hover:bg-gray-700/60'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
                {authStatus && (
                  <Link
                    to="/profile"
                    className="w-10 h-10 mx-auto mt-4 rounded-full bg-white text-gray-800 font-bold flex items-center justify-center shadow ring-2 ring-white hover:ring-4 transition-all duration-300"
                    aria-label="Profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {avatar}
                  </Link>
                )}
              </div>
              <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />
            </>
          )}
        </nav>
      </Container>
    </header>
  );
}
