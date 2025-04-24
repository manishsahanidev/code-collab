import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <header>
            <h1 className='logo'>
                <Link to='/'>
                    Code Collab
                </Link>
            </h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register"><button className='registerbtn'>Register</button></Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;