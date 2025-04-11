import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
   
    const { user, logout } = useAuth();
    const isAdmin = user?.role === 'admin';
    
    const handleLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <i className="fas fa-users"></i>
                    <span>EMP Manager</span>
                </Link>
                
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                
                <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
                    {user ? (
                        <>
                            {isAdmin ? (
                                // Admin navigation links
                                <>
                                    <li className="nav-item">
                                        <Link 
                                            to="/admin" 
                                            className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <i className="fas fa-users-cog mr-2"></i> Admin Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link 
                                            to="/employees/new" 
                                            className={`nav-link ${location.pathname === '/employees/new' ? 'active' : ''}`}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <i className="fas fa-user-plus mr-2"></i> Add Employee
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                // Regular employee navigation links
                                <li className="nav-item">
                                    <Link 
                                        to="/directory" 
                                        className={`nav-link ${location.pathname === '/directory' ? 'active' : ''}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <i className="fas fa-address-book mr-2"></i> Employee Directory
                                    </Link>
                                </li>
                            )}
                            
                            <li className="nav-item">
                                <div className="user-info">
                                    <i className="fas fa-user mr-2"></i>
                                    {user.username}
                                    {isAdmin && <span className="admin-badge">Admin</span>}
                                </div>
                            </li>
                            <li className="nav-item">
                                <button className="logout-btn" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link 
                                    to="/login" 
                                    className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <i className="fas fa-sign-in-alt mr-2"></i> Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/signup" 
                                    className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <i className="fas fa-user-plus mr-2"></i> Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
