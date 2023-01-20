import "./LoginForm.scss";
import React, { useState, useCallback, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../fields/Input/Input";
import GetCookie from "../../../hooks/cookies/getCookie";
import SetCookie from "../../../hooks/cookies/setCookie";
import EmailLogo from "../../../assets/img/email-icon.svg";
import PasswordLogo from "../../../assets/img/lock-icon.svg";
import config from "../../../config/config.json";
import { LoginContext } from "../../../App";

/**
 * responsability: handle login,
 */
export function LoginForm() {
    const loginContext = useContext(LoginContext);

    const navigate = useNavigate();

    // Email input field
    const [email, setEmail] = useState("");

    // Password input field
    const [password, setPassword] = useState("");

    // Error message for email input field
    const [errorMessageEmail, setErrorMessageEmail] = useState("");

    // Error message for password input field
    const [errorMessagePassword, setErrorMessagePassword] = useState("");

    const validateEmailFieldValue = useCallback(() => {
        // Email address pattern
        const isEmailInputValid =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (!isEmailInputValid) {
            // Set error message
            setErrorMessageEmail("The email adress format is not correct.");
        } else {
            setErrorMessageEmail("");
        }
    }, [setErrorMessageEmail, email]);

    const postData = async () => {
        try {
            // send a POST request to the server with the user's email and password
            let res = await axios.post(
                config.serverAddress + "/api/auth/login",
                {
                    email: email,
                    password: password,
                }
            );

            // handle success
            setErrorMessagePassword("");
            loginContext.setIsUserLoggedIn(true);
            if (GetCookie("cookieAccepted")) {
                SetCookie("userToken", res.data.token);
            } else {
                loginContext.setUserToken(res.data.token);
            }
            navigate("/");
        } catch (error) {
            // handle error
            // if the server responds with an error, show that error
            error.response ? setErrorMessagePassword(error.response.data.error) : console.log(error);
        }
    };

    const onSubmitForm = useCallback(
        (e) => {
            // Prevent the default action of the submit event and stop it from bubbling
            e.preventDefault();
            // Validate the email field value
            validateEmailFieldValue();
            // If the error message for the email is empty
            if (errorMessageEmail === "") {
                // Log a message to the console
                console.log("Trying to connect");
                // Call the function that posts the data
                postData();
            }
        },
        [
            // Add the variables that are used in the callback function
            // This will make sure that the callback function is called only
            // if one of those variables changes
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
                        className="email"
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
                        className="password"
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
            <button type="submit" className="cta">
                Sign In
            </button>
            <p className="no-account">
                No account yet ? <Link to={"/signup"}>Sign up here</Link>
            </p>
        </form>
    );
}
