import React, { useState } from 'react';
import "./Signup.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    member1: '',
    member2: '',
    member3: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    const res = await fetch("https://cicada-production-a52d.up.railway.app/api/team/signup",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json();
    if(localStorage.getItem('jwt')){
      localStorage.removeItem('jwt');
    }
    localStorage.setItem('jwt', data.token);
    console.log(data);
    
    navigate("/");
  };

  return (
    <div className="backgroud-img">
      <div className="signup-container">
      <h2 className="sign">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label className="center1">
        <div className="log-name">Email:</div>      
            <input
            
            id="signup-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label  className="center1">
        <div className="log-name">Member 1:</div>
          <input
            id="signup-input"
            type="text"
            name="member1"
            value={formData.member1}
            onChange={handleChange}
            required
          />
        </label>
        <label className="center1">
        <div className="log-name">Member 2:</div>
          <input
          
            id="signup-input"
            type="text"
            name="member2"
            value={formData.member2}
            onChange={handleChange}
            
          />
        </label>
        <label className="center1">
        <div className="log-name">Member 3:</div>
          <input
            id="signup-input"
            type="text"
            name="member3"
            value={formData.member3}
            onChange={handleChange}
           
          />
        </label>
        <label className="center1">
          <div className="log-name">Password:</div>
          <input
            id="signup-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <div className="center13">
           <button   type="submit">Sign Up</button>
           <Link to="/login">
           <button id="login-btn-signuppage">Login</button>
           </Link>
        </div>
       
      </form>
     </div>
    </div>
   
  );
}

export default Signup;
