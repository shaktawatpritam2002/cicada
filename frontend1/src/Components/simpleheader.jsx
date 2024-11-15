import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import './simpleheader.css';

const SimpleHeader = () => {
  const [timer, setTimer] = useState(10000); // Initial timer state in seconds (10 seconds for testing)

  useEffect(() => {
    // Get stored timer from localStorage
    const storedStartTime = localStorage.getItem('timerStartTime');
    const storedEndTime = localStorage.getItem('timerEndTime');

    if (storedStartTime && storedEndTime) {
      const startTime = parseInt(storedStartTime, 10);
      const endTime = parseInt(storedEndTime, 10);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      // Calculate the remaining time
      const remainingTime = endTime - currentTime;

      if (remainingTime > 0) {
        setTimer(remainingTime); // Continue the countdown
      } else {
        setTimer(0); // Reset timer if the previous time expired
      }
    } else {
      // Initialize timer from 0 if no previous data is found
      setTimer(0);
    }

    return () => {};
  }, []);

  useEffect(() => {
    // Update timer every second
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

      // Save start and end time in localStorage
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      localStorage.setItem('timerStartTime', currentTime);
      localStorage.setItem('timerEndTime', currentTime + timer); // End time = start time + timer

      return () => clearInterval(intervalId);
    }
  }, [timer]);

  // Function to format seconds as hh:mm:ss
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Get hours
    const minutes = Math.floor((seconds % 3600) / 60); // Get minutes
    const remainingSeconds = seconds % 60; // Get remaining seconds

    // Return formatted string with leading zeros if needed
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  };

  return (
    <div className="mainpage-header">
      {/* Logo Section */}
      <div className="logo">
        <img src={logo} alt="RosPinoT X Cicada" />
      </div>

      {/* Page Title Section */}
      <div id="page-title">RosPinoT X Cicada</div>

      {/* Timer Display */}
      <div className="timer">
        {timer > 0 ? <span>Time Left: {formatTime(timer)}</span> : <span>Timer Ended</span>}
      </div>
    </div>
  );
};

export default SimpleHeader;
