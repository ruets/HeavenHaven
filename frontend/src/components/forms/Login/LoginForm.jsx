import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Input from "../../fields/Input/Input";
import EmailLogo from "../../../assets/img/email-icon.svg";
import PasswordLogo from "../../../assets/img/lock-icon.svg";
import "./LoginForm.scss";

/**
 * responsability: handle login,
 */
export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [isPasswordFieldValid, setIsPasswordValid] = useState("");

    const validateEmailFieldValue = useCallback(() => {
        const isEmailInputValid =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (!isEmailInputValid) {
            setErrorMessageEmail("Le format de l'adresse email est invalide.");
            console.log(errorMessageEmail);
        } else {
            setErrorMessageEmail("");
        }
    }, [setErrorMessageEmail, email]);

    const validatePasswordFieldValue = useCallback(() => {
        const isPasswordValid = password !== "" && password.length >= 8;
        setIsPasswordValid(isPasswordValid);
    }, [setIsPasswordValid, password]);

    const onSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            validateEmailFieldValue();
            validatePasswordFieldValue();
            if (errorMessageEmail === "" && isPasswordFieldValid) {
                // Post request to log in
                alert("Connexion acceptée !");
            }
        },
        [
            validateEmailFieldValue,
            validatePasswordFieldValue,
            errorMessageEmail,
            isPasswordFieldValid,
        ]
    );

    return (
        <form className="login" onSubmit={onSubmitForm}>
            <h1>Log In</h1>
            <Input
                type="email"
                name="email"
                label="Email"
                icon={EmailLogo}
                value={email}
                errorMessage={errorMessageEmail}
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
                    errorMessage={!isPasswordFieldValid}
                    setInput={setPassword}
                ></Input>
                <Link to="/forgot">Forgot Password ?</Link>
            </div>
            <button type="submit">Sign In</button>
            <p className="no-account">
                No account yet ? <Link to={"/signup"}>Sign up here</Link>
            </p>
        </form>
    );
}
