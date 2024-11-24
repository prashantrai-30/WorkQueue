import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user', // Default role is 'user'
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const response = await axios.post('/api/register', formData); // Replace with your API endpoint
            setSuccess(true);
            console.log('Registration successful:', response.data);
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'user',
            });
        } catch (err) {
            console.error('Error during registration:', err);
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '20px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            {success && <Alert severity="success">Registration successful! You can now log in.</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    required
                />
                <TextField
                    select
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </TextField>
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
