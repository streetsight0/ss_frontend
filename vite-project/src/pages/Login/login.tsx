import React, { useState, useContext } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../components/CampaignCard/CampaignDashboard.css"
import "../AddCampaign/AddCampaign.css"

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);  // Access setToken from context

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
                // Set the token using context
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                console.log("JWT Token stored in context:", response.data.token);
                
                // Redirect to the home page after successful login
                navigate("/home");
            } else {
                setError('Login failed');
            }
        } catch (error: any) {
            setError(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div  id="container">
            <h1 id="nametags" className="mainHeading">Login</h1>
            <p id="cap" className="caption">Effortless Billboard Management Starts here</p>
            <div className="login-container">
                <form onSubmit={handleLogin} className="login-form">
                    <p id="nametags" className="heading">Email</p>
                    <input className="input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p id="nametags"className="heading">Password</p>
                    <input className="input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="loginButton" type="submit">Login</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Login;
