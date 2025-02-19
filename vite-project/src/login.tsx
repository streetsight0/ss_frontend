import React, { useState } from "react";
import axios from "axios"; 
import "./login.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                password,
            });

            // Check if the response contains the token and store it in localStorage
            if (response.data.token) {
                // Remove any existing token and store the new one
                localStorage.setItem('jwt_token', response.data.token);
                console.log("JWT Token stored in localStorage:", response.data.token);

                // Redirect to the home page after successful login
                window.location.href = "/home";
            } else {
                setError('Login failed');
            }
        } catch (error: any) {
            setError(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
        </div>
    );
};

export default Login;
