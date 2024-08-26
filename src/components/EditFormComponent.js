// src/components/EditFormComponent.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const EditFormComponent = ({ user, onSuccess, onCancel }) => {
    const [name, setName] = useState(user.name || '');
    const [age, setAge] = useState(user.age || '');

    // Handle user data update
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setAge(user.age || '');
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            name,
            age,
        };

        // Use the provided backend URL
        // const apiUrl = 'https://crud-backend-two-gamma.vercel.app/';

        // Send the PUT request to update the user
        axios.put(`https://crud-backend-two-gamma.vercel.app/student/updateStudent/${user.id}`, updatedUser)
            .then(response => {
                console.log('User updated successfully:', response.data);
                onSuccess();
                // Notify parent component that the update was successful
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="flex justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

EditFormComponent.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired
    }).isRequired,
    onSuccess: PropTypes.func.isRequired, // Callback to notify the parent component of the update
    onCancel: PropTypes.func.isRequired // Callback to handle form cancel
};

export default EditFormComponent;
