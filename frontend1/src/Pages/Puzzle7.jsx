import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Puzzle7.css';

const Puzzle = () => {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [unlockedSteps, setUnlockedSteps] = useState([1]);

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
            <p>"In the dark prince's speech of doubt and dread,  
               A question lingers—both alive and dead.  
               Look not just at the words, but what they imply,  
               Sum the letters of the choice's reply.  
               Consider vowels' weight in his solemn call,  
               Find the total, it's the key to it all."</p>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('10', 2)}>Submit</button>
          </>
        );
      case 2:
        return (
          <>
            <p>"The mind, layered in thought as in sheets of glass,
                Reflects itself, consciousness amassed.
                In Freud's trio, which guides the self,
                It's neither id nor super, but what holds them itself."</p>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('ego', 3)}>Submit</button>
          </>
        );
      case 3:
        return (
          <>
            <p>"As the mind is housed in a network so vast,
Think where decisions and morals are cast.
It's found in a region at the brain's very helm,
A cortex supreme in the neural realm."</p>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('prefrontal cortex', 4)}>Submit</button>
          </>
        );
      case 4:
        return (
          <>
            <p>"Artificial minds, mimicking our own,
                Layers upon layers, each neuron grown.
                Machines now learn from structures we trace,
                A network of nodes, in clusters of space."</p>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('neural network', 5)}>Submit</button>
          </>
        );
      case 5:
        return (
          <>
            <p>"From ancient wisdom and geometric lore,
A figure emerges with symmetry at its core.
A perfect square, twice thrice aligned,
A harmony in numbers, both even and prime.
Seek the shape where six meets six,
In this dual harmony, the answer sticks."</p>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('36', 6)}>Submit</button>
          </>
        );
      case 6:
        return <p>Congratulations! You've completed the puzzle!</p>;
      default:
        return null;
    }
  };

  return (
    <div className="puzzle-container">
      <h1 className="puzzle-title">Puzzle Challenge</h1>
      <div className="step-buttons">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => unlockedSteps.includes(num) && setStep(num)}
            className={step === num ? 'active' : ''}
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

export default Puzzle;
