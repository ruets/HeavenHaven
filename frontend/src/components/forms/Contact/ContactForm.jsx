import React, { useState, useCallback } from "react";
import "./ContactForm.scss";
import Input from "../../fields/Input/Input";
import ArrowIcon from "../../../assets/img/right-arrow.svg";

export function ContactForm() {

        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [topic, setTopic] = useState("");
        const [message, setMessage] = useState("");
        const [errorMessageEmail, setErrorMessageEmail] = useState("");

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
                        postData();
                    }
                },
                [
                    validateEmailFieldValue,
                    errorMessageEmail,
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
                        label="E-mail"
                        value={email}
                        errorMessage={errorMessageEmail}
                        onBlur={validateEmailFieldValue}
                        setInput={setEmail}>
                </Input>
                </div>
                <Input type="text"
                        name="topic"
                        label="Topic"
                        value={topic}
                        setInput={setTopic}>
                </Input>
                <Input type="text"
                        name="message"
                        label="Your message"
                        value={message}
                        setInput={setMessage}>
                </Input>
            </div>
            <button type="submit" className="cta"> <p>Send Message</p> <img src={ArrowIcon} alt="" /> </button>
        </form>
);
}
