import React, { useState } from "react";
import axios from "axios";
import "./register.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${BASE_URL}/register`, {
                username,
                email,
                password,
            });

            // Store the JWT token in localStorage
            localStorage.setItem('jwt_token', response.data.token);

            // Redirect to login page after successful registration
            window.location.href = "/login";
        } catch (error: any) {
            setError(error.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
                <h2>Register</h2>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
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
                <button type="submit">Register</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
        </div>
    );
};

export default Register;
