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
        
          <div className="Background-img">
            <div className="Ball-up">
              <div className='uparrow' onClick={scrollToTop}></div>
            </div>
          </div>
      
      
      </div>
    </>
  );
}

export default MainPage;