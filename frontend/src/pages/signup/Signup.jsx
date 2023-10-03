import React from "react";
import { useEffect, useState, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { baseUrl } from "../../core";
import axios from "axios";



const Signup = () => {


    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const [result, setResult] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


    const instance = axios.create({
        baseURL: `${baseUrl}/api`

    })


    const fetchSignup = async (e) => {

        e.preventDefault();

        console.log("firstName: ", firstNameInputRef.current.value);
        console.log("lastName: ", lastNameInputRef.current.value);
        console.log("email: ", emailInputRef.current.value);
        console.log("password: ", passwordInputRef.current.value);

        try {
            const response = await instance.post(`/signup`, {
                firstName: firstNameInputRef.current.value,
                lastName: lastNameInputRef.current.value,
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
            });

            console.log("resp: ", response.data.message);
            setResult(response.data.message);

            setTimeout(() => {
                setResult("");

            }, 2000);

        } catch (error) {
            console.log(error.response.data.message);
            setErrorMsg(error.response.data.message);

            setTimeout(() => {
                setErrorMsg("");
            }, 5000);


        }
    }

    return (
        <>
            <Form onSubmit={fetchSignup}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>First and last name</InputGroup.Text>
                    <Form.Control required autoComplete="given-name" ref={firstNameInputRef} aria-label="First name" />
                    <Form.Control required autoComplete="family-name" ref={lastNameInputRef} aria-label="Last name" />
                </InputGroup>
                <Form.Label>Email address</Form.Label>
                <Form.Control required autoComplete="email" ref={emailInputRef} type="email" placeholder="name@example.com" />

                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Form.Control required autoComplete="new-password" ref={passwordInputRef} type="password" placeholder="Password" />
                <Button type='submit' variant="primary">Signup</Button>
            </Form>

            <div>
                <p>{result}</p>
                <p>{errorMsg}</p>
            </div>
        </>
    )
}

export default Signup