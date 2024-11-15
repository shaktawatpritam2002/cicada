// SimpleHeader.jsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTimer } from '../context/TimerContext';
import './simpleheader.css';

const SimpleHeader = () => {
  const location = useLocation();
  const {
    timer,
    formatTime,
    initializeTimer,
    isTimerInitialized
  } = useTimer();
 
  const currentPath = location.pathname;

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