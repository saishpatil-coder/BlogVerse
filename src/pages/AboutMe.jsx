import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaCode, FaRocket, FaCoffee, FaHeart, FaSun, FaMoon, FaArrowRight, FaCloud, FaMobileAlt, FaCube, FaGitAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import DarkModeToggle from "./AboutMe/DarkModeToggle";
import HeroSection from "./AboutMe/HeroSection";
import AboutSection from "./AboutMe/AboutSection";
import SkillsSection from "./AboutMe/SkillsSection";
import ContactSection from "./AboutMe/ContactSection";
import FooterQuote from "./AboutMe/FooterQuote";

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
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <HeroSection isDarkMode={isDarkMode} />
      <AboutSection isDarkMode={isDarkMode} />
      <SkillsSection isDarkMode={isDarkMode} />
      <ContactSection isDarkMode={isDarkMode} />
      <FooterQuote isDarkMode={isDarkMode} />
    </div>
  );
} 