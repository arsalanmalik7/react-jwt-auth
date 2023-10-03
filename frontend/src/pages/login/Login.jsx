import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { baseUrl } from "../../core";
import Form from 'react-bootstrap/Form';
import { GlobalContext } from "../../context/context";




const Login = () => {

    const instance = axios.create({
        baseURL: `${baseUrl}/api`


    })

    const { state, dispatch } = useContext(GlobalContext);

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);



    const loginSubmitHandler = async (e) => {
        e.preventDefault();


        try {

            const response = await instance.post(`/login`, {
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
            }, {
                withCredentials: true
            });

            dispatch({
                type: "USER_LOGIN",
                payload: response.data.data
            })

            console.log(response.data);


        } catch (error) {

            console.log(error.response.data.message)
        }

    }




    return (
        <Form onSubmit={loginSubmitHandler}>
            <Form.Label>Email address</Form.Label>
            <Form.Control ref={emailInputRef} required type="email" placeholder="name@example.com" />

            <Form.Label column sm="2">
                Password
            </Form.Label>
            <Form.Control ref={passwordInputRef} required type="password" placeholder="Password" />
            <Button variant="primary" type="submit" >Login</Button>
        </Form>
    )
}

export default Login