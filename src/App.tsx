import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterSection from './components/FilterSection';
import Opportunities from './components/Opportunities';
import Community from './components/Community';
import About from './components/About';
import Footer from './components/Footer';
import PostAlertModal from './components/PostAlertModal';
import { Theme, PostAlertFormData } from './types';
import googleSheetsService, { ProcessedOpportunity } from './services/googleSheetsService';
import './App.css';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opportunities, setOpportunities] = useState<ProcessedOpportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<ProcessedOpportunity[]>([]);
  const [currentFilter, setCurrentFilter] = useState<'all' | 'job' | 'internship' | 'event'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Load opportunities from Google Sheets
  useEffect(() => {
    loadOpportunities();
  }, []);

  // Filter opportunities when filter or search changes
  useEffect(() => {
    filterOpportunities();
  }, [filterOpportunities]);

  const loadOpportunities = async () => {
    try {
      setIsLoading(true);
      
      // Test API access first
      await googleSheetsService.testApiAccess();
      
      // Test image URLs to ensure they're accessible
      await googleSheetsService.testImageUrls();
      
      const data = await googleSheetsService.getOpportunities();
      setOpportunities(data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error loading opportunities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOpportunities = useCallback(() => {
    let filtered = opportunities;

    // Filter by type
    if (currentFilter !== 'all') {
      filtered = filtered.filter(opp => opp.type === currentFilter);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(opp => 
        opp.title.toLowerCase().includes(searchLower) ||
        opp.company.toLowerCase().includes(searchLower) ||
        opp.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredOpportunities(filtered);
  }, [currentFilter, searchTerm, opportunities]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handlePostAlert = async (formData: PostAlertFormData) => {
    try {
      // Create new opportunity from form data
      const newOpportunity: ProcessedOpportunity = {
        id: `new_${Date.now()}`,
        type: formData.type,
        title: formData.role || formData.title,
        company: 'New Company', // Default value
        description: formData.description,
        deadline: formData.deadline,
        location: 'Remote/On-site', // Default value
        image: getImageForType(formData.type),
        link: formData.link,
        registrationFee: undefined,
        lpa: undefined,
        role: formData.role || undefined,
        eventDate: formData.date || undefined
      };

      // Add to local state
      setOpportunities(prev => [newOpportunity, ...prev]);
      
      // Close modal
      setIsModalOpen(false);
      
      // Show success message (you can implement a toast notification here)
      console.log('Alert posted successfully!');
      
      // Refresh opportunities from Google Sheets
      await loadOpportunities();
    } catch (error) {
      console.error('Error posting alert:', error);
    }
  };

  const getImageForType = (type: 'job' | 'internship' | 'event'): string => {
    switch (type) {
      case 'job':
        return 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop';
      case 'internship':
        return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop';
      case 'event':
        return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop';
    }
  };

  const handleSetAlert = (opportunity: ProcessedOpportunity) => {
    const subject = encodeURIComponent(`Alert: ${opportunity.title} at ${opportunity.company}`);
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in this opportunity:\n\n` +
      `Title: ${opportunity.title}\n` +
      `Company: ${opportunity.company}\n` +
      `Type: ${opportunity.type}\n` +
      `Description: ${opportunity.description}\n` +
      `Deadline: ${opportunity.deadline}\n` +
      `Link: ${opportunity.link}\n\n` +
      `Please keep me updated on this opportunity.\n\nBest regards`
    );
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleRefreshOpportunities = async () => {
    await loadOpportunities();
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <Navbar 
        theme={theme} 
        onThemeToggle={toggleTheme}
        onPostAlert={() => setIsModalOpen(true)}
      />
      
      <Hero />
      
      <FilterSection
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={handleRefreshOpportunities}
        lastRefresh={lastRefresh}
        isLoading={isLoading}
      />
      
      <Opportunities
        opportunities={filteredOpportunities}
        onSetAlert={handleSetAlert}
        isLoading={isLoading}
        currentFilter={currentFilter}
      />
      
      <Community />
      <About />
      <Footer />
      
      <AnimatePresence>
        {isModalOpen && (
          <PostAlertModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handlePostAlert}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
