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
    { name: 'All Posts', slug: '/all-posts', active: true },
    { name: 'About', slug: '/about', active: true },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo width="32px" />
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              MegaBlog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) =>
              item.active && (
                <Link
                  key={i}
                  to={item.slug}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.slug
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {authStatus ? (
              <Link
                to="/profile"
                className="w-8 h-8 rounded-full bg-blue-600 text-white font-medium flex items-center justify-center text-sm hover:bg-blue-700 transition-colors"
              >
                {avatar}
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            {navItems.map((item, index) =>
              item.active && (
                <Link
                  key={index}
                  to={item.slug}
                  className={`block text-sm font-medium transition-colors ${
                    location.pathname === item.slug
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            
            {authStatus ? (
              <Link
                to="/profile"
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-medium flex items-center justify-center text-sm">
                  {avatar}
                </div>
                Profile
              </Link>
            ) : (
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <Link
                  to="/login"
                  className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}
