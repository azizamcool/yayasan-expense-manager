import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

import './SignInPage.css';
import welcomeGuy from '../../assets/welcome-guy.png';

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);
            const response = await axios.post('http://localhost:8080/login', params);

            if (response.status === 200) {
                navigate('/homepage');
            }
            alert(response.data);
        } catch (error) {
            alert('Login failed: ' + (error));
        }
    };



    return (
        <div className="login-container">
            <div className="login-left">
                <div className="login-left-container">
                    <div className="login-title">
                        <p>Sign In</p>
                    </div>
                    <div className="login-box">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-group remember-me">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="rememberMe">Remember Me</label>
                            </div>
                            <button type="submit" className="login-button">LOGIN</button>
                            <div className="login-box-footer">
                                <Link to='/register'><p>Don't have an account?</p></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="login-right">
                <div className="login-right-container">
                    <div className="welcome-text">
                        <h2>WELCOME!</h2>
                        <p>Your personal money manager</p>
                    </div>
                    <div className="image-container">
                        <img className="image" src={welcomeGuy} alt="welcome guy" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
