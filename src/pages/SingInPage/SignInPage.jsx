import { useState } from "react";
import { Link } from "react-router-dom";

import './SignInPage.css';
import welcomeGuy from '../../assets/welcome-guy.png';

import API_END_POINTS from "../../config/api-end-points";
import ApiRequest from "../../config/api-request";

const SignInPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const params = {
                username: username, 
                password: password,
            };

            const response = await ApiRequest(API_END_POINTS.USER_LOGIN, params);

            console.log("response: ", response);
        } catch(error) {
            console.error(error);
            return alert("Invalid username or password!");
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
                            <button type="submit" className="login-button">LOGIN</button>
                        </form>

                        <div className="login-box-footer">
                            <Link to='/signup'><p>Don't have an account?</p></Link>
                        </div>
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

export default SignInPage;