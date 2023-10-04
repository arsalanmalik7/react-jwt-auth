import React from "react";
import { useEffect, useState, useRef } from "react";
import { baseUrl } from "../../core";
import axios from "axios";
import "./signup.css"



const Signup = () => {


    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const repeatPasswordInputRef = useRef(null);
    const [result, setResult] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


    const [passwordErrorClass, setPasswordErrorClass] = useState("hidden");

    const instance = axios.create({
        baseURL: `${baseUrl}/api`

    })


    const fetchSignup = async (e) => {

        e.preventDefault();



        if (passwordInputRef.current.value !== repeatPasswordInputRef.current.value) {
            setPasswordErrorClass("");
            return;
        } else {
            setPasswordErrorClass("hidden");
        }

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


        }
    }

    return (
        <>
            <div className="signup-container">
                <form className="form" onSubmit={fetchSignup}>
                    <p className="title">Signup</p>

                    <div className="flex">
                        <label>
                            <input required ref={firstNameInputRef} placeholder="" type="text" className="input" />
                            <span>Firstname</span>
                        </label>

                        <label>
                            <input required ref={lastNameInputRef} placeholder="" type="text" className="input" />
                            <span>Lastname</span>
                        </label>
                    </div>

                    <label>
                        <input required ref={emailInputRef} placeholder="" type="email" className="input" />
                        <span>Email</span>
                    </label>

                    <label>
                        <input required ref={passwordInputRef} placeholder="" type="password" className="input" />
                        <span>Password</span>
                    </label>
                    <label>
                        <input required placeholder="" type="password" className="input" ref={repeatPasswordInputRef} />
                        <span>Confirm password</span>
                    </label>
                    <button className="submit">Submit</button>
                </form>
            </div>
            <div className="msg">
                <p className="result" hidden={!result}>{result}</p>
                <p className="password-error" hidden={passwordErrorClass}>Passwords do not match</p>

                <p className="error-msg" hidden={!errorMsg}>{errorMsg}</p>
            </div>
        </>
    )
}

export default Signup