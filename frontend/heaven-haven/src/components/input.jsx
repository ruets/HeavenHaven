import React, { useState } from "react";

function Input(props) {
    const [input, setInput] = useState("");

    return (
        <>
            {/* COMMENT METTRE UN SVG DANS LES PROPS ? ON MET TOUT LE PATH ? */}
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
