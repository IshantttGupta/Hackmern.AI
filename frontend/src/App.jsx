import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/auth';
import Dashboard from './pages/dashboard';
import PlannerPage from './pages/PlannerPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/auth" element= {<AuthPage />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element = {<PlannerPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
