import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Puzzle1.css';

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

  const handlePart2Submit = (e) => {
    e.preventDefault();
    if (part2Answer === '307200') {
      setShowSuccess(true);
      setShowError(false);
      setTimeout(() => {
        setShowSuccess(false);
        // Navigate to the next puzzle after successful completion
        navigate('/puzzle/2');
      }, 3000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
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