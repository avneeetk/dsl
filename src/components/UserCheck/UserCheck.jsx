// UserCheck.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../../mockdata'; // Import mock users data
import './UserCheck.css';
import router from '../Asset/router.jpg';

const UserCheck = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form with userId:", userId, "password:", password);

    // Find the user in mock data
    const user = mockUsers.find(u => u.username === userId && u.password === password);

    if (user) {
      navigate('/login'); // Navigate to the login form
    } else {
      alert('Login failed: Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Login</h1>
        <p>Login with your user ID and password set during registration</p>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
          <a href="/forgot-password" className="forgot">Forgot password?</a>
          <div className="signup-link">
            <p>Don’t have an account? <a href="/signup">SIGN UP here</a></p>
          </div>
        </form>
      </div>
      <div className="image">
        <img src={router} alt="User Authentication" />
      </div>
    </div>
  );
};

export default UserCheck;

