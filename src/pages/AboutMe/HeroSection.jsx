import React from "react";
import { FaCode, FaRocket, FaCoffee, FaArrowRight } from "react-icons/fa";

export default function HeroSection({ isDarkMode }) {
  return (
    <section className="pt-20 pb-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center" data-aos="fade-down">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Hi, I'm <span className="text-blue-500">Saish Sachin Patil</span>
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I craft beautiful, performant web applications using modern technologies. Passionate about clean code, user experience, and pushing the boundaries of web development.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" data-aos="fade-up">
          {[
            { icon: FaCode, title: "Clean Code", desc: "Writing maintainable and scalable code" },
            { icon: FaRocket, title: "Performance", desc: "Optimizing for speed and efficiency" },
            { icon: FaCoffee, title: "Coffee Driven", desc: "Fueled by caffeine and creativity" },
          ].map((item, index) => (
            <div key={index} className={`text-center p-6 rounded-2xl transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <item.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12" data-aos="fade-up">
          <a
            href="#projects"
            className="inline-flex items-center bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg"
          >
            View My Work <FaArrowRight className="ml-2" />
          </a>
          <a
            href="#contact"
            className={`inline-flex items-center border-2 px-8 py-4 rounded-full font-semibold transition-colors ${
              isDarkMode
                ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
} 