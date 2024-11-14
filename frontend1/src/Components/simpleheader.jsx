import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import "./simpleheader.css";


const simpleheader = () => {
    return(
      <div className='mainpage-header'>
            <div className='logo'><img src={logo}></img></div>
            <div id='page-title'>RosPinoT X Cicada</div>
      </div>
    );
};

export default simpleheader;