import React from "react";
import { FaHeart } from "react-icons/fa";

export default function FooterQuote({ isDarkMode }) {
  return (
    <section className="py-12 px-6 md:px-20 text-center">
      <div className="max-w-4xl mx-auto">
        <div className={`flex items-center justify-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} data-aos="fade-up">
          <FaHeart className="w-5 h-5 text-red-500" />
          <span className="text-lg italic">"Building what matters."</span>
        </div>
      </div>
    </section>
  );
} 