import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Input from "../../fields/Input/Input";
import "./SignupForm.scss";

export function SignupForm(props) {
    const onSubmitForm = useCallback(() => {
        console.log("Super");
    });

    return (
        <form className="signup" onSubmit={onSubmitForm}>
            <h1>Signup</h1>
            <p>
                Already have an account ? <Link to={"/login"}>Log in</Link>
            </p>
        </form>
    );
}
