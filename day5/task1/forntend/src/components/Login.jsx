import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if already logged in
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/employees');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            await dispatch(login({ email, password }));
            // Check if token was set in localStorage
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/employees');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Login failed: ' + (error.response?.data?.message || 'Invalid credentials'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="login-form">
                <h2>Log In</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className="form-control"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            className="form-control"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={loading}
                    >
                        {loading ? (
                            <><i className="fas fa-spinner fa-spin"></i> Logging in...</>
                        ) : (
                            <><i className="fas fa-sign-in-alt"></i> Log In</>
                        )}
                    </button>
                    <p className="mt-2">
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
