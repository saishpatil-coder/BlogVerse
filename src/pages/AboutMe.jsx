import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRight, FaCode, FaRocket, FaCoffee, FaHeart } from "react-icons/fa";
import { FaSun, FaMoon } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutMe() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Dark Mode Toggle Button */}
      <div className="fixed top-24 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
            isDarkMode 
              ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>
      </div>

      {/* Hero Section */}
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

          {/* Key Features */}
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

          {/* CTA Buttons */}
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

      {/* About Section */}
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

      {/* Skills Section */}
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
            <div className={`p-8 rounded-2xl shadow-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frontend</h3>
              <div className="space-y-3">
                {["React", "Next.js", "JavaScript", "HTML/CSS", "Tailwind CSS", "Redux"].map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{skill}</span>
                    <div className={`w-16 h-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className={`p-8 rounded-2xl shadow-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Backend</h3>
              <div className="space-y-3">
                {["Node.js", "Express.js", "MongoDB", "Appwrite", "REST APIs", "Authentication"].map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{skill}</span>
                    <div className={`w-16 h-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div className="w-14 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI/ML & Tools */}
            <div className={`p-8 rounded-2xl shadow-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>AI/ML & Tools</h3>
              <div className="space-y-3">
                {["Python", "Machine Learning", "Git", "VS Code", "Postman", "Competitive Coding"].map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{skill}</span>
                    <div className={`w-16 h-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div className="w-10 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Always Learning */}
          <div className="mt-16 text-center" data-aos="fade-up">
            <div className={`p-8 rounded-2xl text-white ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}>
              <h3 className="text-2xl font-bold mb-4">Always Learning</h3>
              <p className="text-lg opacity-90 max-w-3xl mx-auto">
                Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, languages, and tools to stay at the forefront of web development. Currently diving deep into AI integration, advanced React patterns, and cloud deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-16 px-6 md:px-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`} id="contact">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-down">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div data-aos="fade-right">
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="w-5 h-5 text-blue-500 mr-3" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>saishsachinpatil@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-blue-500 mr-3" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>TKIET, Warananagar, India</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Follow Me</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/sampleuser" target="_blank" rel="noreferrer" className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/sampleuser" target="_blank" rel="noreferrer" className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-700'}`}>
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a href="https://instagram.com/sampleuser" target="_blank" rel="noreferrer" className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-500'}`}>
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a href="https://twitter.com/sampleuser" target="_blank" rel="noreferrer" className={`transition-colors ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`}>
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Let's Work Together */}
            <div data-aos="fade-left">
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Let's Work Together</h3>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm always interested in new opportunities and exciting projects. Whether you need a full-stack developer, technical consultant, or just want to discuss technology, don't hesitate to reach out.
              </p>
              <a
                href="mailto:saishsachinpatil@gmail.com"
                className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
              >
                Send Message <FaArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-12 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`flex items-center justify-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} data-aos="fade-up">
            <FaHeart className="w-5 h-5 text-red-500" />
            <span className="text-lg italic">"Building what matters."</span>
          </div>
        </div>
      </section>
    </div>
  );
} 