import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PostAlertFormData } from '../types';
import './PostAlertModal.css';

interface PostAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PostAlertFormData) => void;
}

const PostAlertModal: React.FC<PostAlertModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PostAlertFormData>({
    title: '',
    type: 'job',
    description: '',
    deadline: '',
    link: '',
    role: '',
    date: ''
  });

  const [errors, setErrors] = useState<Partial<PostAlertFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof PostAlertFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PostAlertFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.deadline.trim()) {
      newErrors.deadline = 'Deadline is required';
    }

    if (!formData.link.trim()) {
      newErrors.link = 'Link is required';
    }

    if (formData.type === 'job' && !formData.role.trim()) {
      newErrors.role = 'Role is required for job postings';
    }

    if (formData.type === 'event' && !formData.date.trim()) {
      newErrors.date = 'Event date is required for events';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        title: '',
        type: 'job',
        description: '',
        deadline: '',
        link: '',
        role: '',
        date: ''
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      type: 'job',
      description: '',
      deadline: '',
      link: '',
      role: '',
      date: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h3>Post an Alert</h3>
            <button className="modal-close" onClick={handleClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <form className="alert-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">
                <i className="fas fa-heading"></i>
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter opportunity title"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="type">
                <i className="fas fa-tag"></i>
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={errors.type ? 'error' : ''}
              >
                <option value="job">Job</option>
                <option value="internship">Internship</option>
                <option value="event">Event</option>
              </select>
              {errors.type && <div className="error-message">{errors.type}</div>}
            </div>

            {formData.type === 'job' && (
              <div className="form-group">
                <label htmlFor="role">
                  <i className="fas fa-user-tie"></i>
                  Role/Position
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter job role or position"
                  className={errors.role ? 'error' : ''}
                />
                {errors.role && <div className="error-message">{errors.role}</div>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="description">
                <i className="fas fa-align-left"></i>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the opportunity"
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <div className="error-message">{errors.description}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="deadline">
                <i className="fas fa-calendar-times"></i>
                Application Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className={errors.deadline ? 'error' : ''}
              />
              {errors.deadline && <div className="error-message">{errors.deadline}</div>}
            </div>

            {formData.type === 'event' && (
              <div className="form-group">
                <label htmlFor="date">
                  <i className="fas fa-calendar-alt"></i>
                  Event Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <div className="error-message">{errors.date}</div>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="link">
                <i className="fas fa-link"></i>
                Application/Registration Link
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://example.com/apply"
                className={errors.link ? 'error' : ''}
              />
              {errors.link && <div className="error-message">{errors.link}</div>}
            </div>

            <div className="form-actions">
              <motion.button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Post Alert
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostAlertModal;
