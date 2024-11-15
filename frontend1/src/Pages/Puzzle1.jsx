import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Puzzle1.css';
import axios from "axios"

const Puzzle1 = () => {
  const [part1Answer, setPart1Answer] = useState('');
  const [part1Complete, setPart1Complete] = useState(false);
  const [part2Answer, setPart2Answer] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePart1Submit = (e) => {
    e.preventDefault();
    if (part1Answer.toLowerCase() === 'tachyon24') {
      setPart1Complete(true);
      setShowSuccess(true);
      setShowError(false);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
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
        const response = await axios.get('https://cicada-production-a52d.up.railway.app/api/team/getcount', {
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
  const handlePart2Submit = async (e) => {
    const token = localStorage.getItem('jwt'); // or wherever you store the token
    console.log(token)
if (!token) {
    console.error("No authentication token found.");
   navigate('/login')
}
    e.preventDefault();
    if (part2Answer === '307200') {
      try {
        await axios.post(`https://cicada-production-a52d.up.railway.app/api/team/updateCount`, { isCorrect: true }, {
          headers: {
              'authorization': `Bearer ${token}`  // Adding the token as Bearer token in the Authorization header
          }
      });
        setShowSuccess(true);
        setShowError(false);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/puzzle/2');
        }, 3000);
      } catch (error) {
        console.error('Error updating correct count:', error);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    } else {
      try {
        await axios.patch(`https://cicada-production-a52d.up.railway.app/api/team/updateCount`, { isCorrect: false }, {
          headers: {
              'Authorization': `Bearer ${token}`  // Adding the token as Bearer token in the Authorization header
          }
      });
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      } catch (error) {
        console.error('Error updating correct count:', error);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    }
  };
  return (
    <div className="puzzle1-container">
      <h1 className="puzzle-title">Puzzle 1: The Beginning</h1>
      
      <div className="puzzle-content">
        <div className="puzzle-section">
          <h2 className="section-title">Part 1</h2>
          <p className="puzzle-description">
            "The thing you are finding is the place for which you are coming to enjoy and know about the events"
          </p>
          
          <form onSubmit={handlePart1Submit} className="puzzle-form">
            <input
              type="text"
              value={part1Answer}
              onChange={(e) => setPart1Answer(e.target.value)}
              placeholder="Enter your answer"
              disabled={part1Complete}
              className="puzzle-input"
            />
            {!part1Complete && (
              <button type="submit" className="submit-btn">
                Submit
              </button>
            )}
          </form>
        </div>

        {part1Complete && (
          <div className="puzzle-section fade-in">
            <h2 className="section-title">Part 2</h2>
            <div className="puzzle-description">
              <p>
                "A place where robots come to play,<br />
                You'll find a code along the way.<br />
                Look for the name, then take a peek,<br />
                At the picture, the code you seek."
              </p>
              <p>
                "It's hidden there, so look real close,<br />
                A number waits, that's your dose."
              </p>
              <div className="hint">
                <p>Hint: The answer you are finding is something extraordinary that is not visible easily. 
                You have to inspect it then use the picture to find the solution which is a code.</p>
              </div>
            </div>
            
            <form onSubmit={handlePart2Submit} className="puzzle-form">
              <input
                type="text"
                value={part2Answer}
                onChange={(e) => setPart2Answer(e.target.value)}
                placeholder="Enter the code"
                className="puzzle-input"
              />
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        )}

        {showSuccess && (
          <div className="notification success">
            Correct! Moving to the next part...
          </div>
        )}

        {showError && (
          <div className="notification error">
            Incorrect answer. Try again!
          </div>
        )}
      </div>
    </div>
  );
};

export default Puzzle1;