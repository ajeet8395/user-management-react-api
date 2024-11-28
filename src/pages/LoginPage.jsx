// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { login: setAuthToken } = useAuth();

  const onSubmit = async (data) => {
    try {
      const { token } = await login(data.email, data.password);
      setAuthToken(token);
      navigate('/users');
    } catch (error) {
      setLoginError(error.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white shadow-md rounded px-8 py-12"
        >
          <h2 className="text-center text-2xl font-bold mb-6">User Login</h2>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters"
                }
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password.message}</p>
            )}
          </div>
          {loginError && (
            <p className="text-red-500 text-center mb-4">{loginError}</p>
          )}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;