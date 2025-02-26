import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError(); // Get error details if available

  return (
    <div>
      <h1>Oops! Page not found.</h1>
      <p>
        {error?.statusText || error?.message || "Something went wrong."}
      </p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default ErrorPage;