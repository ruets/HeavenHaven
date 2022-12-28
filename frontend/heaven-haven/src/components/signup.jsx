import React, { useState } from "react";
import Input from "./input";
import EmailLogo from "../assets/img/email-icon.svg";

/**
 * responsability: handle login,
 */
export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmailFieldValid, setIsEmailFieldValid] = useState(true);
    const [isPasswordFieldValid, setIsPasswordFieldValid] = useState(true);

    function handleEmailInput() {
        const isEmailValueEmpty = email === "";
        setIsEmailFieldValid(!isEmailValueEmpty);
    }

    function handlePasswordInput() {
        const isPasswordInvalid = password == "" || password.length < 8;
        setIsPasswordFieldValid(!isPasswordInvalid);
    }

    return (
        <div className="signup">
            <Input
                type="text"
                name="email"
                label="Email"
                icon={EmailLogo}
                value={email}
                error={!isEmailFieldValid}
                onBlur={handleEmailInput}
                setInput={setEmail}
            ></Input>
            <Input
                type="password"
                name="password"
                label="Password"
                value={password}
                error={!isPasswordFieldValid}
                setInput={setPassword}
                onBlur={handlePasswordInput}
            ></Input>
        </div>
    );
}

export default LoginForm;
