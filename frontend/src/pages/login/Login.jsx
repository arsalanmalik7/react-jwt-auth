import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { baseUrl } from "../../core";
import { GlobalContext } from "../../context/context";
import "./login.css"




const Login = () => {

    const instance = axios.create({
        baseURL: `${baseUrl}/api`


    })

    const { state, dispatch } = useContext(GlobalContext);

    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [result, setResult] = useState("");


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
            setResult(response.data.message)


        } catch (error) {
            setErrorMsg(error.response.data.message)
        }

    }




    return (
        <>
            <div className="form-container">

                <form className="form" onSubmit={loginSubmitHandler}>
                    <p className="form-title">Login to your account</p>
                    <div className="input-container">
                        <input ref={emailInputRef} required placeholder="Enter email" type="email" />

                    </div>
                    <div className="input-container">
                        <input ref={passwordInputRef} required placeholder="Enter password" type="password" />


                    </div>
                    <button className="submit" type="submit">
                        Sign in
                    </button>
                </form>


            </div>
            <div className="msg">
                <p className="error-msg" hidden={!errorMsg}>{errorMsg}</p>
            </div>
        </>
    )
}

export default Login