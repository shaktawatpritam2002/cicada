import React, { useState } from 'react';
import './Puzzle2.css';

const Puzzle2 = () => {
  const [outerPosition, setOuterPosition] = useState(0);
  const [innerPosition, setInnerPosition] = useState(0);
  const [answer, setAnswer] = useState('');
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const coordinates = [
    [-17.9], [3,3], [-4, -13], [-23, -13], [7,-5], [8,11], [25,6], 
    [18,10], [0, -16], [15,-5], [28,0], [-5, -8], [-5], [-7], [-15], 
    [-6], [1], [-24, 13], [-25,0], [12, 10], [25], [-15,3], [-24, -15], 
    [19,3], [-21,-8], [15,-23], [15,6], [12]
  ];

  const instructions = [
    "Rotate x axis of 6th coordinate at 450 degree.",
    "Rotate x axis of 8th coordinate at 900 degree.",
    "Rotate y axis of 10th coordinate at 1440 degree.",
    "Rotate y axis of 18th coordinates at 540 degree.",
    "Rotate x axis of 24th coordinate at 1440 degree."
  ];

  const movePosition = (wheel, direction) => {
    const setter = wheel === 'outer' ? setOuterPosition : setInnerPosition;
    setter(prev => {
      let newPos = direction === 'next' ? prev + 1 : prev - 1;
      if (newPos >= 26) newPos = 0;
      if (newPos < 0) newPos = 25;
      return newPos;
    });
  };

  const calculateLetterPosition = (idx, total, radius) => {
    const angle = (idx * (360 / total)) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      rotation: (idx * (360 / total))
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = "rospinot tech fest ignites robotics innovation and growth";
    
    if (answer.toLowerCase().trim() === correctAnswer) {
      setNotification({
        show: true,
        type: 'success',
        message: 'Correct! Proceed to the next challenge.'
      });
    } else {
      setNotification({
        show: true,
        type: 'error',
        message: 'Incorrect answer. Please try again.'
      });
    }

    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 2000);
  };

  return (
    <div className="center1">
       <div className="puzzle-container">
      <header className="puzzle-header">
        <h1 className="puzzle-title">Puzzle 2: Decode the Coordinates</h1>
        
        <div className="instructions-section">
          <h2>Initial Instructions:</h2>
          <ul>
            {instructions.map((instruction, idx) => (
              <li key={idx}>{instruction}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="cipher-display">
        Outer Letter: {alphabet[outerPosition]} → Inner Letter: {alphabet[innerPosition]}
      </div>

      <div className="wheels-container">
        <div className="wheel outer-wheel">
          <div 
            className="pointer outer-pointer"
            style={{ transform: `rotate(${outerPosition * (360/26)}deg)` }}
          >
            <div className="pointer-head"></div>
          </div>
          <svg className="wheel-letters" viewBox="-200 -200 400 400">
            {alphabet.map((letter, idx) => {
              const pos = calculateLetterPosition(idx, 26, 180);
              return (
                <text
                  key={`outer-${idx}`}
                  x={pos.x}
                  y={pos.y}
                  style={{
                    transform: `rotate(${pos.rotation}deg)`,
                    transformOrigin: `${pos.x}px ${pos.y}px`
                  }}
                >
                  {letter}
                </text>
              );
            })}
          </svg>
        </div>

        <div className="wheel inner-wheel">
          <div 
            className="pointer inner-pointer"
            style={{ transform: `rotate(${innerPosition * (360/26)}deg)` }}
          >
            <div className="pointer-head"></div>
          </div>
          <svg className="wheel-letters" viewBox="-132 -132 264 264">
            {alphabet.map((letter, idx) => {
              const pos = calculateLetterPosition(idx, 26, 120);
              return (
                <text
                  key={`inner-${idx}`}
                  x={pos.x}
                  y={pos.y}
                  style={{
                    transform: `rotate(${pos.rotation}deg)`,
                    transformOrigin: `${pos.x}px ${pos.y}px`
                  }}
                >
                  {letter}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="controls-container">
        <div className="wheel-controls">
          <div className="control-section">
            <h3>Outer Wheel</h3>
            <div className="button-group">
              <button onClick={() => movePosition('outer', 'prev')}>←</button>
              <button onClick={() => movePosition('outer', 'next')}>→</button>
            </div>
          </div>
          <div className="control-section">
            <h3>Inner Wheel</h3>
            <div className="button-group">
              <button onClick={() => movePosition('inner', 'prev')}>←</button>
              <button onClick={() => movePosition('inner', 'next')}>→</button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="answer-form">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer..."
        />
        <button type="submit">Submit Answer</button>
      </form>

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="coordinates-section">
        <h3>Coordinates to Decode:</h3>
        <div className="coordinates-display">
          {coordinates.map((coord, idx) => (
            <span key={idx} className="coordinate">({coord.join(',')})</span>
          ))}
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Puzzle2;
