import React, { useState, useCallback } from "react";
import "./ContactForm.scss";
import Input from "../../fields/Input/Input";
import ArrowIcon from "../../../assets/img/right-arrow.svg";

export function ContactForm() {

        const [name, setName] = useState("");

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
        <form className="contact" onSubmit={onSubmitForm}>
            <h1> Contact Us</h1>
            <p>Get in touch and let us know how we can help</p>
            <div className="fields">
                <div className="inputs-1">
                <Input type="text"
                        name="name"
                        label="Name"
                        value={name}
                        setInput={setName}>
                </Input>
                <Input type="email"
                        name="email"
                        label="E-mail">
                </Input>
                </div>
                <Input type="text"
                        name="topic"
                        label="Topic">
                </Input>
                <Input type="text"
                        name="message"
                        label="Your message">
                </Input>
            </div>
            <button type="submit" className="cta"> <p>Send Message</p> <img src={ArrowIcon} alt="" /> </button>
        </form>
);
}
