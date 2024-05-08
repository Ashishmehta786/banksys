import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Logincontext } from '../contexts/Logincontext';

const Dashboard = () => {
    const logged = useContext(Logincontext)
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/users/dashboard');
                setUserData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data. Please try again later.');
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            // await axios.post('/api/users/logout'); // Call logout endpoint on the backend
            localStorage.removeItem('token'); // Remove token from local storage
            navigate('/login');
            logged.setlogin(false)

        } catch (error) {
            console.error('Logout error:', error);
            setError('Failed to logout. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto mt-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {userData && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">User Information</h2>
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Name:</label>
                            <p>{userData.name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Email:</label>
                            <p>{userData.email}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Address:</label>
                            <p>{userData.address}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Adhar Number:</label>
                            <p>{userData.adhar}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">PAN:</label>
                            <p>{userData.pan}</p>
                        </div>

                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        {/* Add additional sections or widgets here */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
