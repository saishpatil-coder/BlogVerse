import React from "react";
import { FaCode, FaCloud, FaMobileAlt, FaCube, FaGitAlt } from "react-icons/fa";

export default function SkillsSection({ isDarkMode }) {
  return (
    <section className="py-16 px-6 md:px-20" id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills & Technologies</h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {/* Frontend */}
          <div className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-950/95'} shadow-lg`}>  
            <div className="flex items-center mb-4">
              <span className="text-blue-400 text-2xl mr-2">{'<>'}</span>
              <h3 className="text-2xl font-bold text-white">Frontend</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map(skill => (
                <span key={skill} className="bg-gray-800 text-gray-100 px-4 py-1 rounded-full text-sm font-medium">{skill}</span>
              ))}
            </div>
          </div>
          {/* Backend */}
          <div className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-950/95'} shadow-lg`}>  
            <div className="flex items-center mb-4">
              <span className="text-green-400 text-2xl mr-2"><FaCode /></span>
              <h3 className="text-2xl font-bold text-white">Backend</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "NestJS"].map(skill => (
                <span key={skill} className="bg-gray-800 text-gray-100 px-4 py-1 rounded-full text-sm font-medium">{skill}</span>
              ))}
            </div>
          </div>
          {/* Cloud & DevOps */}
          <div className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-950/95'} shadow-lg`}>  
            <div className="flex items-center mb-4">
              <span className="text-purple-400 text-2xl mr-2"><FaCloud /></span>
              <h3 className="text-2xl font-bold text-white">Cloud & DevOps</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["AWS", "Docker", "Vercel", "Google Console"].map(skill => (
                <span key={skill} className="bg-gray-800 text-gray-100 px-4 py-1 rounded-full text-sm font-medium">{skill}</span>
              ))}
            </div>
          </div>
          {/* Mobile */}
          <div className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-950/95'} shadow-lg`}>  
            <div className="flex items-center mb-4">
              <span className="text-orange-400 text-2xl mr-2"><FaMobileAlt /></span>
              <h3 className="text-2xl font-bold text-white">Mobile</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["React Native", "iOS", "Android", "PWA"].map(skill => (
                <span key={skill} className="bg-gray-800 text-gray-100 px-4 py-1 rounded-full text-sm font-medium">{skill}</span>
              ))}
            </div>
          </div>
          {/* Web3 & Blockchain */}
          <div className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-950/95'} shadow-lg`}>  
            <div className="flex items-center mb-4">
              <span className="text-blue-300 text-2xl mr-2"><FaCube /></span>
              <h3 className="text-2xl font-bold text-white">Web3 & Blockchain</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["ETH", "Smart Contracts", "Solidity", "SOL", "EVM", "QuickNode"].map(skill => (
                <span key={skill} className="bg-gray-800 text-gray-100 px-4 py-1 rounded-full text-sm font-medium">{skill}</span>
              ))}
            </div>
          </div>
          {/* Tools */}
          <div className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-950/95'} shadow-lg`}>  
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-2xl mr-2"><FaGitAlt /></span>
              <h3 className="text-2xl font-bold text-white">Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Git", "VS Code", "Linear", "Notion", "Postman", "Chrome DevTools"].map(skill => (
                <span key={skill} className="bg-gray-800 text-gray-100 px-4 py-1 rounded-full text-sm font-medium">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 