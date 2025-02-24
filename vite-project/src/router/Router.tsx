import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Dashboard/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Sidebar from "../components/navigation/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/", // Default route for protected pages
    element: (
      <ProtectedRoute>
        <Sidebar />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />, // Display error page if an error occurs
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login", // Public route for login
    element: <Login />, // Login page
    errorElement: <ErrorPage />,
  },
  {
    path: "/register", // Public route for registration
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
