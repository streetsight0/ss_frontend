
import "./home.css"
const Home = () => {
    const token = localStorage.getItem('jwt_token');  // Retrieve token from localStorage

    if (!token) {
        // If no token is found, redirect to login page
        window.location.href = "/login";
    }

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome to the Home Page</h1>
                <p>You have successfully logged in!</p>
            </div>
        </div>
    );
};

export default Home;
