import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Puzzle1 = () => {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [unlockedSteps, setUnlockedSteps] = useState([1]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showReward, setShowReward] = useState(false);

  const hints = {
    1: "Clue: Think of a renowned Roman general who was famous not just for his conquests but also for his secretive way of communicating. To unlock this message, you must step back into the past and retrace his steps through the alphabet, moving each letter back by the same number of places that his name rhymes with.",
  };

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === 'rospinot tech fest ignites robotics innovation and growth') {
      toast.success('Correct! Here is your next destination.');
      setShowReward(true);
      setAnswer('');
    } else {
      toast.error('Incorrect answer. Try again!');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#1c1c1c',
        color: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'monospace',
        textAlign: 'center',
        padding: '20px',
        gap: '20px'
      }}
    >
      <h1 style={{ color: '#00ff00' }}>Puzzle Challenge</h1>
      
      {!showReward ? (
        <>
          <div style={{ 
            backgroundColor: '#2a2a2a', 
            padding: '20px', 
            borderRadius: '8px',
            maxWidth: '600px',
            width: '100%'
          }}>
            <p>Ciphered Message: "Tqurkpqv vgjv hguv kipvkgu tqdqvkue kpqxvkevcp cpf itqyvj"</p>
            <p style={{ color: '#00ff00', fontSize: '0.9em' }}>
              {hints[1]}
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{
                padding: '10px',
                backgroundColor: '#333',
                color: '#fff',
                border: '1px solid #00ff00',
                borderRadius: '4px',
                width: '300px'
              }}
            />
            <button 
              onClick={checkAnswer}
              style={{
                padding: '10px 20px',
                backgroundColor: '#00ff00',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Submit
            </button>
          </div>
          
        </>
      ) : (
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '20px', 
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%'
        }}>
          <h2 style={{ color: '#00ff00', marginBottom: '20px' }}>Congratulations!</h2>
          <p>Your next destination awaits at:</p>
          <a 
            href="https://www.reddit.com/r/Technoblade/s/WwQzDkPAUU" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#00ff00', 
              textDecoration: 'none',
              borderBottom: '1px solid #00ff00',
              paddingBottom: '2px'
            }}
          >
            Continue your journey
          </a>
        </div>
      )}
      
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Puzzle1;r