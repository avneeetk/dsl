// LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDSLNumbers } from '../../mockdata'; // Import mock DSL numbers data
import { MdRouter } from "react-icons/md";
import './LoginForm.css';
import table from '../Asset/table.jpg';

const LoginForm = () => {
  const [dslNumber, setDslNumber] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Find the DSL number in mock data
    const entry = mockDSLNumbers.find(dsl => dsl.dsl_number === dslNumber);

    if (entry) {
      if (entry.platform === 'NAF Platform 1') {
        navigate('/platform1');
      } else if (entry.platform === 'NAF Platform 2') {
        navigate('/platform2');
      } else {
        setError('Unknown platform');
      }
    } else {
      setError('DSL number not found');
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
