import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProcessedOpportunity } from '../services/googleSheetsService';
import './Opportunities.css';

interface OpportunitiesProps {
  opportunities: ProcessedOpportunity[];
  onSetAlert: (opportunity: ProcessedOpportunity) => void;
  isLoading?: boolean;
  currentFilter?: 'all' | 'job' | 'internship' | 'event';
}

const Opportunities: React.FC<OpportunitiesProps> = ({ 
  opportunities, 
  onSetAlert, 
  isLoading = false,
  currentFilter = 'all'
}) => {
  const getDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const getDeadlineClass = (daysLeft: number) => {
    if (daysLeft <= 0) return 'expired';
    if (daysLeft <= 7) return 'urgent';
    if (daysLeft <= 14) return 'warning';
    return 'normal';
  };

  const getDeadlineText = (daysLeft: number) => {
    if (daysLeft <= 0) return 'Deadline passed';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    } catch {
      // Return original string if parsing fails
    }
    return dateString;
  };

  if (isLoading) {
    return (
      <section className="opportunities" id="opportunities">
        <div className="opportunities-container">
          <motion.div 
            className="loading-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="loading-spinner">
              <i className="fas fa-sync-alt fa-spin"></i>
            </div>
            <h3>Loading opportunities...</h3>
            <p>Fetching the latest opportunities from our database</p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (opportunities.length === 0) {
    return (
      <section className="opportunities" id="opportunities">
        <div className="opportunities-container">
          <motion.div 
            className="no-results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>No opportunities found</h3>
            <p>
              {currentFilter !== 'all' 
                ? `No ${currentFilter}s found. Try adjusting your search or filter criteria.`
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="opportunities" id="opportunities">
      <div className="opportunities-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Opportunities
          {currentFilter !== 'all' && (
            <span className="filter-indicator"> - {currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)}s</span>
          )}
        </motion.h2>
        
        <motion.div 
          className="opportunities-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence>
            {opportunities.map((opportunity, index) => {
              const daysLeft = getDaysLeft(opportunity.deadline);
              const deadlineClass = getDeadlineClass(daysLeft);
              const deadlineText = getDeadlineText(daysLeft);
              
              return (
                <motion.div
                  key={opportunity.id}
                  className="opportunity-card"
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(255, 107, 53, 0.2)"
                  }}
                  layout
                >
                  <div className="opportunity-image">
                    <div className="image-content">
                      <img 
                        src={opportunity.image} 
                        alt={opportunity.title}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="fallback-icon hidden">
                        {opportunity.type === 'job' ? '💼' : 
                         opportunity.type === 'internship' ? '🎓' : '📅'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="opportunity-content">
                    <span className={`opportunity-type ${opportunity.type}`}>
                      {opportunity.type === 'job' ? 'Job' : 
                       opportunity.type === 'internship' ? 'Internship' : 'Event'}
                    </span>
                    
                    <h3 className="opportunity-title">{opportunity.title}</h3>
                    <p className="opportunity-company">{opportunity.company}</p>
                    <p className="opportunity-description">{opportunity.description}</p>
                    
                    {opportunity.role && (
                      <div className="opportunity-role">
                        <i className="fas fa-user-tie"></i>
                        <span>{opportunity.role}</span>
                      </div>
                    )}
                    
                    <div className="opportunity-meta">
                      <span className={`opportunity-deadline ${deadlineClass}`}>
                        {deadlineText}
                      </span>
                      <span className="opportunity-location">
                        <i className="fas fa-map-marker-alt"></i>
                        {opportunity.location}
                      </span>
                    </div>
                    
                    {opportunity.eventDate && (
                      <div className="opportunity-event-date">
                        <i className="fas fa-calendar-alt"></i>
                        Event Date: {formatDate(opportunity.eventDate)}
                      </div>
                    )}
                    
                    {opportunity.registrationFee && (
                      <div className="opportunity-fee">
                        <i className="fas fa-ticket-alt"></i>
                        Registration Fee: {opportunity.registrationFee}
                      </div>
                    )}
                    
                    {opportunity.lpa && (
                      <div className="opportunity-salary">
                        <i className="fas fa-money-bill-wave"></i>
                        {opportunity.lpa}
                      </div>
                    )}
                    
                    <div className="opportunity-actions">
                      <motion.button 
                        className="apply-btn"
                        onClick={() => window.open(opportunity.link, '_blank')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {opportunity.type === 'event' ? 'Register Now' : 'Apply Now'}
                      </motion.button>
                      <motion.button 
                        className="alert-btn"
                        onClick={() => onSetAlert(opportunity)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Set Alert
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Opportunities;
