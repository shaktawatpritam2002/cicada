import React, { useState, useEffect } from "react";
import "./App.css"; // Add your CSS here or in a separate file

const winners = ({ onClose }) => {
  const [useImages, setUseImages] = useState(false); // Toggle between lines and images
  const images = Array(15).fill("./img/img2.png"); // Placeholder for image paths

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>WIN Window</h2>
        <hr />
        <div className="grid-container">
          {images.map((imageSrc, index) => (
            <div
              key={index}
              className={`grid-item ${index % 2 === 0 ? "light-box" : "dark-box"}`}
            >
              {useImages ? (
                <img src={imageSrc} alt={`Image ${index + 1}`} />
              ) : (
                <div className="line"></div>
              )}
            </div>
          ))}
        </div>
        <button onClick={() => setUseImages(!useImages)}>
          Toggle {useImages ? "Lines" : "Images"}
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="App">
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default winners;
