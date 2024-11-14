import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const res = await fetch("/api/team/login",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json();
    console.log(data);
    if(res.ok){
     navigate("/");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit}>
      <div >
        <label>
            Email:
           <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
        </label>
      </div>
      <div>
        <label>
          Password:
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <br />
        <button type="submit">Log In</button>
      </div>
        
      </form>
    </div>
  );
}

export default Login;
