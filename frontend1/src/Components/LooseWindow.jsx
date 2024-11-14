import React, { useEffect, useState } from 'react';
import './LooseWindow.css'; // Make sure to link this to your CSS file or copy the styles here

function LooseWindow() {
  const [text, setText] = useState('');
  const message = "We Only Want LeADeRs not followers!!";

  useEffect(() => {
    animateText(message);
  }, []);

  const animateText = (text) => {
    setText(''); // Clear any existing text
    let i = 0;
    const speed = 100; // Speed of text display

    const typeWriter = () => {
      if (i < text.length) {
        setText((prev) => prev + text.charAt(i));
        i++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();
  };

  const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  return (
    <div className="App">
      {/* Modal structure */}
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close-btn" onClick={closeModal}>&times;</span>
          <h2>WIN Window</h2>
          <hr />
          <img src="./img/img2.png" className="leader-img" alt="Leader Icon" />
          <p id="animatedText">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default LooseWindow;