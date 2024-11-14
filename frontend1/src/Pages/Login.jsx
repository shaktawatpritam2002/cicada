import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
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
    console.log('Login data:', formData);
    const res = await fetch("http://localhost:3000/api/team/login",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json();
    localStorage.setItem('jwt', data.token);
    console.log(data);
    if(res.ok){
     navigate("/");
    }
  };

  return (
    <div className="backgroud-img">
      <div className="login-container">
      <h2 className="log1">Log In</h2>
      
      <form onSubmit={handleSubmit}>
      <div className="log-box" >
        <label className="center1">
          <div className="log-name"> Email:</div>
          
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
        </label>
      </div>
      <div className="log-box" >
        <label  className="center1">
         <div className="log-name"> Password:</div>
     
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
          />
        </label>
      </div>
      <div className='btn-box'>
        <br />
        <button type="submit">Log In</button>
        <Link to="/signup">
          <p id="signup-btn-loginpage">New Here Signup!</p>
        </Link>
      </div>
        
      </form>
     </div>
    </div>
   
  );
}

export default Login;
