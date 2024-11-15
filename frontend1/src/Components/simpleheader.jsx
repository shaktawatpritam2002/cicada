// SimpleHeader.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTimer } from '../context/TimerContext';
import './simpleheader.css';

const SimpleHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    timer,
    formatTime,
    initializeTimer,
    isTimerInitialized
  } = useTimer();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentPath = location.pathname;

  // Check if the jwt token is present in localStorage
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle logout action
  const handleLogout = () => {
    // Remove the jwt token from localStorage
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    
    // Optionally, redirect to the login or home page
    navigate('/login');
  };

  useEffect(() => {
    if (currentPath === '/puzzle/1' && !isTimerInitialized) {
      initializeTimer();
    }
  }, [currentPath, initializeTimer, isTimerInitialized]);

  // Don't show timer on puzzle 7
  if (currentPath === '/puzzle/7') {
    return (
      <div className="mainpage-header">
        <div className="logo">
          <img src="/assets/logo.png" alt="RosPinoT X Cicada" />
        </div>
        <div id="page-title">RosPinoT X Cicada</div>
      </div>
    );
  }

  return (
    <div className="mainpage-header">
      <div className="logo">
        <img src="/assets/logo.png" alt="RosPinoT X Cicada" />
      </div>
      <div id="page-title">RosPinoT X Cicada</div>

      {isLoggedIn && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}

      <div className="timer">
        {timer === null ? (
          currentPath === '/puzzle/1' ? (
            <span>Initializing timer...</span>
          ) : (
            <span>Timer will start at Puzzle 1</span>
          )
        ) : timer > 0 ? (
          <span className="time-display">Time Left: {formatTime(timer)}</span>
        ) : (
          <span className="time-ended">Time Ended</span>
        )}
      </div>
    </div>
  );
};

export default SimpleHeader;
