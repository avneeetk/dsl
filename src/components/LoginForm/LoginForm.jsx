import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdRouter } from "react-icons/md";
import './LoginForm.css';
import table from '../Asset/table.jpg';

const LoginForm = () => {
  const [dslNumber, setDslNumber] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5001/api/check-dsl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dslNumber })
      });

      if (!response.ok) {
        throw new Error('DSL number not found');
      }

      const result = await response.json();
      if (result.platform === 'NAF Platform 1') {
        navigate('/platform1');
      } else if (result.platform === 'NAF Platform 2') {
        navigate('/platform2');
      } else {
        throw new Error('Unknown platform');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="wrapper">
      <h1>WELCOME, USER!</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            className="input"
            value={dslNumber}
            onChange={(e) => setDslNumber(e.target.value)}
            placeholder="Enter DSL number"
          />
          <div className="icon">
            <MdRouter />
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">GO TO NAF PLATFORM</button>
      </form>
      <img src={table} alt="DSL" className="login-table" />
    </div>
  );
};

export default LoginForm;
