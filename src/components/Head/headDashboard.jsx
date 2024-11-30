import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignmentList from '../Admin/AssignmentList';

const HeadDashboard = () => {
    const [assignments, setAssignments] = useState([]);
    const [view, setView] = useState('latest'); 

    const fetchAssignments = async (endpoint) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/head/assignments${endpoint}`);
            setAssignments(response.data.assignments);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    useEffect(() => {
        fetchAssignments(view === 'latest' ? '/latest' : '');
    }, [view]);

    const handleDecision = async (id, decision) => {
        try {
            await axios.post(`http://localhost:5000/api/head/assignments/${id}/overturn`, { headDecision: decision });
            fetchAssignments(view === 'latest' ? '/latest' : '');
        } catch (error) {
            console.error('Error updating decision:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Head Dashboard</h2>
            <div className="btn-group">
                <button className="btn btn-primary" onClick={() => setView('latest')}>Latest Assignments</button>
                <button className="btn btn-secondary" onClick={() => setView('all')}>All Assignments</button>
            </div>
            <AssignmentList assignments={assignments} handleDecision={handleDecision} />
        </div>
    );
};

export default HeadDashboard;
