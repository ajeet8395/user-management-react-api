// src/components/Users/UserSearch.jsx
import React, { useState, useEffect } from 'react';

const UserSearch = ({ users, onFilteredUsers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = users.filter(user => 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilteredUsers(filtered);
  }, [searchTerm, users, onFilteredUsers]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search users by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default UserSearch;