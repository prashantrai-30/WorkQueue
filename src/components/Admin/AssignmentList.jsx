import React from 'react';
import AssignmentCard from './AssignmentCard';
import PropTypes from 'prop-types';

const AssignmentList = ({ assignments }) => {
    return (
        <div className="row">
            {assignments && assignments.length > 0 ? (
                assignments.map((assignment) => (
                    <div key={assignment.id || assignment._id} className="col-md-6 mb-4">
                        <AssignmentCard assignment={assignment} />
                    </div>
                ))
            ) : (
                <p className="text-center">No assignments to display.</p>
            )}
        </div>
    );
};

AssignmentList.propTypes = {
    assignments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            _id: PropTypes.string,
            task: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ),
};

export default AssignmentList;
