import React from 'react';
import AssignmentCard from './AssignmentCard';

const AssignmentList = ({ assignments }) => {
    return (
        <div className="row">
            {assignments.length > 0 ? (
                assignments.map((assignment) => (
                    <div key={assignment.id} className="col-md-6 mb-4">
                        <AssignmentCard assignment={assignment} />
                    </div>
                ))
            ) : (
                <p className="text-center">No assignments to review.</p>
            )}
        </div>
    );
};

export default AssignmentList;
