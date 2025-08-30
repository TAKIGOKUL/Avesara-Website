import React from 'react';
import { motion } from 'framer-motion';
import './Community.css';

const Community: React.FC = () => {
  const features = [
    {
      icon: '🔔',
      title: 'Smart Alerts',
      description: 'Get notified about deadlines and new opportunities',
      delay: 0
    },
    {
      icon: '👥',
      title: 'Network',
      description: 'Connect with professionals in your field',
      delay: 0.2
    },
    {
      icon: '💡',
      title: 'Insights',
      description: 'Access exclusive tips and industry knowledge',
      delay: 0.4
    }
  ];

  return (
    <section className="community" id="community">
      <div className="community-container">
        <motion.div 
          className="community-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join Our Community
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Connect with like-minded professionals, share insights, and stay updated with the latest opportunities
          </motion.p>
          
          <motion.div 
            className="community-features"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 255, 136, 0.2)"
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="feature-icon"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.button 
            className="btn btn-primary join-btn"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Join Now
          </motion.button>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="community-bg-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </section>
  );
};

export default Community;
