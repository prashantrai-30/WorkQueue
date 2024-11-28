import React, { useState } from 'react';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

const UploadAssignment = () => {
    const [assignment, setAssignment] = useState({ title: '', admin: '' });
    const [file, setFile] = useState(null); // State to store the uploaded file
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Handle text field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignment({ ...assignment, [name]: value });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        // Prepare the FormData
        const formData = new FormData();
        formData.append('title', assignment.title);
        formData.append('adminId', assignment.admin);
        formData.append('file', file);

        try {
            const response = await axios.post('/api/assignments/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccess(true);
            console.log('Assignment uploaded successfully:', response.data);
            setAssignment({ title: '', admin: '' });
            setFile(null);
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
                    label="Title"
                    name="title"
                    value={assignment.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                />
                <TextField
                    label="Admin ID"
                    name="admin"
                    value={assignment.admin}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                />
                <input
                    type="file"
                    accept=".pdf,.ppt,.csv"
                    onChange={handleFileChange}
                    style={{ marginTop: 20, display: 'block' }}
                    required
                />
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading || !file}
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
