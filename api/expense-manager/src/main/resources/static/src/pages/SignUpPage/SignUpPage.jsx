import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import './SignUpPage.css';
import welcomeGuy from '../../assets/welcome-guy.png';

const SignUpPage = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("name: ", name);
        console.log("username: ", username);
        console.log("password: ", password);
        console.log("rePassword: ", rePassword);
            try {
                const response = await axios.post('http://localhost:8080/register', { username, password});
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
                        <p>Create Account</p>
                    </div>

                    <div className="login-box login-box-signup">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                            <div className="input-group">
                                <label htmlFor="re-password">Re-enter Password</label>
                                <input
                                    type="password"
                                    id="re-password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="login-button">SIGN UP</button>
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
                        <img className="image" src={welcomeGuy} alt="welcome guy"></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;