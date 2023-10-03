import { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../../context/context";

const About = () => {

    const { state, dispatch } = useContext(GlobalContext);

    return (

        <div>
            <h1>About page</h1>

            <p>
                {state.user.firstName}
            </p>
            <p>
                {state.user.lastName}
            </p>
            <p>
                {state.user.email}
            </p>

        </div>
    )
}

export default About;