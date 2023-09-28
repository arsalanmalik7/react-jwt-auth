import React from "react";
import { useEffect, useState, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";



const Signup = () => {


    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);


    const instance = axios.create({
        baseURL: "http://localhost:3001/api"

    })

    useEffect(() => {

        const fetchSignup = async (e) => {

            e.preventDefault();



            try {
                const response = await instance.post(`/signup`, {
                    firstName: firstNameInputRef.current.value,
                    lastName: lastNameInputRef.current.value,
                    email: emailInputRef.current.value,
                    password: passwordInputRef.current.value,
                });

                console.log("resp: ", response.data.message);

            } catch (e) {
                console.log(e);

            }
            fetchSignup()
        }
        
    })

    return (
        <>
            <Form>
                <InputGroup className="mb-3" onSubmit={fetchSignup}>
                    <InputGroup.Text>First and last name</InputGroup.Text>
                    <Form.Control ref={firstNameInputRef} aria-label="First name" />
                    <Form.Control ref={lastNameInputRef} aria-label="Last name" />
                </InputGroup>
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={emailInputRef} type="email" placeholder="name@example.com" />

                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Form.Control ref={passwordInputRef} type="password" placeholder="Password" />
                <Button type='submit' variant="primary">Signup</Button>
            </Form>
        </>
    )
}

export default Signup