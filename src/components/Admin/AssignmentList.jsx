import React, { useState } from 'react';
import AssignmentCard from '../Admin/AssignmentCard';
import FeedbackForm from '../Admin/FeedbackForm'; 

const AssignmentList = ({ assignments, handleDecision, handleFeedbackSubmit }) => {
    const [selectedAssignment, setSelectedAssignment] = useState(null); // Track the assignment being provided feedback

    const openFeedbackForm = (assignment) => {
        setSelectedAssignment(assignment);
    };

    const closeFeedbackForm = () => {
        setSelectedAssignment(null);
    };

    return (
        <div className="row">
            {assignments.length > 0 ? (
                assignments.map((assignment) => (
                    <div key={assignment._id} className="col-md-6 mb-4">
                        <AssignmentCard
                            assignment={assignment}
                            handleDecision={handleDecision}
                            onFeedbackClick={() => openFeedbackForm(assignment)} // Open feedback form for this assignment
                        />
                    </div>
                ))
            ) : (
                <p>No assignments found.</p>
            )}

            {selectedAssignment && (
                <FeedbackForm
                    assignment={selectedAssignment}
                    onClose={closeFeedbackForm}
                    onSubmit={handleFeedbackSubmit} // Handle feedback submission
                />
            )}
        </div>
    );
};

export default AssignmentList;
