import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const LoginPage = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call API for login
        console.log('Logging in:', form);
    };

    return (
        <Box 
          sx={{ width: 400, margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}
        >
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <TextField 
                  label="Email" 
                  variant="outlined" 
                  fullWidth 
                  name="email" 
                  value={form.email} 
                  onChange={handleInputChange} 
                  margin="normal" 
                />
                <TextField 
                  label="Password" 
                  type="password" 
                  variant="outlined" 
                  fullWidth 
                  name="password" 
                  value={form.password} 
                  onChange={handleInputChange} 
                  margin="normal" 
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit" 
                  fullWidth
                >
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default LoginPage;
