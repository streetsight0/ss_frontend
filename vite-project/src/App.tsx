import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';
import Home from './home';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div><h1>Welcome to the Home Page!</h1></div>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
