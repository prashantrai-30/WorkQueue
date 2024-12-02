import React, { useState } from 'react';
import axios from 'axios';


const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); 
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await axios.post(`http://localhost:5000cd /api/heads/login`, { email, password });
    
            if (response.data.msg === 'Login request sent to current HOD for approval.') {
                alert(response.data.msg);
            } else {
                onLoginSuccess(response.data.head);
            }
        } catch (error) {
            setError(error.response?.data?.msg || 'Login failed.');
        }
    };
    
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="mt-4">
                    <p className="text-center">Or login using:</p>
                    <div className="d-flex justify-content-center">
                        {/* Google Login */}
                        <a
                            href={'http://localhost:5000/auth/google'}
                            style={{ margin: '5px' }}
                        >
                            <button
                                className="btn btn-danger"
                                style={{ backgroundColor: '#DB4437', color: '#fff' }}
                            >
                                Login with Google
                            </button>
                        </a>
                        {/* GitHub Login */}
                        <a
                            href={'http://localhost:5000/auth/github'}
                            style={{ margin: '5px' }}
                        >
                            <button
                                className="btn btn-dark"
                                style={{ backgroundColor: '#333', color: '#fff' }}
                            >
                                Login with GitHub
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
