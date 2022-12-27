import React, { useState } from "react";

function Input(props) {
    const [input, setInput] = useState("");

    return (
        <>
            <img src={props.icon} alt="Logo" />
            <label htmlFor={props.name}>{props.label}</label>
            <input
                name={props.name}
                type={props.type}
                onChange={(event) => setInput(event.target.value)}
                value={input}
            />
        </>
    );
}

export default Input;
