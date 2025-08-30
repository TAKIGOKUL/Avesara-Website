import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Avesara</h3>
            <p>Your gateway to amazing opportunities. Find the perfect job, internship, or technical event that matches your skills and aspirations.</p>
            <div className="footer-social">
              <motion.div 
                className="social-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-twitter"></i>
              </motion.div>
              <motion.div 
                className="social-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-linkedin"></i>
              </motion.div>
              <motion.div 
                className="social-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-github"></i>
              </motion.div>
              <motion.div 
                className="social-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-instagram"></i>
              </motion.div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#opportunities">Opportunities</a>
            <a href="#community">Community</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>
          
          <div className="footer-section">
            <h3>Support</h3>
            <a href="#help">Help Center</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact Support</a>
            <a href="#feedback">Feedback</a>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>Email: info@avesara.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Innovation St, Tech City, TC 12345</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Avesara. All rights reserved.</p>
          <div className="footer-bottom-links">
            <motion.button 
              className="footer-link-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Privacy Policy
            </motion.button>
            <motion.button 
              className="footer-link-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Terms of Service
            </motion.button>
            <motion.button 
              className="footer-link-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cookie Policy
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
