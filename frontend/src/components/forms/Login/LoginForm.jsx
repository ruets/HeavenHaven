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

    const postData = async () => {
        try {
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
            error.response ? setErrorMessagePassword(error.response.data.error) : console.log(error);
        }
    };

    const onSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            validateEmailFieldValue();
            if (errorMessageEmail === "") {
                console.log("Trying to connect");
                postData();
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
