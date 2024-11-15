// TimerContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(null);
  const [isTimerInitialized, setIsTimerInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const TOTAL_TIME = 3 * 60 * 60; // 3 hours in seconds

  // Initial timer setup from localStorage
  useEffect(() => {
    const storedStartTime = localStorage.getItem('timerStartTime');
    const storedEndTime = localStorage.getItem('timerEndTime');

    if (storedStartTime && storedEndTime && !isTimerInitialized) {
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = parseInt(storedEndTime, 10) - currentTime;

      if (remainingTime > 0) {
        setTimer(remainingTime);
        setIsTimerInitialized(true);
      } else {
        setTimer(0);
        setIsTimerInitialized(true);
      }
    }
  }, [isTimerInitialized]);

  const initializeTimer = () => {
    // Check if there's already a timer running
    const storedStartTime = localStorage.getItem('timerStartTime');
    const storedEndTime = localStorage.getItem('timerEndTime');
    const currentTime = Math.floor(Date.now() / 1000);

    // If there's existing timer data
    if (storedStartTime && storedEndTime) {
      const remainingTime = parseInt(storedEndTime, 10) - currentTime;
      
      if (remainingTime > 0) {
        // Timer exists and still has time remaining
        setTimer(remainingTime);
        setIsTimerInitialized(true);
        return; // Exit without creating new timer
      }
    }

    // Only initialize a new timer if there isn't one already running
    if (!isTimerInitialized) {
      localStorage.setItem('timerStartTime', currentTime.toString());
      localStorage.setItem('timerEndTime', (currentTime + TOTAL_TIME).toString());
      localStorage.setItem('initialTime', TOTAL_TIME.toString());
      setTimer(TOTAL_TIME);
      setIsTimerInitialized(true);
    }
  };

  const resetTimer = () => {
    localStorage.removeItem('timerStartTime');
    localStorage.removeItem('timerEndTime');
    localStorage.removeItem('initialTime');
    localStorage.removeItem('endTimeSubmitted');
    setTimer(null);
    setIsTimerInitialized(false);
  };

  const submitEndTime = async () => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error('No authentication token found');

      const timeTaken = TOTAL_TIME - (timer || 0);
      const endTimeSubmitted = localStorage.getItem('endTimeSubmitted');
      
      if (endTimeSubmitted === 'true') {
        return { message: 'End time already submitted' };
      }

      const response = await axios.post(
        'cicada-production-a52d.up.railway.app/api/team/storeEndTime',
        { endTime: timeTaken },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem('endTimeSubmitted', 'true');
      return response.data;
    } catch (error) {
      console.error('Failed to store end time:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer]);

  const formatTime = (seconds) => {
    if (seconds === null) return '00:00:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeElapsed = () => {
    if (timer === null) return 0;
    return TOTAL_TIME - timer;
  };

  const value = {
    timer,
    initializeTimer,
    resetTimer,
    formatTime,
    submitEndTime,
    getTimeElapsed,
    TOTAL_TIME,
    isTimerInitialized,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

export default TimerProvider;