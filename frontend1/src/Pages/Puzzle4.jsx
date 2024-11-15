import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Puzzle4.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
const Puzzle4 = () => {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [unlockedSteps, setUnlockedSteps] = useState([1]);
  const [timeLeft, setTimeLeft] = useState(60);
  const  navigate=useNavigate()
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
        const response = await axios.get('cicada-production-a52d.up.railway.app/api/team/getcount', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
  
        const currentPath = window.location.pathname;
        const puzzleNumber = currentPath.split('/')[2];
        
        console.log('Current puzzle number:', puzzleNumber);
        console.log('Server count:', response.data.correctCount);
        console.log('Types - puzzleNumber:', typeof puzzleNumber, 'correctCount:', typeof response.data.correctCount);
        const count=response.data.correctCount+1
        // Check if they match
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
  const handlePuzzleCompletion = async () => {
    // When the user completes the final step (Step 7), send the API request
    console.log("clicked")
    const token = localStorage.getItem('jwt'); // Get the JWT token from localStorage

    if (!token) {
      toast.error("No authentication token found. Please log in again.");
      return;
    }

    try {
      // Send a request to the backend to notify that the puzzle is completed
      const response = await axios.post(
        'cicada-production-a52d.up.railway.app/api/team/updateCount', // Replace with your actual API endpoint
        { isCorrect: true }, // You can send any necessary data with the request
        {
          headers: {
            authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
          }
        }
      );
      console.log(response)
      navigate('/puzzle/5')
      // If the request is successful, show a success message
      toast.success("Puzzle completed successfully! You are a champion!");

    } catch (error) {
      console.error('Error completing puzzle:', error);
      toast.error("There was an error completing the puzzle. Please try again.");
    }
  };
  const hints = {
    1: "Hint: Think about a number associated with Ichigo in Bleach.",
    2: "Hint: Be brave to continue.",
    3: "Hint: Decrypt each word using Caesar Cipher with Key 15.",
    4: "Hint: The symbols represent shadow, ninja, fight, and light.",
    5: "Hint: A famous Dragon Ball Z quote related to Goku’s power level.",
    6: "Hint: Consider Hunter x Hunter characters with courage or trickery.",
  };

  useEffect(() => {
    setTimeLeft(60); // Reset timer whenever step changes

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          toast.info(hints[step] || "No hint available for this step");
          clearInterval(timer);
          return 60; // Reset timer to 60 for the next step
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clear timer on component unmount or step change
  }, [step]);

  const checkAnswer = (correctAnswer, nextStep) => {
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      setUnlockedSteps((prevSteps) => [...prevSteps, nextStep]);
      setStep(nextStep);
      setAnswer('');
    } else {
      toast.error("Incorrect answer. Try again!");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>

            <p>"Within the clash of blades and resolve of strawberry hue,
count all steps forward and then subtract the few,
add to the hollow path the reiatsu's gain,
the answer's what remains, though it may drive you insane</p>

          
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('15', 2)} id="puzz4-btn">Submit</button>
          </>
        );
      case 2:
        return (
          <>
            <p id="puzz4-txt">You have two choices. Choose wisely:</p>
            <button onClick={() => { setStep(3); toast.info("You are brave."); }}>Hard way</button>
            <button onClick={() => { setStep(3); toast.info("You are coward."); }}>Easy way</button>
          </>
        );
      case 3:
        return (
          <>
            <p id="puzz4-txt">Decrypt the following message using Caesar Cipher with Key 15:</p>
            <p id="puzz4-txt">"Jhxcv iwt hldgs du hjc pcs hldgs du bddc lpaz idlpgsh iwt hwpsdl epiw"</p>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('Using the sword of sun and sword of moon walk towards the shadow path', 4)} id="puzz4-btn">Submit</button>
          </>
        );
      case 4:
        return (
          <>
            <p id="puzz4-txt">Symbols: 影 忍 戦 光</p>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('Shadow Ninja Fight Light', 5)} id="puzz4-btn">Submit</button>
          </>
        );
      case 5:
        return (
          <>
            <img src="https://qph.cf2.quoracdn.net/main-qimg-b559afda2ffef85fc13db35ab155bbf5" alt="" />
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('9000+', 6)} id="puzz4-btn">Submit</button>
          </>
        );
      case 6:
        return (
          <>
            <p id="puzz4-txt">Tell me the name of the character from Hunter x Hunter who has a similar quality to you.</p>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              onClick={() => checkAnswer(
                unlockedSteps.includes(2) ? 'Isaac Netero' : 'Tonpa',
                7
              )}
              id="puzz4-btn"
            >
              Submit
            </button>
          </>
        );
        case 7:
          return (
            <div>
              <p id="puzz4-txt">Congratulations! You've completed the puzzle!</p>
              <button 
                onClick={handlePuzzleCompletion}
                id="puzz4-btn"
              >
                Continue to Next Puzzle
              </button>
            </div>
          );
         default:
        return null;
    }
  };

  return (
    <div style={{
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
    }}>
      <h1 style={{ color: '#00ff00', 'font-size' : '34px','padding' : '24px' }}>Puzzle Challenge</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
      }}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => unlockedSteps.includes(num) && setStep(num)}
            style={{
              padding: '10px',
              backgroundColor: step === num ? '#0077ff' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: unlockedSteps.includes(num) ? 'pointer' : 'not-allowed',
              opacity: unlockedSteps.includes(num) ? 1 : 0.5,
            }}
          >
            {unlockedSteps.includes(num) ? num : '🔒'}
          </button>
        ))}
      </div>

      {renderStep()}
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Puzzle4;
