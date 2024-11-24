import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';

const HomePage = () => {
    return (
        <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" gutterBottom>
                Welcome to the Assignment Portal
            </Typography>
            <Typography variant="body1" style={{ margin: '20px 0' }}>
                This platform allows users to submit assignments and admins to review them. Please log in or register to get started.
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to="/register"
                    >
                        Register
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        component={Link}
                        to="/login"
                    >
                        Log In
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
