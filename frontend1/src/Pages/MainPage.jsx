import React, { useEffect } from 'react';
import './Mainpage.css';
import logo from "../assets/logo.png";

function MainPage() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };


  return (
    
    <>
      <div className='mainpage-header'>
        <div className='logo'><img src={logo}></img></div>
        <div className='page-title'>RosPinoT X Cicada</div>
      </div>
    
    <div className="cicada-container">
      <div className="center-img">
       <div className="Background-img">
            <div className="Ball-up">
              <div className='uparrow' onClick={scrollToTop}></div>
            </div>
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