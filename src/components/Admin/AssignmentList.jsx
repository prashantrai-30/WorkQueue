import React from 'react';
import AssignmentCard from '../Admin/AssignmentCard';

const AssignmentList = ({ assignments, handleDecision }) => {
    return (
        <div className="row">
            {assignments.length > 0 ? (
                assignments.map((assignment) => (
                    <div key={assignment._id} className="col-md-6 mb-4">
                        <AssignmentCard 
                            assignment={assignment} 
                            handleDecision={handleDecision} 
                        />
                    </div>
                ))
            ) : (
                <p>No assignments found.</p>
            )}
        </div>
    );
};

export default AssignmentList;
