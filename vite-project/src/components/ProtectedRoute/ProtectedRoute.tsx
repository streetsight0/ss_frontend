import  { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useContext(AuthContext);  // Access token from context
    if (!token) {
        // If no token is available, redirect to the login page
        console.log("No token found, redirecting to login...");

        return <Navigate to="/login" />;
    }

    return children;  // Render the children components if the token exists
};

export default ProtectedRoute;
