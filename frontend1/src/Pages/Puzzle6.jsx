import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Puzzle6 = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');

  const showHintToast = () => {
    const hints = {
      1: "Hint: OTAKU - Try unscrambling the runes",
      2: "Hint: Try converting from binary numbers",
      3: "Hint: Use Morse code conversion",
    };
    toast.info(hints[currentPart], { position: "bottom-right", autoClose: 5000 });
  };

  const handleInputChange = (e, key) => {
    setAnswers({ ...answers, [key]: e.target.value });
    setError('');
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswers();
    }
  };

  const checkAnswers = () => {
    if (currentPart === 1) {
      const correctAnswers = {
        satoru: 'satoru',
        shinobu: 'shinobu',
        mikasa: 'mikasa',
        naruto: 'naruto',
        meliodas: 'meliodas'
      };
      
      const allCorrect = Object.keys(correctAnswers).every(
        key => answers[key]?.toLowerCase() === correctAnswers[key]
      );
      
      if (allCorrect) {
        nextPart();
      } else {
        setError('Some answers are incorrect. Try again!');
        toast.error('Incorrect answers. Keep trying!');
      }
    } else if (currentPart === 2) {
      if (answers.audio?.toLowerCase() === 'shinzo wo sasageyo') {
        nextPart();
      } else {
        setError('Incorrect answer. Try again!');
        toast.error('Incorrect answer. Keep trying!');
      }
    } else if (currentPart === 3) {
      if (answers.morse?.toLowerCase() === 'all people are nothing but tools') {
        toast.success('Congratulations! You\'ve completed the puzzle!');
        alert('Puzzle Completed!');
      } else {
        setError('Incorrect answer. Try again!');
        toast.error('Incorrect answer. Keep trying!');
      }
    }
  };

  const nextPart = () => {
    setCurrentPart(currentPart + 1);
    setAnswers({});
    setError('');
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#00ff00', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Anime Puzzle Game</h1>
      <div>
        {currentPart === 1 && (
          <div>
            <h2>Part 1: Unscramble the Word</h2>
            <ul>
              {[
                { scramble: 'ᛗᛞᛏᛚᚠᛜ', key: 'satoru' },
                { scramble: 'ᛁᛚᚹᛏᚢᛞᛊ', key: 'shinobu' },
                { scramble: 'ᚠᛇᛁᚠᛚᛉ', key: 'mikasa' },
                { scramble: 'ᚠᛏᛗᛞᛜᛊ', key: 'naruto' },
                { scramble: 'ᛚᚠᛁᛏᚱᛉᛈᚨ', key: 'meliodas' }
              ].map(({ scramble, key }) => (
                <li key={key} style={{ marginBottom: '10px' }}>
                  {scramble}
                  <input 
                    type="text" 
                    value={answers[key] || ''} 
                    onChange={(e) => handleInputChange(e, key)} 
                    onKeyDown={handleEnterPress}
                    placeholder=""
                    style={{
                      padding: '5px',
                      marginLeft: '10px',
                      color: '#00ff00',
                      backgroundColor: '#121212',
                      border: '1px solid #00ff00',
                      borderRadius: '4px'
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentPart === 2 && (
          <div>
            <h2>Part 2: Binary Audio Sequence</h2>
            <audio src='/audio.wav' controls />
            <p>Convert the binary sequence to find the answer.</p>
            <input 
              type="text" 
              value={answers.audio || ''} 
              onChange={(e) => handleInputChange(e, 'audio')} 
              onKeyDown={handleEnterPress}
              placeholder="Type your answer here" 
              style={{
                padding: '10px',
                width: '100%',
                color: '#00ff00',
                backgroundColor: '#121212',
                border: '1px solid #00ff00',
                borderRadius: '4px',
                marginTop: '10px'
              }}
            />
          </div>
        )}

        {currentPart === 3 && (
          <div>
            <h2>Part 3: Morse Code Audio</h2>
            <audio src='/morse.wav' controls />
            <p>Listen to the Morse code audio and decode it to find the final answer.</p>
            <input 
              type="text" 
              value={answers.morse || ''} 
              onChange={(e) => handleInputChange(e, 'morse')} 
              onKeyDown={handleEnterPress}
              placeholder="Type your answer here" 
              style={{
                padding: '10px',
                width: '100%',
                color: '#00ff00',
                backgroundColor: '#121212',
                border: '1px solid #00ff00',
                borderRadius: '4px',
                marginTop: '10px'
              }}
            />
          </div>
        )}

        {error && (
          <p style={{ color: '#ff0000', marginTop: '10px' }}>{error}</p>
        )}

        <button 
          onClick={checkAnswers} 
          style={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            color: '#121212', 
            backgroundColor: '#00ff00', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          aria-label={currentPart === 3 ? "Submit" : "Submit & Next"}
        >
          {currentPart === 3 ? "Submit" : "Submit & Next"}
        </button>
      </div>

      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button
          onClick={showHintToast}
          style={{
            padding: '10px 20px',
            backgroundColor: '#004400',
            color: '#00ff00',
            border: '1px solid #00ff00',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Hint
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Puzzle6;
