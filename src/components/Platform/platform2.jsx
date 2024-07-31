import React from 'react';
import { useNavigate } from 'react-router-dom';
import './platform.css'; // Import the shared CSS file

const Platform2 = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div className="platform-container">
      <h1>NAF Platform 2</h1>
      <button className="go-to-login-button" onClick={goToLogin}>Go to Login</button>
    </div>
  );
};

export default Platform2;
