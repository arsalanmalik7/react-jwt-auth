import React from 'react';
import './App.css';
import Home from './components/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Chat from './pages/chat/Chat';
import { Routes, Route, Link, Navigate, Router } from "react-router-dom";







const App = () => {

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                        <Link to={`/chat`}>Chat</Link>
                    </li>
                    <li>
                        <Link to={`login`}>Login</Link>
                    </li>
                </ul>
            </nav>



            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />

                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                </Routes>
            </Router>
        </>
    )
}


export default App;
