import React, { useState, useEffect } from 'react';
import UploadAssignment from './UploadAssignment';
import AssignmentList from './AssignmentList';
import axios from 'axios';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('upload');
    const [previousSubmissions, setPreviousSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPreviousSubmissions = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('userToken'); // Assume user token is stored in localStorage
            const response = await axios.get('/api/user/submissions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPreviousSubmissions(response.data.submissions || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching submissions:', err);
            setError('Failed to fetch previous submissions. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (activeTab === 'submissions') {
            fetchPreviousSubmissions();
        }
    }, [activeTab]);

    return (
        <div className="container mt-5">
            <h2>Welcome, User!</h2>

            {/* Tab Buttons */}
            <div className="mt-4 mb-4">
                <button
                    className={`btn btn-primary me-2 ${activeTab === 'upload' ? '' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('upload')}
                >
                    Upload Assignment
                </button>
                <button
                    className={`btn btn-primary ${activeTab === 'submissions' ? '' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab('submissions')}
                >
                    Previous Submissions
                </button>
            </div>

            {/* Conditional Rendering */}
            {activeTab === 'upload' && <UploadAssignment />}
            {activeTab === 'submissions' && (
                <>
                    {loading && <p>Loading previous submissions...</p>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {!loading && !error && <AssignmentList assignments={previousSubmissions} />}
                </>
            )}
        </div>
    );
};

export default UserDashboard;
