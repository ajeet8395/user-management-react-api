// src/components/Users/UserCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const { removeUser } = useUsers();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleEdit = () => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setIsDeleting(true);
        await removeUser(user.id);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md hover:shadow-none border transition-all duration-300 rounded-lg p-6 relative">
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-2">
          {error}
        </div>
      )}
      <div className="flex items-center space-x-4">
        <img 
          src={user.avatar} 
          alt={`${user.first_name} ${user.last_name}`} 
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-bold">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleEdit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`
            ${isDeleting ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-700'} 
            text-white font-bold py-1 px-3 rounded
          `}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;