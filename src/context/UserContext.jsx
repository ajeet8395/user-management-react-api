// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../services/authService';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total_pages: 1,
    per_page: 6,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const data = await fetchUsers(page);
      setUsers(data.data);
      setPagination({
        page: data.page,
        total_pages: data.total_pages,
        per_page: data.per_page,
        total: data.total
      });
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserInList = async (id, userData) => {
    try {
      const updatedUser = await updateUser(id, userData);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Failed to update user');
      throw err;
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete user');
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{
      users,
      pagination,
      loading,
      error,
      loadUsers,
      updateUserInList,
      removeUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);

export default UserContext;