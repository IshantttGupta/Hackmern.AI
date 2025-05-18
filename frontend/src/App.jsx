import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/auth';
import Dashboard from './pages/dashboard';
import PlannerPage from './pages/PlannerPage';
import MealPlanPage from './pages/MealPlanPage';
import Home from './pages/home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect signed-in users from auth to home */}
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/home" replace /> : <AuthPage />}
        />

        {/* Protected Routes: accessible only if logged in */}
        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/planner"
          element={isLoggedIn ? <PlannerPage /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/generated-plan"
          element={isLoggedIn ? <MealPlanPage /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/auth" replace />}
        />
        
        {/* Catch-all: Redirect unknown paths to auth */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
