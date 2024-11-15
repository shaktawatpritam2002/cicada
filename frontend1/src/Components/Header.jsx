import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import headerLogo from '../assets/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [fireActive, setFireActive] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state (seconds)
  const location = useLocation();

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Handle the page reload behavior
    const fireTriggered = sessionStorage.getItem("fireTriggered");
    if (fireTriggered) {
      setFireActive(false);
    }

    // Get stored timer from localStorage
    const storedStartTime = localStorage.getItem('timerStartTime');
    const storedEndTime = localStorage.getItem('timerEndTime');
    
    if (storedStartTime && storedEndTime) {
      const startTime = parseInt(storedStartTime, 10);
      const endTime = parseInt(storedEndTime, 10);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      
      // Calculate the elapsed time since the last reload
      const elapsedTime = currentTime - startTime;
      const remainingTime = endTime - currentTime;
      
      // If the remaining time is still greater than 0, continue the timer
      if (remainingTime > 0) {
        setTimer(remainingTime);
      } else {
        setTimer(0); // Reset timer if the previous time expired
      }
    } else {
      // If no timer was previously saved, initialize it to 0
      setTimer(0);
    }

    return () => {};
  }, []);

  useEffect(() => {
    // Set the timer interval
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      // Save the timer start and end times in localStorage
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      localStorage.setItem('timerStartTime', currentTime);
      localStorage.setItem('timerEndTime', currentTime + timer); // End time = start time + timer

      return () => clearInterval(intervalId);
    }
  }, [timer]);

  useEffect(() => {
    // Reset the timer on route change
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
    { path: '/puzzle-journey', label: 'Puzzle Journey' },
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
      <span className="middle">Cicada X RosPiNoT</span>
      <div className={`hamburger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`slide-menu ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            {navItems.map(({ path, label }) => (
              path !== location.pathname && (
                <li className="space1" key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              )
            ))}
          </ul>
        </nav>
      </div>

      {/* Timer Display */}
      <div className="timer">
        {timer > 0 ? <span>Time Left: {timer}s</span> : <span>Timer Ended</span>}
      </div>
    </header>
  );
};

export default Header;
