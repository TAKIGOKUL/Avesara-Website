import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingCards = [
    { icon: '💼', text: 'Jobs', delay: 0 },
    { icon: '🎓', text: 'Internships', delay: 2 },
    { icon: '📅', text: 'Events', delay: 4 }
  ];

  return (
    <section className="hero" id="home">
      <div 
        className="hero-background"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(0, 255, 136, 0.1) 0%, 
            rgba(240, 248, 240, 0.8) 40%, 
            rgba(255, 255, 255, 1) 100%)`
        }}
      />
      
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover Amazing Opportunities
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Find the perfect job, internship, or technical event that matches your skills and aspirations
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Opportunities
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Community
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="hero-graphic">
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                className="floating-card"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -20, 0]
                }}
                transition={{ 
                  duration: 6,
                  delay: card.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  boxShadow: "0 20px 40px rgba(0, 255, 136, 0.3)"
                }}
              >
                <div className="card-icon">{card.icon}</div>
                <span>{card.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Interactive particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
