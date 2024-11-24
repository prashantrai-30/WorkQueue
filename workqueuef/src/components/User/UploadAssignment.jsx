import React, { useState } from 'react';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

const UploadAssignment = () => {
    const [assignment, setAssignment] = useState({ task: '', admin: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignment({ ...assignment, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const response = await axios.post('/api/assignments/upload', assignment); // Replace with your backend API endpoint
            setSuccess(true);
            console.log('Assignment uploaded successfully:', response.data);
            setAssignment({ task: '', admin: '' }); // Reset form fields
        } catch (err) {
            console.error('Error uploading assignment:', err);
            setError('Failed to upload the assignment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '20px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Upload Assignment</h2>
            {success && <Alert severity="success">Assignment uploaded successfully!</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Task"
                    name="task"
                    value={assignment.task}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                />
                <TextField
                    label="Admin"
                    name="admin"
                    value={assignment.admin}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                />
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        {loading ? 'Uploading...' : 'Submit Assignment'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UploadAssignment;
