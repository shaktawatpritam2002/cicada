import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import headerLogo from '../assets/headerlogo.png';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [fireActive, setFireActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    const fireTriggered = sessionStorage.getItem("fireTriggered");
    if (fireTriggered) {
      setFireActive(false);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDoubleClick = () => {
    if (!fireActive) {
      setFireActive(true);
      sessionStorage.setItem("fireTriggered", "true");
      setTimeout(() => {
        setFireActive(false);
      }, 3000);
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
  ];

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img 
          src={headerLogo} 
          alt="Tech Fest 2024" 
          className={fireActive ? 'fire-animation' : ''}
          onDoubleClick={handleDoubleClick}
        />
      </Link>

      {!isMobile && (
        <>
          <div 
            className={`hamburger-icon ${isOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <div className={`slide-menu ${isOpen ? 'open' : ''}`}>
            <nav>
              <ul>
                {navItems.map(({ path, label }) => (
                  path !== location.pathname && (
                    <li key={path}>
                      <Link to={path}>{label}</Link>
                    </li>
                  )
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;