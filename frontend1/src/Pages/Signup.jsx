import React, { useState } from 'react';
import "./Signup.css"
import { useNavigate } from 'react-router-dom';
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
    const res = await fetch("/api/team/signup",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json();
    console.log(data);
    
    // navigate("/");
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Member 1:
          <input
            type="text"
            name="member1"
            value={formData.member1}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Member 2:
          <input
            type="text"
            name="member2"
            value={formData.member2}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Member 3:
          <input
            type="text"
            name="member3"
            value={formData.member3}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
