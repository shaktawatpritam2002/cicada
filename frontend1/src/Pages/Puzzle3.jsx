import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Puzzle1 = () => {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [unlockedSteps, setUnlockedSteps] = useState([1]);
  const [timeLeft, setTimeLeft] = useState(60);

  const hints = {
    1: "Clue: Think of a renowned Roman general who was famous not just for his conquests but also for his secretive way of communicating. To unlock this message, you must step back into the past and retrace his steps through the alphabet, moving each letter back by the same number of places that his name rhymes with.",
  };

  useEffect(() => {
    setTimeLeft(60);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          // Check if a hint is available; if not, show a default message
          const hintMessage = hints[step] || 'There is no hint for this question';
          toast.info(hintMessage);
          clearInterval(timer);
          return 60;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  const checkAnswer = (correctAnswer, nextStep) => {
    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      toast.success('Correct!');
      setUnlockedSteps((prevSteps) => [...prevSteps, nextStep]);
      setStep(nextStep);
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
      }}
    >
      <h1 style={{ color: '#00ff00' }}>Puzzle Challenge</h1>
      <p>
        Ciphered Message: "Tqurkpqv vgjv hguv kipvkgu tqdqvkue kpqxvkevcp cpf itqyvj"
      </p>
      <p>{hints[step] || 'There is no hint for this question'}</p>
      <input
        type="text"
        placeholder="Enter answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={() => checkAnswer('rospinot tech fest ignites robotics innovation and growth', 2)}>
        Submit
      </button>
      <p>Time left: {timeLeft} seconds</p>
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Puzzle1;
