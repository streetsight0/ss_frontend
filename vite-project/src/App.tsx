import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register';
import Login from './login';
import Home from './home';
import BillBoards from './billboards';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div><h1>Welcome to the Home Page!</h1></div>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path ="/billBoards" element={<BillBoards />} />
            </Routes>
        </Router>
    );
};

export default App;
