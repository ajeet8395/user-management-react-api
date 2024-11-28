// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(getToken());
  const [user, setUser] = useState(null);

  const login = (newToken, userData) => {
    setToken(newToken);
    setAuthToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      user,
      login, 
      logout, 
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;