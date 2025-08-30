import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About: React.FC = () => {
  const stats = [
    { number: '10K+', label: 'Opportunities Posted', delay: 0 },
    { number: '5K+', label: 'Active Users', delay: 0.2 },
    { number: '500+', label: 'Companies', delay: 0.4 },
    { number: '95%', label: 'Success Rate', delay: 0.6 }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '👩‍💼',
      description: 'Former tech executive with 15+ years in the industry'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '👨‍💻',
      description: 'Full-stack developer and system architect'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Community',
      image: '👩‍🎓',
      description: 'Passionate about connecting people and opportunities'
    }
  ];

  return (
    <section className="about" id="about">
      <div className="about-container">
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>About Avesara</h2>
          <p>
            We're on a mission to democratize access to opportunities in the tech industry. 
            Our platform connects talented individuals with amazing opportunities, making the 
            journey from aspiration to achievement smoother and more accessible.
          </p>
        </motion.div>

        <motion.div 
          className="about-stats"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ 
                duration: 0.6, 
                delay: stat.delay,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="about-mission"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="mission-content">
            <h3>Our Mission</h3>
            <p>
              To create a world where everyone has equal access to opportunities that match 
              their skills and aspirations. We believe that talent is distributed equally, 
              but opportunities are not. Avesara is here to change that.
            </p>
            <div className="mission-values">
              <div className="value">
                <i className="fas fa-heart"></i>
                <span>Accessibility</span>
              </div>
              <div className="value">
                <i className="fas fa-users"></i>
                <span>Community</span>
              </div>
              <div className="value">
                <i className="fas fa-rocket"></i>
                <span>Innovation</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="about-team"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Meet Our Team</h3>
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-member"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 255, 136, 0.2)"
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                <div className="member-avatar">{member.image}</div>
                <h4>{member.name}</h4>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="about-cta"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>Ready to Get Started?</h3>
          <p>Join thousands of professionals who have already discovered their next opportunity</p>
          <motion.button 
            className="btn btn-primary"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
