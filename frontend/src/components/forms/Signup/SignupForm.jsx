// React, Components
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../fields/Input/Input";

// Icons
import EmailLogo from "../../../assets/img/email-icon.svg";
import PasswordLogo from "../../../assets/img/lock-icon.svg";
import PhoneIcon from "../../../assets/img/phone-icon.svg";

// Style
import "./SignupForm.scss";

export function SignupForm() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const onSubmitForm = useCallback(() => {
        console.log("Data verification");
        console.log("Post user data to API");
    });

    const handleSignup = useCallback(() => {
        onSubmitForm();
        navigate("/");
    });

    const handleFillInMoreInfo = useCallback(() => {
        onSubmitForm();
        navigate("/signup/fill");
    });

    return (
        <form className="signup" method="post" onSubmit={onSubmitForm}>
            <div className="form-steps">
                <span className="ball-filled"></span>
                <span className="line"></span>
                <span className="ball-unfilled"></span>
            </div>
            <h1>Sign Up</h1>
            <p className="description">
                Creating an account allows you to view auction results, discover
                more, stay up to date and manage your activity.
            </p>
            <div className="names">
                <Input
                    name="first-name"
                    type="text"
                    value={firstName}
                    label="First Name"
                    setInput={setFirstName}
                ></Input>
                <Input
                    name="last-name"
                    type="text"
                    value={lastName}
                    label="Last Name"
                    setInput={setLastName}
                ></Input>
            </div>
            <Input
                type="email"
                name="email"
                label="Email"
                icon={EmailLogo}
                value={email}
                setInput={setEmail}
            ></Input>
            <Input
                type="password"
                name="password"
                label="Password"
                icon={PasswordLogo}
                value={password}
                setInput={setPassword}
            ></Input>
            <Input
                type="password"
                name="confirm-password"
                label="Confirm Password"
                icon={PasswordLogo}
                value={confirmedPassword}
                setInput={setConfirmedPassword}
            ></Input>
            <Input
                type="text"
                name="phone-number"
                label="Phone Number"
                icon={PhoneIcon}
                value={phoneNumber}
                setInput={setPhoneNumber}
            ></Input>
            <div className="buttons">
                <button onClick={handleSignup}>Sign Up Now</button>
                <button onClick={handleFillInMoreInfo}>
                    Fill In More Info
                </button>
            </div>
            <p className="have-account">
                Already have an account ? <Link to={"/login"}>Log in</Link>
            </p>
        </form>
    );
}
