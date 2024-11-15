import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Puzzle5.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this import for navigate
const Puzzle5 = () => {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [unlockedSteps, setUnlockedSteps] = useState([1]);
  const navigate = useNavigate(); // Use useNavigate to navigate programmatically
  // useEffect hook to check puzzle count and user authentication
  useEffect(() => {
    const checkPuzzleNumber = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        toast.error("No authentication token found. Please log in again.");
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('https://cicada-production-a52d.up.railway.app/api/team/getcount', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        const currentPath = window.location.pathname;
        const puzzleNumber = currentPath.split('/')[2];
        const count = response.data.correctCount + 1;
        if (puzzleNumber !== count.toString()) {
          navigate('/puzzle-journey');
        }
      } catch (error) {
        console.error('Error fetching puzzle count:', error);
        navigate('/login');
      }
    };
    checkPuzzleNumber();
  }, [navigate]); // Empty dependency array to run only once when the component mounts
  // Function to handle the completion of the puzzle
  const handlePuzzleCompletion = async () => {
    const token = localStorage.getItem('jwt'); // Get the JWT token from localStorage
    if (!token) {
      toast.error("No authentication token found. Please log in again.");
      return;
    }
    try {
      // Send a request to the backend to notify that the puzzle is completed
      await axios.post(
        'https://cicada-production-a52d.up.railway.app/api/team/updateCount', // Replace with your actual API endpoint
        { isCorrect: true }, // You can send any necessary data with the request
        {
          headers: {
            authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
        }
      );
      // Navigate to the next puzzle
      navigate('/puzzle/6');
      // Show success message
      toast.success("Puzzle completed successfully! You are a champion!");
    } catch (error) {
      console.error('Error completing puzzle:', error);
      toast.error("There was an error completing the puzzle. Please try again.");
    }
  };
  // Function to check the answer
  const checkAnswer = (correctAnswer, nextStep) => {
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      setUnlockedSteps((prevSteps) => [...prevSteps, nextStep]);
      setStep(nextStep);
      setAnswer('');
    } else {
      toast.error("Incorrect answer. Try again!");
    }
  };
  // Function to render different steps of the puzzle
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <p>"1. You're trying to run a ROS-based application, but none of the nodes seem to be communicating with each other. You've checked your code and all the individual nodes work correctly when run independently. What is the most likely issue with your ROS setup that is causing this problem?"</p>
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('roscore', 2)}>Submit</button>
          </>
        );
      case 2:
        return (
          <>
            <p>"2. You have a robot with two frames, 'base_link' and 'camera_link'. You're trying to get the transformation from 'camera_link' to 'base_link', but you get an error indicating the transform is not available. List possible reasons and solutions for this error."</p>
            <img src='../assets/puzzle2.png' alt="Puzzle 2" />
            <input
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={() => checkAnswer('broadcaster', 3)}>Submit</button>
          </>
        );
      case 3:
        return (
          <>
            <p>Congratulations! You've completed the puzzle!</p>
            <button onClick={handlePuzzleCompletion}>Complete Puzzle</button>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div className="puzzle-container">
      <h1 className="puzzle-title">Puzzle Challenge</h1>
      <div className="step-buttons">
        {[1, 2, 3].map((num) => (
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
export default Puzzle5;