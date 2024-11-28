// src/pages/UsersPage.jsx
import React, { useEffect, useState } from 'react';
import { useUsers } from '../context/UserContext';
import UserCard from '../components/Users/UserCard';
import Pagination from '../components/Users/Pagination';
import UserSearch from '../components/Users/UserSearch';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const UsersPage = () => {
  const { users, loading, error, loadUsers, pagination } = useUsers();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || 'success'
      });

      // Clear the state to prevent showing the message again
      navigate(location.pathname, { replace: true });

      // Clear notification after 3 seconds
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
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
    <div className="container mx-auto px-4 py-8">
      {notification && (
        <div className={`
          fixed top-4 right-4 z-50 px-4 py-2 rounded 
          ${notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
          }
        `}>
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users List</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <UserSearch 
        users={users} 
        onFilteredUsers={setFilteredUsers} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No users found
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Pagination 
          currentPage={pagination.page} 
          totalPages={pagination.total_pages}
          onPageChange={loadUsers}
        />
      </div>
    </div>
  );
};

export default UsersPage;