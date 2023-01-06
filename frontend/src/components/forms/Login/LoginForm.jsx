import React, { useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../fields/Input/Input";
import EmailLogo from "../../../assets/img/email-icon.svg";
import PasswordLogo from "../../../assets/img/lock-icon.svg";
import "./LoginForm.scss";

/**
 * responsability: handle login,
 */
export function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");

    const validateEmailFieldValue = useCallback(() => {
        const isEmailInputValid =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (!isEmailInputValid) {
            setErrorMessageEmail("The email adress format is not correct.");
        } else {
            setErrorMessageEmail("");
        }
    }, [setErrorMessageEmail, email]);

    const onSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            validateEmailFieldValue();
            if (errorMessageEmail === "") {
                console.log("Trying to connect");
                axios
                    .post("http://127.0.0.1:3000/api/auth/login", {
                            email: email,
                            password: password,
                    })
                    .then(function (response) {
                        // handle success
                        alert("Token d'authentification : " + response.data.token);
                        setErrorMessagePassword("");
                    })  
                    .catch(function (error) {
                        // handle error
                        setErrorMessagePassword(error.response.data.error);
                    });
            }
        },
        [
            validateEmailFieldValue,
            errorMessageEmail,
            errorMessagePassword,
            setErrorMessagePassword,
            password,
        ]
    );

    return (
        <form className="login" onSubmit={onSubmitForm}>
            <h1>Log In</h1>
            <div className="fields">
            <div className="inputs">
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
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    icon={PasswordLogo}
                    value={password}
                    errorMessage={errorMessagePassword}
                    setInput={setPassword}
                ></Input>
            </div>
            <Link to="/forgot">Forgot Password ?</Link>
            </div>
            <button type="submit">Sign In</button>
            <p className="no-account">
                No account yet ? <Link to={"/signup"}>Sign up here</Link>
            </p>
        </form>
    );
}
