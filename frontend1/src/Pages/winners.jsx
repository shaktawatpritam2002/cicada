import React from "react";
import "./winners.css"; // Add your CSS here or in a separate file

// Winners Component - Simplified
const Winners = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Cicada X Rospinot</h2>
        <hr />
        
        {/* Congratulatory Message */}
        <div className="congratulations">
          <h3>Congratulations!</h3>
          <p>You've won the grand prize! Enjoy your reward!</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [showModal, setShowModal] = React.useState(true);

  return (
    <div className="App">
      {showModal && <Winners onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Winners;
