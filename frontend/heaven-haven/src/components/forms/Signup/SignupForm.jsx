import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Input from "../../fields/Input/Input";
import EmailLogo from "../../../assets/img/email-icon.svg";
import PasswordLogo from "../../../assets/img/lock-icon.svg";
import PhoneIcon from "../../../assets/img/phone-icon.svg";
import "./SignupForm.scss";

export function SignupForm(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const onSubmitForm = useCallback(() => {
        // TODO
    });

    return (
        <form className="signup" onSubmit={onSubmitForm}>
            <div className="form-steps">
                <span className="ball-1"></span>
                <span className="line"></span>
                <span className="ball-1"></span>
            </div>
            <h1>Sign Up</h1>
            <p>
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
                type="text"
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
                <button type="submit" value="sign-up">
                    Sign Up Now
                </button>
                <button type="submit" value="fill">
                    Fill In More Info
                </button>
            </div>
            <p>
                Already have an account ? <Link to={"/login"}>Log in</Link>
            </p>
        </form>
    );
}
