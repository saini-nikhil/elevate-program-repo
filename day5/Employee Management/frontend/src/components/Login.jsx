import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const { login, loading, error: authError } = useAuth();

   
    

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const result = await login({ email, password });
            console.log('Login success, redirecting...', result);
            
            setTimeout(() => {
                window.location.href = '/employees';
            }, 100);
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.message || 'Invalid credentials'));
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
