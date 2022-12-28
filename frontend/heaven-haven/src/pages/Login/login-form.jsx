import React, { useState, useCallback, useEffect } from "react";
import Input from "../../components/fields/Input/input";
import EmailLogo from "../../assets/img/email-icon.svg";
import "./login-form.scss";

/**
 * responsability: handle login,
 */
export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmailFieldValid, setIsEmailFieldValid] = useState(true);
    const [isPasswordFieldValid, setIsPasswordFieldValid] = useState(true);

    const validateEmailFieldValue = useCallback(() => {
        const isEmailValueEmpty = email === "";
        setIsEmailFieldValid(!isEmailValueEmpty);
    }, [setIsEmailFieldValid, email]);

    const validatePasswordFieldValue = useCallback(() => {
        const isPasswordInvalid = password == "" || password.length < 8;
        setIsPasswordFieldValid(!isPasswordInvalid);
    }, [setIsPasswordFieldValid, password]);

    useEffect(() => {
        // on email value changed
        console.log("TEST");
    }, [email]);

    return (
        <div className="signup">
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
            <Input
                type="password"
                name="password"
                label="Password"
                value={password}
                error={!isPasswordFieldValid}
                setInput={setPassword}
                onBlur={validatePasswordFieldValue}
            ></Input>
        </div>
    );
}

export default LoginForm;
