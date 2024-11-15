import React, { useEffect } from 'react';
import './Mainpage.css';
import logo from "../assets/logo.png";

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

function MainPage() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };
  const navigate=useNavigate()
 useEffect(() => {
    // Check if JWT token is present in localStorage
    const token = localStorage.getItem('jwt');
    
    // If no token, redirect to the login page
    if (!token) {
      navigate('/login');  // Redirect to the login page
    }
  }, [navigate]);

  return (

    <>


      <div className="cicada-container">
        <div className='center-img-mobile'>
        <div className='start-journey'>
              <Link to="/puzzle-journey">
              <button id="start-journey-btn">Start Quiz</button>
            </Link>
          </div>
        </div>
        <div className="center-img">
          <div className="Background-img">
            <div className="Ball-up">
              <div className='uparrow' onClick={scrollToTop}></div>
            </div>
          </div>
          <div className='start-journey'>
              <Link to="/puzzle-journey">
              <button id="start-journey-btn">Start Quiz</button>
            </Link>
          </div>
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