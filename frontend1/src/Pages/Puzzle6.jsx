import React, { useState ,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Puzzle6 = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const navigate=useNavigate()
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

  // Generalized answer check function
  const checkAnswers = async() => {
    let isCorrect = false;
    let nextStep = currentPart + 1;

    if (currentPart === 1) {
      const correctAnswers = {
        satoru: 'satoru',
        shinobu: 'shinobu',
        mikasa: 'mikasa',
        naruto: 'naruto',
        meliodas: 'meliodas'
      };

      // Check if all answers are correct
      const allCorrect = Object.keys(correctAnswers).every(
        key => answers[key]?.toLowerCase() === correctAnswers[key]
      );
      isCorrect = allCorrect;
    } else if (currentPart === 2) {
      // Check for the audio answer (binary to text)
      isCorrect = answers.audio?.toLowerCase() === 'shinzo wo sasageyo';
    } else if (currentPart === 3) {
      // Check the Morse code answer
      isCorrect = answers.morse?.toLowerCase() === 'all people are nothing but tools';
      if (isCorrect) {
        toast.success('Congratulations! You\'ve completed the puzzle!');
        alert('Puzzle Completed!');
        const token = localStorage.getItem('jwt'); // Get the JWT token from localStorage

    if (!token) {
      toast.error("No authentication token found. Please log in again.");
      return;
    }
        try {
          
          // Send a request to the backend to notify that the puzzle is completed
          const response = await axios.post(
            'http://localhost:3000/api/team/updateCount', // Replace with your actual API endpoint
            { isCorrect: true }, // You can send any necessary data with the request
            {
              headers: {
                authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
              }
            }
          );
          navigate('/puzzle/7')
        }
        catch(error){
          console.log(error)
        }
      }
    }

    if (isCorrect) {
      nextStep = currentPart === 3 ? currentPart : nextStep; // Don't increment for part 3 as it's the final part
      nextPart(nextStep);
    } else {
      setError('Incorrect answer. Try again!');
      toast.error('Incorrect answer. Keep trying!');
    }
  };

  const nextPart = (step) => {
    setCurrentPart(step);
    setAnswers({});
    setError('');
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#00ff00', padding: '20px', fontFamily: 'Arial', height: '100vh', padding: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Anime Puzzle Game</h1>
      <div>
        {currentPart === 1 && (
          <div>
            <h2>Part 1: Unscramble the Word</h2>
            <p>Unscramble the names of popular anime characters:</p>
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
                    placeholder="Answer"
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
