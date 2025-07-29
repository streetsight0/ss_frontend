import React, { useState, useContext } from "react";
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

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		setError("");

		try {
			const response = await axios.post(`${BASE_URL}/login`, {
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


const g_client_id = '831529127608-rrn1i7avpla8h7riaduq13nk1vi99u6f.apps.googleusercontent.com';

const handleGoogleLogin = () => {
  const redirect_uri = `${window.location.origin}/home`;
  const auth_uri = "https://accounts.google.com/o/oauth2/v2/auth";
  const scope = ["email", "profile", "openid"];

  const params = [
    `client_id=${g_client_id}`,
    `redirect_uri=${encodeURIComponent(redirect_uri)}`,
    `response_type=token`,
    `scope=${encodeURIComponent(scope.join(" "))}`
  ].join("&");

  window.location.href = `${auth_uri}?${params}`;
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

					<form onSubmit={handleLogin} className="login-form">
						<label>Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<label>Password</label>
						<div className="password-container">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<span
								className="eye-icon"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</span>
						</div>

                        <button onClick={handleGoogleLogin}>Login with Google</button>

						<button type="submit">Login</button>
						{error && <p className="error">{error}</p>}
					</form>

					<p className="signup-text">
						Don’t have an account? <a href="/register">Sign up</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
