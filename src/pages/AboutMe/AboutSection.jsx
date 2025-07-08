import React from "react";
import { FaCode, FaRocket } from "react-icons/fa";

export default function AboutSection({ isDarkMode }) {
  return (
    <section className={`py-16 px-6 md:px-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`} id="about">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About Me</h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Passionate developer with a love for creating exceptional digital experiences
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* My Journey */}
          <div data-aos="fade-right">
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Journey</h3>
            <div className={`space-y-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>
                Started my journey as a Computer Science student at TKIET, Warananagar, fascinated by the endless possibilities of code. I've evolved from building simple websites to architecting complex, scalable applications using the MERN stack.
              </p>
              <p>
                I believe in writing clean, maintainable code and staying up-to-date with the latest technologies. My approach combines technical expertise with creative problem-solving to deliver solutions that not only work but delight users.
              </p>
              <p>
                I actively solve problems on LeetCode and love optimizing my logic and time complexity. My goal is to create technology that makes life simpler and smarter.
              </p>
            </div>
          </div>
          {/* What I Do */}
          <div data-aos="fade-left">
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>What I Do</h3>
            <ul className={`space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-center">
                <FaCode className="w-5 h-5 text-blue-500 mr-3" />
                Full-stack web development with MERN stack
              </li>
              <li className="flex items-center">
                <FaRocket className="w-5 h-5 text-blue-500 mr-3" />
                API design and development
              </li>
              <li className="flex items-center">
                <FaCode className="w-5 h-5 text-blue-500 mr-3" />
                Database architecture and optimization
              </li>
              <li className="flex items-center">
                <FaRocket className="w-5 h-5 text-blue-500 mr-3" />
                AI/ML integration and automation
              </li>
              <li className="flex items-center">
                <FaCode className="w-5 h-5 text-blue-500 mr-3" />
                Competitive programming and problem solving
              </li>
            </ul>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16" data-aos="fade-up">
          {[
            { number: "2+", label: "Years Experience" },
            { number: "15+", label: "Projects Completed" },
            { number: "25+", label: "Technologies" },
            { number: "∞+1", label: "Sleepless Nights" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">{stat.number}</div>
              <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 