// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Platform1 from './components/Platform/platform1';
import Platform2 from './components/Platform/platform2';
import UserCheck from './components/UserCheck/UserCheck'; // Ensure this import matches the file name

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserCheck />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/platform1" element={<Platform1 />} />
        <Route path="/platform2" element={<Platform2 />} />
      </Routes>
    </Router>
  );
}

export default App;
