import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Signup = () => {


    return (
        <>
            <Form>
                <InputGroup className="mb-3">
                    <InputGroup.Text>First and last name</InputGroup.Text>
                    <Form.Control aria-label="First name" />
                    <Form.Control aria-label="Last name" />
                </InputGroup>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />

                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form>
        </>
    )
}

export default Signup