import React, { useState } from "react";

function Input(props) {
    const [input, setInput] = useState("");

    return (
        <input
            type={props.type}
            onChange={(event) => setInput(event.target.value)}
            value={input}
        />
    );
}

export default Input;
