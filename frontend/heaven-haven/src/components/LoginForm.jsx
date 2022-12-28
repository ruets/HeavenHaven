import React, { useState, useCallback, useEffect } from "react";
import Input from "./fields/Input/Input";
import EmailLogo from "../assets/img/email-icon.svg";
import PasswordLogo from "../assets/img/lock-icon.svg";
import "./loginForm.scss";

/**
 * responsability: handle login,
 */
export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmailFieldValid, setIsEmailValid] = useState(true);
    const [isPasswordFieldValid, setIsPasswordValid] = useState(true);

    const validateEmailFieldValue = useCallback(() => {
        const isEmailFieldValid = email !== "";
        setIsEmailValid(isEmailFieldValid);
    }, [setIsEmailValid, email]);

    const validatePasswordFieldValue = useCallback(() => {
        const isPasswordValid = password !== "" && password.length >= 8;
        setIsPasswordValid(isPasswordValid);
    }, [setIsPasswordValid, password]);

    const onSubmitForm = useCallback(() => {
        validateEmailFieldValue;
        validatePasswordFieldValue;
        if (isEmailFieldValid && isPasswordFieldValid) {
            // Post request to log in
            alert("Connexion acceptée !");
        } else {
            // Request denied and do nothing
            return;
        }
    }, [
        validateEmailFieldValue,
        validatePasswordFieldValue,
        isEmailFieldValid,
        isPasswordFieldValid,
    ]);

    return (
        <form className="signup" onSubmit={onSubmitForm}>
            <h1>Login</h1>
            <Input
                type="text"
                name="email"
                label="Email"
                icon={EmailLogo}
                value={email}
                error={!isEmailFieldValid}
                onBlur={validateEmailFieldValue}
                setInput={setEmail}
            ></Input>
            <div className="password">
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    icon={PasswordLogo}
                    value={password}
                    error={!isPasswordFieldValid}
                    setInput={setPassword}
                    onBlur={validatePasswordFieldValue}
                ></Input>
                <p className="forgot">Forgot Password ?</p>
            </div>
            <button type="submit">Sign In</button>
            <p>No account yet ? Sign up here</p>
        </form>
    );
}
