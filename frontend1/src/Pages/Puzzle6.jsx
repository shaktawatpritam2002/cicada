import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Puzzle6 = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [time, setTime] = useState(10);
  const [hintShown, setHintShown] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!hintShown) {
      setHintShown(true);
      showHintToast();
    }
  }, [time, hintShown]);

  const showHintToast = () => {
    const hints = {
      2: "Hint: OTAKU",
      3: "Hint: TANJIRO",
    };
    toast.info(hints[currentPart], { position: "bottom-right", autoClose: 5000 });
  };

  const handleInputChange = (e, key) => {
    setAnswers({ ...answers, [key]: e.target.value });
  };

  const nextPart = () => {
    setCurrentPart(currentPart + 1);
    setTime(60);
    setHintShown(false);
    setAnswers({});
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#00ff00', padding: '20px', fontFamily: 'Arial' , height : '100vh', "padding" : "50px"}}>
      <h1 style={{ textAlign: 'center' }}>Anime Puzzle Game</h1>
      <div>
        {currentPart === 1 && (
          <div style={{padding : "12px"}}>
            <h2 style={{padding : "12px"}}>Part 1: Unscramble the Word</h2>
            <p style={{padding : "16px"}}>Unscramble the names of popular anime characters:</p>
            <ul>
              {[
                { scramble: 'Ruosat', hint: 'Satoru', key: 'satoru' },
                { scramble: 'ishobun', hint: 'Shinobu', key: 'shinobu' },
                { scramble: 'akiasm', hint: 'Mikasa', key: 'mikasa' },
                { scramble: 'aorutn', hint: 'Naruto', key: 'naruto' },
                { scramble: 'saioemld', hint: 'Meliodas', key: 'meliodas' }
              ].map(({ scramble, hint, key }) => (
                <li key={key} style={{ marginBottom: '10px' }}>
                  {scramble}
                  <input 
                    type="text" 
                    value={answers[key] || ''} 
                    onChange={(e) => handleInputChange(e, key)} 
                    placeholder={`Enter name for ${hint}`} 
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
            <button 
              onClick={nextPart} 
              style={{ 
                marginTop: '20px', 
                padding: '10px 20px', 
                color: '#121212', 
                backgroundColor: '#00ff00', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit & Next
            </button>
          </div>
        )}

        {currentPart === 2 && (
          <div>
            <h2>Part 2: Audio Sequence</h2>
            <audio src='../../../public/morsecode_8cj015dnk2kelo5lgfndafpngi.wav' controls />
            <p>Listen to the audio sequence, convert it to binary (short sound = 0, long sound = 1), then to decimal, ASCII, and finally determine the word.</p>
            <input 
              type="text" 
              value={answers.audio || ''} 
              onChange={(e) => handleInputChange(e, 'audio')} 
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
            <button 
              onClick={nextPart} 
              style={{ 
                marginTop: '20px', 
                padding: '10px 20px', 
                color: '#121212', 
                backgroundColor: '#00ff00', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit & Next
            </button>
          </div>
        )}

        {currentPart === 3 && (
          <div>
            <h2>Part 3: Morse Code Audio</h2>
            <audio src='../../../public/morsecode_8cj015dnk2kelo5lgfndafpngi.wav' controls />
            <p>Listen to the Morse code audio and decode it to find the final answer.</p>
            <input 
              type="text" 
              value={answers.morse || ''} 
              onChange={(e) => handleInputChange(e, 'morse')} 
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
            <button 
              onClick={() => alert('Puzzle Completed!')} 
              style={{ 
                marginTop: '20px', 
                padding: '10px 20px', 
                color: '#121212', 
                backgroundColor: '#00ff00', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', fontSize: '18px' }}>
        <p>Time Left: {time} seconds</p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Puzzle6;
