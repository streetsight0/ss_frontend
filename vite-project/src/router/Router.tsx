import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Dashboard/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Sidebar from "../components/navigation/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Navbar from "../components/navigation/Navbar";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
      <>
        <Navbar />
        <Sidebar />
      </>
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
      {
        path: "/billBoards",
        element: (
          <ProtectedRoute>
            <Billboards />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/", // Public route for login
    element: <Login />, // Login page
    errorElement: <ErrorPage />,
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
