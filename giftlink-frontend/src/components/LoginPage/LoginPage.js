import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';
import { urlConfig } from '../../config';
import './LoginPage.css';

function LoginPage() {
    // State variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');

    // Context and navigation
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();

    // Redirect if already logged in
    useEffect(() => {
        if (bearerToken) {
            navigate('/app');
        }
    }, [navigate, bearerToken]);

    // Login handler
    const handleLogin = async (e) => {
        e.preventDefault();
        setIncorrect('');
        
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            const json = await response.json(); // Task 1: Access data in JSON format
    
            if (response.ok) {
                // Task 2: Set user details in session storage
                sessionStorage.setItem('bearer-token', json.token);
                sessionStorage.setItem('user-id', json.userId);
                sessionStorage.setItem('user-name', json.name);
                sessionStorage.setItem('user-email', json.email);
                
                // Task 3: Set the user's state to logged in
                setIsLoggedIn(true);
                
                // Task 4: Navigate to MainPage
                navigate('/app');
            } else {
                // Task 5: Clear input and set error message
                setEmail('');
                setPassword('');
                setIncorrect(json.message || 'Invalid email or password');
                
                // Clear error message after 2 seconds
                setTimeout(() => {
                    setIncorrect('');
                }, 2000);
            }
        } catch (error) {
            console.log("Error fetching details: " + error.message);
            setIncorrect('Network error. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        
                        {incorrect && (
                            <div className="alert alert-danger" role="alert">
                                {incorrect}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            {/* Email Input */}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength="6"
                                />
                            </div>

                            {/* Login Button */}
                            <button 
                                type="submit" 
                                className="btn btn-primary w-100 mb-3"
                            >
                                Login
                            </button>
                        </form>

                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;