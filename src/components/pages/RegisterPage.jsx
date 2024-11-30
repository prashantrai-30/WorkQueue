import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); // Default role
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            await axios.post(`http://localhost:5000/api/${role.toLowerCase()}s/register`, { name, email, password });
            setSuccess(true);
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Sign Up</h3>
                {success && <div className="alert alert-success">Account created successfully!</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            id="role"
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Head">Head</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
                <div className="mt-4">
                    <p className="text-center">Or sign up using:</p>
                    <div className="d-flex justify-content-center">
                        <a  href={'http://localhost:5000/auth/google'}
                            style={{ margin: '5px' }}>
                            <button
                                className="btn btn-danger"
                                style={{ backgroundColor: '#DB4437', color: '#fff' }}
                            >
                                Sign Up with Google
                            </button>
                        </a>
                        <a  href={'http://localhost:5000/auth/github'}
                            style={{ margin: '5px' }}>
                            <button
                                className="btn btn-dark"
                                style={{ backgroundColor: '#333', color: '#fff' }}
                            >
                                Sign Up with GitHub
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
