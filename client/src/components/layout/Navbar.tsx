import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header>
            <h1 className='logo'>
                <Link to='/'>
                    Code Collab
                </Link>
            </h1>
            <nav>
                <ul>
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/snippets">My Snippets</Link></li>
                            <li><Link to="/create-snippet">Create Snippet</Link></li>
                            <li><button onClick={logout} className='logoutbtn'>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register"><button className='registerbtn'>Register</button></Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;