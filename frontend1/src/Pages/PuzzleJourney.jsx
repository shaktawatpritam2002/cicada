import React from 'react';
import { Link } from 'react-router-dom';
import './PuzzleJourney.css';

const PuzzleJourney = () => {
  const puzzles = [
    { id: 1, title: 'The Beginning', status: 'available' },
    { id: 2, title: 'Logic Gates', status: 'locked' },
    { id: 3, title: 'Binary Secrets', status: 'locked' },
    { id: 4, title: 'Circuit Challenge', status: 'locked' },
    { id: 5, title: 'Memory Maze', status: 'locked' },
    { id: 6, title: 'Data Stream', status: 'locked' },
    { id: 7, title: 'Neural Network', status: 'locked' },
    { id: 8, title: 'Final Integration', status: 'locked' },
  ];

  return (
    <div className="puzzle-journey">
      <h1 className="journey-title">Puzzle Journey</h1>
      <div className="journey-map">
        {puzzles.map((puzzle, index) => (
          <div key={puzzle.id} className="puzzle-node-container">
            <div className={`puzzle-node ${puzzle.status}`}>
              <div className="node-content">
                <span className="puzzle-number">{puzzle.id}</span>
                <h3 className="puzzle-title">{puzzle.title}</h3>
                {puzzle.status === 'locked' ? (
                  <span className="puzzle-link disabled">🔒</span>
                ) : (
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
              <div className="connector-line" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleJourney;