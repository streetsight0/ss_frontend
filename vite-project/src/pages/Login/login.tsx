import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { setToken } = useContext(AuthContext);
	const g_client_id = '831529127608-rrn1i7avpla8h7riaduq13nk1vi99u6f.apps.googleusercontent.com';

	useEffect(() => {
		if (window.location.hash.includes('access_token')) {
			navigate("/home");
		}
	}, [navigate]);

	const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		
		const redirect_uri = `${window.location.origin}/home`;
		const auth_uri = "https://accounts.google.com/o/oauth2/v2/auth";
		const scope = ["email", "profile", "openid"];

		const params = [
			`client_id=${g_client_id}`,
			`redirect_uri=${encodeURIComponent(redirect_uri)}`,
			`response_type=token`,
			`scope=${encodeURIComponent(scope.join(" "))}`
		].join("&");

		const fullAuthUrl = `${auth_uri}?${params}`;
		window.location.href = fullAuthUrl;
	};

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		setError("");

		try {
			const response = await axios.post(`${BASE_URL}/api/login`, {
				email,
				password,
			});

			if (response.data.token) {
				setToken(response.data.token);
				localStorage.setItem("token", response.data.token);
				navigate("/home");
			} else {
				setError("Login failed");
			}
		} catch (error: any) {
			setError(error.response?.data?.error || "Login failed");
		}
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<div className="welcome-section">
					<h1 className="welcome-text">Welcome Back!</h1>
					<div className="welcome-image"></div>
				</div>

				<div className="form-section-l">
					<h1 className="title">Login</h1>
					<p className="subtitle">
						Effortless Billboard Management Starts Here
					</p>

					<form 
						onSubmit={handleLogin}
						className="login-form" 
						id="login-form"
					>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="username"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<label htmlFor="password">Password</label>
						<div className="password-container">
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<span
								className="eye-icon"
								onClick={() => setShowPassword(!showPassword)}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										setShowPassword(!showPassword);
									}
								}}
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>

						<button 
							type="button" 
							onClick={handleGoogleLogin}
							className="google-login"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
								<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
								<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
								<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
							</svg>
							Login with Google
						</button>

						<button type="submit">Login</button>
						{error && <p className="error">{error}</p>}
					</form>

					<p className="signup-text">
						Don't have an account? <a href="/register">Sign up</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
