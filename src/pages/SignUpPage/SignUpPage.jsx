import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './SignUpPage.css';
import welcomeGuy from '../../assets/welcome-guy.png';

import API_END_POINTS from "../../config/api-end-points";
import ApiRequest from "../../config/api-request";

const SignUpPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (rePassword != password) {
            return alert("Password does not match!");
        }

        try {
            const params = {
                username: username, 
                password: password,
            };

            const response = await ApiRequest(API_END_POINTS.USER_SIGNUP, 'post', params);

            console.log("response: ", response);
            alert("Sign up succesful!")
            navigate('/');
        } catch(error) {
            console.error(error);
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

                        <div className="login-box-footer">
                            <Link to='/'><p>Already have an account? Login instead</p></Link>
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

export default SignUpPage;