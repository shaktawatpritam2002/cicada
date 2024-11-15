import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Puzzle3 = () => {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [unlockedSteps, setUnlockedSteps] = useState([1]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showReward, setShowReward] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState(''); // New state for final answer
  const [showFinalInput, setShowFinalInput] = useState(false); // Show final input field after reward
  const navigate = useNavigate();

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

  const checkFinalAnswer = async() => {
    if (finalAnswer.trim().toLowerCase() === 'nichirin sword') {
      toast.success('Correct! You have completed this puzzle!');
      // You can redirect or perform another action after the final answer is correct
      const token = localStorage.getItem('jwt');
      if (!token) {
        console.log('No token found, navigating to login');
        navigate('/login');
        return;
      }
      try {
        await axios.post(`http://localhost:3000/api/team/updateCount`, { isCorrect: true }, {
          headers: {
              'authorization': `Bearer ${token}`  // Adding the token as Bearer token in the Authorization header
          }
      });
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/puzzle/4');
        }, 3000);
      } catch (error) {
        console.error('Error updating correct count:', error);
       
      
      }
      setShowFinalInput(false); 
      navigate('/puzzle/4')// Hide input after correct answer
    } else {
      toast.error('Incorrect answer. Try again!');
    }
  };

  useEffect(() => {
    console.log('useEffect is running');
    const checkPuzzleNumber = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          console.log('No token found, navigating to login');
          navigate('/login');
          return;
        }

        console.log('Token found, making request to get correct count');
        const response = await axios.get('http://localhost:3000/api/team/getcount', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });

        const currentPath = window.location.pathname;
        const puzzleNumber = currentPath.split('/')[2];

        console.log('Current puzzle number:', puzzleNumber);
        console.log('Server count:', response.data.correctCount);
        console.log('Types - puzzleNumber:', typeof puzzleNumber, 'correctCount:', typeof response.data.correctCount);
        const count = response.data.correctCount + 1;

        if (puzzleNumber == count.toString()) {
          console.log("Puzzle numbers don't match, user can proceed");
        } else {
          console.log("Puzzle numbers match, redirecting to puzzle journey");
          navigate('/puzzle-journey');
        }
      } catch (error) {
        console.error('Error fetching correct count:', error);
        navigate('/login');
      }
    };

    checkPuzzleNumber();
  }, [navigate]);

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
          <div
            style={{
              backgroundColor: '#2a2a2a',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '100%'
            }}
          >
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
        <div
          style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '600px',
            width: '100%'
          }}
        >
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

         
            <div style={{ marginTop: '20px' }}>
              <input
                type="text"
                placeholder="Enter final answer"
                value={finalAnswer}
                onChange={(e) => setFinalAnswer(e.target.value)}
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
                onClick={checkFinalAnswer}
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
                Submit Final Answer
              </button>
            </div>
        
        </div>
      )}

      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Puzzle3;
