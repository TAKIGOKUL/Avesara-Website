import React from 'react';
import { motion } from 'framer-motion';
import './FilterSection.css';

interface FilterSectionProps {
  currentFilter: 'all' | 'job' | 'internship' | 'event';
  onFilterChange: (filter: 'all' | 'job' | 'internship' | 'event') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onRefresh?: () => void;
  lastRefresh?: Date;
  isLoading?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  currentFilter, 
  onFilterChange, 
  searchTerm, 
  onSearchChange,
  onRefresh,
  lastRefresh,
  isLoading = false
}) => {
  const filterTabs = [
    { id: 'all' as const, label: 'All' },
    { id: 'job' as const, label: 'Jobs' },
    { id: 'internship' as const, label: 'Internships' },
    { id: 'event' as const, label: 'Events' }
  ];

  const formatLastRefresh = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <section className="filter-section">
      <div className="filter-container">
        <motion.div 
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filterTabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`filter-tab ${currentFilter === tab.id ? 'active' : ''}`}
              onClick={() => onFilterChange(tab.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: filterTabs.indexOf(tab) * 0.1 
              }}
            >
              {tab.id === 'job' ? 'Jobs' : 
               tab.id === 'internship' ? 'Internships' : 
               tab.id === 'event' ? 'Events' : 'All'}
            </motion.button>
          ))}
        </motion.div>
        
        <div className="filter-actions">
          <motion.div 
            className="search-box"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            <motion.button 
              className="search-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-search"></i>
            </motion.button>
          </motion.div>
          
          {onRefresh && (
            <motion.div 
              className="refresh-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button 
                className="refresh-btn"
                onClick={onRefresh}
                disabled={isLoading}
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                animate={isLoading ? { rotate: 360 } : {}}
                transition={{ duration: isLoading ? 1 : 0.3, repeat: isLoading ? Infinity : 0 }}
              >
                <i className="fas fa-sync-alt"></i>
              </motion.button>
              {lastRefresh && (
                <span className="last-refresh">
                  Last updated: {formatLastRefresh(lastRefresh)}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
