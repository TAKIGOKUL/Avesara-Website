import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';
import './Navbar.css';

interface NavbarProps {
  theme: Theme;
  onThemeToggle: () => void;
  onPostAlert: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onThemeToggle, onPostAlert }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2>Avesara</h2>
        </motion.div>
        
        <div className="nav-menu">
          <motion.a 
            href="#home" 
            className="nav-link"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.a>
          <motion.a 
            href="#opportunities" 
            className="nav-link"
            onClick={(e) => { e.preventDefault(); scrollToSection('opportunities'); }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Opportunities
          </motion.a>
          <motion.a 
            href="#community" 
            className="nav-link"
            onClick={(e) => { e.preventDefault(); scrollToSection('community'); }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Community
          </motion.a>
          <motion.a 
            href="#about" 
            className="nav-link"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.a>
        </div>
        
        <div className="nav-actions">
          <motion.button 
            className="theme-toggle"
            onClick={onThemeToggle}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
          </motion.button>
          
          <motion.button 
            className="post-alert-btn"
            onClick={onPostAlert}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Post Alert
          </motion.button>
          
          <div className="social-links">
            <motion.a 
              href="#" 
              className="social-link"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-twitter"></i>
            </motion.a>
            <motion.a 
              href="#" 
              className="social-link"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-linkedin"></i>
            </motion.a>
            <motion.a 
              href="#" 
              className="social-link"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-github"></i>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
