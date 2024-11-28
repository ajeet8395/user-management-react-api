// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import UsersPage from '../pages/UsersPage';
import UserEditPage from '../pages/UserEditPage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/users" 
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/users/edit/:id" 
        element={
          <PrivateRoute>
            <UserEditPage />
          </PrivateRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;