import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FAB.css';

const FAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
    {path:'/contact', label:'Contact'},
    {path:'/merchandise',label:'Merchandise'}
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="fab-container">
      <button
        className={`fab-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <div className={`fab-icon ${isOpen ? 'open' : ''}`}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </button>
      <div className={`fab-menu ${isOpen ? 'active' : ''}`}>
        {navItems
          .filter(item => {
            // Show all pages on mobile (≤768px), hide current page on desktop (>768px)
            if (windowWidth <= 768) {
              return true;
            }
            return item.path !== location.pathname;
          })
          .map(item => (
            <div
              key={item.path}
              className="fab-item"
              onClick={() => handleNavigate(item.path)}
            >
              <span className="fab-item-label">{item.label}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FAB;
