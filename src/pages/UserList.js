// src/pages/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import EditFormComponent from '../components/EditFormComponent'; // Import the EditFormComponent

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State to manage the user being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://crud-app-backend-puce.vercel.app/student/getStudent');
      const transformedUsers = response.data.map(user => ({
        id: user._id, // Transform _id to id
        name: user.name,
        age: user.age
      }));
      setUsers(transformedUsers);
      console.log('Data fetched successfully:', transformedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle user update
  const handleUpdate = async (updatedData) => {
    try {
      const { id } = editingUser;
      await axios.put(`https://crud-app-backend-puce.vercel.app/student/updateStudent/${id}`, updatedData);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === id ? { ...user, ...updatedData } : user
        )
      );
      setEditingUser(null); // Hide the edit form after successful update
      console.log('User updated successfully:', id);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://crud-app-backend-puce.vercel.app/student/removeStudent/${id}`);
      setUsers(prevUsers =>
        prevUsers.filter(user => user.id !== id)
      );
      console.log('User deleted successfully:', id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to handle user edit button click
  const handleEdit = (user) => {
    setEditingUser(user); // Set the user object to be edited
  };

  return (
    <div>
      {editingUser ? (
        <EditFormComponent
          user={editingUser} // Pass the user object
          onSuccess={handleUpdate}
          onCancel={() => setEditingUser(null)} // Optionally handle form cancel
        />
      ) : (
        <UserTable
          users={users}
          handleEdit={handleEdit} // Pass handleEdit function
          handleDelete={handleDelete}
          handleCreateNew={() => fetchUsers()} // Optionally handle refresh after creation
        />
      )}
    </div>
  );
};

export default UserList;
