// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true); // Start loading

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       setLoading(false); // Stop loading
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Registration failed");

//       localStorage.setItem("token", data.token); // Save JWT
//       navigate("/dashboard"); // Redirect after success
//     } catch (err: unknown) {  // Use 'unknown' here
//       if (err instanceof Error) {  // Narrow down the type to Error
//         setError(err.message);
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h2 className="text-2xl font-bold">Register</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded"
//           disabled={loading}  // Disable button during loading
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
// import { useState } from "react";
// import { registerUser } from "./context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function Register() {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleRegister = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await registerUser(username, email, password);
//             alert("Registration Successful!");
//             navigate("/login");
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <form onSubmit={handleRegister}>
//             <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//             <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//             <button type="submit">Register</button>
//         </form>
//     );
// }

// export default Register;
import React, { useState } from "react";
import axios from "axios";
import "./register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post("http://localhost:5000/register", {
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
