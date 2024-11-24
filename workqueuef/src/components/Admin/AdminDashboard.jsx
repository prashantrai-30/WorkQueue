import React, { useState, useEffect } from 'react';
import AssignmentList from './AssignmentList';
import axios from 'axios';

const AdminDashboard = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch assignments tagged to the admin
    const fetchAssignments = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/assignments'); // Replace with your backend API endpoint
            setAssignments(response.data.assignments); // Assuming the API returns { assignments: [...] }
            setError(null);
        } catch (err) {
            console.error('Error fetching assignments:', err);
            setError('Failed to fetch assignments. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>
            {loading && <p>Loading assignments...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && <AssignmentList assignments={assignments} />}
        </div>
    );
};

export default AdminDashboard;
