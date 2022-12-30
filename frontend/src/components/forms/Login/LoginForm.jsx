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

    /* 
    const onSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            validateEmailFieldValue();
            if (errorMessageEmail === "") {
                // TODO Get request with email and password
                // if the request is good, sign the user in
                // else, show that the email or password is not correct
                axios
                    .get("/user", {
                        params: {
                            email: email,
                        },
                    })
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        const isPasswordValid =
                            password !== "" && password.length >= 8;
                        if (!isPasswordValid) {
                            setErrorMessagePassword(
                                "The email adress or the password is not correct."
                            );
                        } else {
                            // Connect the user

                            // And go to the landing page
                            navigate("/");
                        }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                        setErrorMessagePassword(
                            "The email adress or the password is not correct."
                        );
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
    */

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
                    errorMessage={!errorMessagePassword}
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
