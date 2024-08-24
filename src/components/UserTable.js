// src/components/UserTable.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormComponent from '../components/FormComponent'

const UserTable = ({ users, handleEdit, handleDelete, handleCreateNew }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(prevState => !prevState);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    if (handleCreateNew) {
      handleCreateNew();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Simple CRUD App</h1>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
        onClick={toggleForm}
      >
        Create New
      </button>

      {showForm && <FormComponent onSuccess={handleFormSuccess} />}

      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Edit</th>
            <th className="border px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.age}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                  onClick={() => handleEdit(user)} // Pass the entire user object
                >
                  Edit
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired
    })
  ).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCreateNew: PropTypes.func
};

export default UserTable;
