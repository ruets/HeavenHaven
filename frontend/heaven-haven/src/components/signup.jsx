import React, { useState } from "react";
import Input from "./input";
import EmailLogo from "../assets/img/email-icon.svg";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailInput() {
        if (email == "") {
            document.getElementById("emailLabel").classList.add("active");
        } else {
            document.getElementById("emailLabel").classList.remove("active");
        }
    }

    return (
        <div className="signup">
            <Input
                type="text"
                name="email"
                label="Email"
                icon={EmailLogo}
                onBlur={handleEmailInput}
                setInput={setEmail}
                value={email}
            ></Input>
            {/*<Input type="password" name="password" label="Password"></Input>*/}
        </div>
    );
}

export default Signup;
