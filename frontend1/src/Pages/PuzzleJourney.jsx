import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PuzzleJourney.css';

const PuzzleJourney = () => {
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  const puzzles = [
    { id: 1, title: 'The Beginning' },
    { id: 2, title: 'Logic Gates' },
    { id: 3, title: 'Binary Secrets' },
    { id: 4, title: 'Circuit Challenge' },
    { id: 5, title: 'Memory Maze' },
    { id: 6, title: 'Data Stream' },
    { id: 7, title: 'Neural Network' },
    
  ];

  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error('No authentication token found');
          navigate('/login')
        }

        const response = await axios.get('https://cicada-production-a52d.up.railway.app/api/team/getcount', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        setCorrectCount(response.data.correctCount);
      } catch (err) {
        console.error('Error fetching count:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);
console.log(correctCount)
  const getPuzzleStatus = (puzzleId) => {
    if (puzzleId <=correctCount) return 'completed';
    if (puzzleId === correctCount + 1){
      console.log(puzzleId)
      return 'available';}
    return 'locked';
  };

  if (loading) {
    return (
      <div className="puzzle-journey">
        <div className="loading">Loading puzzle progress...</div>
      </div>
    );
  }

  if (error) {
    
    return (
      <div className="puzzle-journey">
        <div className="error">Error: {error}</div>
      </div>
    );
    
  }

  return (
    <div className="puzzle-journey">
      <h1 className="journey-title">Puzzle Journey</h1>
      <div className="progress-info">
        <span>Completed: {correctCount} / {puzzles.length}</span>
      </div>
      <div className="journey-map">
        {puzzles.map((puzzle, index) => {
          const status = getPuzzleStatus(puzzle.id);
          
          return (
            <div key={puzzle.id} className="puzzle-node-container">
              <div className={`puzzle-node ${status}`}>
                <div className="node-content">
                  <span className="puzzle-number">{puzzle.id}</span>
                  <h3 className="puzzle-title">{puzzle.title}</h3>
                  {status === 'locked' && (
                    <span className="puzzle-lock">🔒</span>
                  )}
                  {status === 'completed' && (
                    <span className="puzzle-complete">✅</span>
                  )}
                  {status === 'available' && (
                    <Link 
                      to={`/puzzle/${puzzle.id}`} 
                      className="puzzle-link"
                    >
                      Start
                    </Link>
                  )}
                </div>
              </div>
              {index < puzzles.length - 1 && (
                <div className={`connector-line ${
                  status === 'completed' ? 'completed' : ''
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleJourney;