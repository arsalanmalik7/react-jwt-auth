import React, { useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import './App.css';
import Home from './components/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Chat from './pages/chat/Chat';
import About from './pages/about/About';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Bootstrap } from 'react-bootstrap-icons';
import { Routes, Route, Link, Navigate, Router } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/esm/Container';
import { baseUrl } from './core';
import Nav from 'react-bootstrap/Nav';
import { GlobalContext } from './context/context';






const App = () => {


    const instance = axios.create({
        baseURL: `${baseUrl}`

    })


    const { state, dispatch } = useContext(GlobalContext);

    useEffect(() => {

        const loginStatus = async () => {

            try {

                const response = await instance.get(`/api/profile`, {
                    withCredentials: true,
                })

                console.log(response.data);

                dispatch({
                    type: "USER_LOGIN",
                    payload: response.data.data
                })

                console.log(state);
            } catch (error) {
                console.log(error);
                dispatch({ type: "USER_LOGOUT" })
                return;
            }

        }

        console.log(state);

        loginStatus();

    }, [])


    return (
        <>



            {state.isLogin === true && state.role === "admin" ?

                (
                    <>
                        <Navbar bg="primary" data-bs-theme="dark">
                            <Container>
                                <Navbar.Brand>Navbar</Navbar.Brand>
                                <Nav className="me-auto">
                                    <Link to={`/`}>Admin Home</Link>
                                    <Link to={`/chat`}>Admin Chat</Link>
                                    <Link to={`about`}>Admin About</Link>
                                </Nav>
                            </Container>
                        </Navbar>


                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="chat" element={<Chat />} />
                            <Route path="about" element={<About />} />

                            <Route path="*" element={<Navigate to="/" replace={true} />} />
                        </Routes>

                    </>
                )
                :
                null
            }


            {state.isLogin === true && state.role === "user" ?

                (
                    <>
                        <Navbar bg="primary" data-bs-theme="dark">
                            <Container>
                                <Navbar.Brand>Navbar</Navbar.Brand>
                                <Nav className="me-auto">
                                    <Link to={`/`}>Home</Link>
                                    <Link to={`/chat`}>Chat</Link>
                                    <Link to={`about`}>About</Link>
                                </Nav>
                            </Container>
                        </Navbar>


                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="chat" element={<Chat />} />
                            <Route path="about" element={<About />} />

                            <Route path="*" element={<Navigate to="/" replace={true} />} />
                        </Routes>

                    </>
                )
                :
                null
            }


            {state.isLogin === false ?

                <>
                    <nav>
                        <ul>
                            <li>
                                <Link to={`login`}>Login</Link>
                            </li>

                            <li>
                                <Link to={`signup`}>Signup</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />

                        <Route path="*" element={<Navigate to="/login" replace={true} />} />
                    </Routes>



                </>
                :
                null
            }


            {
                state.isLogin === null ?
                    (
                        <div>Loading...</div>
                    )
                    :
                    null
            }
        </>
    )
}


export default App;
