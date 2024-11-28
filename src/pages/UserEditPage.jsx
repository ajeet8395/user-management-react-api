// src/pages/UserEditPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchUserDetails } from '../services/authService';
import { useUsers } from '../context/UserContext';

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUserInList } = useUsers();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors } 
  } = useForm();

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        setLoading(true);
        const user = await fetchUserDetails(id);
        setUserData(user);
        setValue('first_name', user.first_name);
        setValue('last_name', user.last_name);
        setValue('email', user.email);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateUserInList(id, data);
      navigate('/users', { 
        state: { 
          message: 'User updated successfully',
          type: 'success' 
        } 
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              {...register('first_name', { 
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters"
                }
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs italic">{errors.first_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              {...register('last_name', { 
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters"
                }
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs italic">{errors.last_name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
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

          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update User
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;