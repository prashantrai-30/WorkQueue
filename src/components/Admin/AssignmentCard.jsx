import React from 'react';
import PropTypes from 'prop-types';

const AssignmentCard = ({ assignment, onAccept, onReject, onOverturn }) => {
    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{assignment.task}</h5>
                <p className="card-text">
                    <strong>User:</strong> {assignment.userName}
                </p>
                <p className="card-text">
                    <strong>Assigned Admin:</strong> {assignment.admin}
                </p>
                <p className="card-text">
                    <strong>Status:</strong>{' '}
                    <span className={`badge ${getStatusBadge(assignment.status)}`}>
                        {assignment.status}
                    </span>
                </p>
                <p className="card-text">
                    <strong>Submitted At:</strong>{' '}
                    {new Date(assignment.createdAt).toLocaleString()}
                </p>
                {assignment.overturnedBy && (
                    <p className="card-text text-danger">
                        <strong>Overturned By:</strong> {assignment.overturnedBy}
                    </p>
                )}

                <div className="btn-group mt-3" role="group">
                    {onAccept && (
                        <button
                            className="btn btn-success"
                            onClick={() => onAccept(assignment._id || assignment.id)}
                        >
                            Accept
                        </button>
                    )}
                    {onReject && (
                        <button
                            className="btn btn-danger"
                            onClick={() => onReject(assignment._id || assignment.id)}
                        >
                            Reject
                        </button>
                    )}
                    {onOverturn && (
                        <button
                            className="btn btn-warning"
                            onClick={() =>
                                onOverturn(assignment._id || assignment.id, assignment.status === 'Accepted' ? 'Rejected' : 'Accepted')
                            }
                        >
                            {assignment.status === 'Accepted' ? 'Overturn to Reject' : 'Overturn to Accept'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// function to determine badge color for status
const getStatusBadge = (status) => {
    switch (status) {
        case 'Accepted':
            return 'bg-success text-white';
        case 'Rejected':
            return 'bg-danger text-white';
        case 'Pending':
            return 'bg-secondary text-white';
        default:
            return 'bg-light text-dark';
    }
};

// PropTypes validation
AssignmentCard.propTypes = {
    assignment: PropTypes.shape({
        id: PropTypes.string,
        _id: PropTypes.string,
        task: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        admin: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        overturnedBy: PropTypes.string,
    }),
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    onOverturn: PropTypes.func,
};

export default AssignmentCard;
