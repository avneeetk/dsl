import React, { useState } from 'react';
import './UserCheck.css';
import router from '../Asset/router.jpg';
import { useNavigate } from 'react-router-dom';

const UserCheck = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form with userId:", userId, "password:", password);

    try {
      const response = await fetch('http://localhost:5001/user_verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log("Response from server:", result);

      if (result.success) {
        navigate('/login'); // Navigate to the login form
      } else {
        alert('Login failed: ' + result.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert('An error occurred. Please try again.');
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
