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
		setError("");

		try {
			const response = await axios.post(`${BASE_URL}/register`, {
				username,
				email,
				password,
			});

			// Store the JWT token in localStorage
			localStorage.setItem("token", response.data.token);

			// Redirect to login page after successful registration
			window.location.href = "/login";
		} catch (error: any) {
			setError(error.response?.data?.error || "Registration failed");
		}
	};

	return (
		<div className="register-container">
			<div className="register-image"></div>
			<div className="register-form-container">
				<h1 className="title">Register</h1>
				<p className="subtitle">
					Join us and start managing your billboards effortlessly
				</p>
				<form onSubmit={handleRegister} className="register-form">
					<label>Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label>Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type="submit">Register</button>
					{error && <div className="error">{error}</div>}
				</form>
				<p className="login-text">
					Already have an account? <a href="/login">Login</a>
				</p>
			</div>
		</div>
	);
};

export default Register;
