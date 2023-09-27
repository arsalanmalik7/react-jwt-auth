import React from "react";
import Form from 'react-bootstrap/Form';

const Login = () => {
    return (
        <Form>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />

            <Form.Label column sm="2">
                Password
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form>
    )
}

export default Login