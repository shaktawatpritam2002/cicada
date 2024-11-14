import React, { useEffect } from 'react';
import './Mainpage.css';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

function MainPage() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };


  return (
    
    <>

    
    <div className="cicada-container">
      <div className="center-img">
       <div className="Background-img">
            <div className="Ball-up">
              <div className='uparrow' onClick={scrollToTop}></div>
            </div>
          </div>
       </div>
       <div className='start-journey'>
        <Link to="/puzzle-journey">
        <button id="start-journey-btn">Start Quiz</button>
        </Link>
      </div>
       <div className="about-box">
          <div>
            <br />
            <br />
              <p>Hello.</p>
              <p>Epiphany is upon you. Your pilgrimage has begun. Enlightenment awaits.</p>
              <br />
              <br />
              <p>Good luck.</p>
              <p>036</p>
          </div>
       </div>
    </div>
    </>
  );
}

export default MainPage;