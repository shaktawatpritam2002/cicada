import React, { useState, useEffect } from "react";
import "./loosers.css"; // Create a separate CSS file or use a style block

const loosers = () => {
  const [isOpen, setIsOpen] = useState(true); // Modal open state
  const [animatedText, setAnimatedText] = useState(""); // For animated text
  const textToAnimate = "We Only Want LeADeRs not followers!!";

  useEffect(() => {
    if (isOpen) {
      animateText(textToAnimate);
    }
  }, [isOpen]);

  // Function to animate the text
  const animateText = (text) => {
    setAnimatedText(""); // Clear existing text
    let i = 0;
    const speed = 100; // Speed of text display

    const typeWriter = () => {
      if (i < text.length) {
        setAnimatedText((prev) => prev + text.charAt(i));
        i++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
    setAnimatedText(""); // Clear text on close
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close-btn" onClick={closeModal}>
            &times;
          </span>
          <h2>ROSPINOT X CICADA</h2>
          <hr />
          <img src="img2.png" className="leader-img" alt="Leader Icon" />
          <p id="animatedText">{animatedText}</p>
        </div>
      </div>
    )
  );
};

export default loosers;
