import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const getToken = localStorage.getItem("token");
    
    if (!getToken) {
        return <Navigate to="/login" />;
    }
    
    if (getToken.startsWith("google_oauth_")) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
