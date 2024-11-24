import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import axios from 'axios';

const AssignmentCard = ({ assignment }) => {
    const handleAccept = async () => {
        try {
            const response = await axios.post(`/api/assignments/${assignment.id}/accept`);
            alert(`Assignment accepted: ${response.data.message}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error accepting assignment:', error);
            alert('Failed to accept the assignment. Please try again.');
        }
    };

    const handleReject = async () => {
        try {
            const response = await axios.post(`/api/assignments/${assignment.id}/reject`);
            alert(`Assignment rejected: ${response.data.message}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error rejecting assignment:', error);
            alert('Failed to reject the assignment. Please try again.');
        }
    };

    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    User: {assignment.user}
                </Typography>
                <Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary" gutterBottom>
                    Submitted: {assignment.date}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    Task: {assignment.task}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary" onClick={handleAccept}>
                    Accept
                </Button>
                <Button size="small" variant="outlined" color="error" onClick={handleReject}>
                    Reject
                </Button>
            </CardActions>
        </Card>
    );
};

export default AssignmentCard;
