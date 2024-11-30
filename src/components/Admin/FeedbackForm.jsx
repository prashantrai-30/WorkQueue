import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Box, Typography, Alert, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const FeedbackForm = ({ assignment, onClose, onSubmit }) => {
    const [feedback, setFeedback] = useState('');
    const [existingFeedback, setExistingFeedback] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/assignments/${assignment._id}/feedback`);
                setExistingFeedback(response.data.feedback);
            } catch (err) {
                console.error('Error fetching feedback:', err);
                setError('Failed to load feedback.');
            }
        };

        fetchFeedback();
    }, [assignment]);

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await onSubmit(assignment._id, feedback);
            setSuccess(true);
            setFeedback('');
        } catch (err) {
            console.error('Error submitting feedback:', err);
            setError('Failed to submit feedback. Please try again.');
        }
    };

    return (
        <Modal open onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Feedback for "{assignment.title}"
                </Typography>
                {success && <Alert severity="success">Feedback submitted successfully!</Alert>}
                {error && <Alert severity="error">{error}</Alert>}

                <Typography variant="body1" mb={2}>
                    Existing Feedback:
                </Typography>
                <List>
                    {existingFeedback.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`${item.role}: ${item.text}`}
                                secondary={`Provided by: ${item.providedBy.name}`}
                            />
                        </ListItem>
                    ))}
                </List>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Your Feedback"
                        value={feedback}
                        onChange={handleFeedbackChange}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        required
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Submit Feedback
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default FeedbackForm;
