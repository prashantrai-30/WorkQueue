import React, { useState, useEffect } from 'react';
import AssignmentList from './AssignmentList';
import axios from 'axios';

const AdminDashboard = () => {
    const [assignments, setAssignments] = useState([]); 
    const [recentAssignments, setRecentAssignments] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [activeTab, setActiveTab] = useState('assignments'); 

  
    const fetchAssignments = async () => {
        setLoading(true);
        try {
          /*  const token = localStorage.getItem('adminToken'); // Admin authentication token
            if (!token) {
                throw new Error('Unauthorized: Admin token not found');
            } */

            // API call to fetch assignments
            const response = await axios.get('/api/admin/assignments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const allAssignments = response.data.assignments;

            setAssignments(allAssignments);

            
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            const recent = allAssignments.filter((assignment) => {
                const assignmentDate = new Date(assignment.createdAt);
                return assignmentDate >= oneWeekAgo;
            });

            setRecentAssignments(recent);
            setError(null); // Clear previous errors
        } catch (err) {
            console.error('Error fetching assignments:', err);
            setError(err.response?.data?.message || 'Failed to fetch assignments.');
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

            {/* Tab Buttons */}
            <div className="btn-group mb-4" role="group" aria-label="Dashboard Tabs">
                <button
                    className={`btn btn-primary ${activeTab === 'assignments' ? 'active' : ''}`}
                    onClick={() => setActiveTab('assignments')}
                >
                    Assignments
                </button>
                <button
                    className={`btn btn-secondary ${activeTab === 'recents' ? 'active' : ''}`}
                    onClick={() => setActiveTab('recents')}
                >
                    Recents
                </button>
            </div>

            {/* Conditional Rendering Based on Active Tab */}
            {loading && <p>Loading assignments...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && activeTab === 'assignments' && (
                <AssignmentList assignments={assignments} />
            )}
            {!loading && !error && activeTab === 'recents' && (
                <AssignmentList assignments={recentAssignments} />
            )}
        </div>
    );
};

export default AdminDashboard;
