import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; // Add CSS styles for the sidebar
import userProfile from '../assets/user.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('username');
    }

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={toggleSidebar}>X</button>
            <div className='user-profile'>
                <div className='user-image'>
                    <img className="" src={userProfile} alt="welcome guy"></img>
                </div>
                <div className='user-details'>
                    <h2>Hello!</h2>
                    <p>{localStorage.getItem('username')}</p>
                </div>
            </div>
            <nav>
                <ul>
                    <li className={location.pathname === '/' ? 'active-nav' : ''}>
                        <Link to="/">Homepage</Link>
                    </li>
                    <li className={location.pathname === '/statistic' ? 'active-nav' : ''}>
                        <Link to="/statistic">Statistics</Link>
                    </li>
                    <li className={location.pathname === '/budget' ? 'active-nav' : ''}>
                        <Link to="/budget">Budget</Link>
                    </li>
                    <li className={location.pathname === '/category' ? 'active-nav' : ''}>
                        <Link to="/category">Category</Link>
                    </li>
                    <li className={location.pathname === '/login' ? 'active-nav' : ''} onClick={handleLogout}>
                        <Link to="/login">Logout</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
