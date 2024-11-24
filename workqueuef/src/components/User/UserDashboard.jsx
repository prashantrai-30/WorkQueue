import React from 'react';
import UploadAssignment from './UploadAssignment';

const UserDashboard = () => {
    return (
        <div className="container mt-5">
            <h2>Welcome, User!</h2>
            <UploadAssignment />
        </div>
    );
};

export default UserDashboard;
