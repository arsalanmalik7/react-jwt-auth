import { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../context/context";
import "./about.css"
const About = () => {

    const { state, dispatch } = useContext(GlobalContext);

    return (
        <>
            <h1 className="chat-heading">About page</h1>
            <div>

                <p className="state">
                    {state.user.firstName}
                </p>
                <p className="state">
                    {state.user.lastName}
                </p>
                <p className="state">
                    {state.user.email}
                </p>

            </div>
        </>
    )
}

export default About;