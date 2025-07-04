import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-6 mt-10 shadow-inner border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">

        {/* Left: Name & Tagline */}
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold text-gray-200">Saish Patil</p>
          <p className="text-sm text-gray-400">Crafting clean code & creative apps 💻</p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-5 text-xl">
          <a
            href="https://github.com/saishpatil-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transform hover:scale-125 transition duration-300"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/saishpatil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transform hover:scale-125 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com/saishpatil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transform hover:scale-125 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
