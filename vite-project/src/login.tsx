import React, { useState } from "react";
import axios from "axios"; 
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZuZWt5QGdnZyIsImlhdCI6MTczOTQzNTE1NSwiZXhwIjoxNzM5NDM4NzU1fQ.tpEYs4kV1yz0XK41Lv_8dGTS2kCbH3q74sFuoVgyzpA
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR5dEBnbWFpbC5jb20iLCJpYXQiOjE3Mzk0MzU0MzQsImV4cCI6MTczOTQzOTAzNH0.Ypw4_aIxbZSgt4Gi4_fkD7IA0QSxDa1s8kVmpP3Wkzc
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0ODUxNDA5ODQsImlhdCI6MTQ4NTEzNzM4NCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIyOWFjMGMxOC0wYjRhLTQyY2YtODJmYy0wM2Q1NzAzMThhMWQiLCJhcHBsaWNhdGlvbklkIjoiNzkxMDM3MzQtOTdhYi00ZDFhLWFmMzctZTAwNmQwNWQyOTUyIiwicm9sZXMiOltdfQ.Mp0Pcwsz5VECK11Kf2ZZNF_SMKu5CgBeLN9ZOP04kZo

        try {
            const response = await axios.post("http://localhost:5000/login", {
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
