import React, { useState, useCallback, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.scss";
import Input from "../../fields/Input/Input";
import ArrowIcon from "../../../assets/img/right-arrow.svg";

export function ContactForm() {
    const form = useRef(null);

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

    const sendEmail = async (e) => {
        e.preventDefault();
        validateEmailFieldValue();
        if (errorMessageEmail === "") {
            console.log("Sending Email");

            try {
                const res = await emailjs.sendForm(
                    "service_jzu7peu",
                    "template_kvrfwzk",
                    form.current,
                    "4L1rLxiOGSbrS-xqJ"
                );
                console.log(res.text);
            } catch (error) {
                console.log(console.log(error));
            }
        }
    };

    return (
        <form ref={form} className="contact" onSubmit={sendEmail}>
            <h1> Contact Us</h1>
            <p>Get in touch and let us know how we can help</p>
            <div className="fields">
                <div className="inputs-1">
                    <Input
                        type="text"
                        name="user_name"
                        label="Name"
                        value={name}
                        setInput={setName}
                    ></Input>
                    <Input
                        type="email"
                        name="user_email"
                        label="E-mail"
                        value={email}
                        errorMessage={errorMessageEmail}
                        onBlur={validateEmailFieldValue}
                        setInput={setEmail}
                    ></Input>
                </div>
                <Input
                    type="text"
                    name="topic"
                    label="Topic"
                    value={topic}
                    setInput={setTopic}
                ></Input>
                <Input
                    type="text"
                    name="message"
                    label="Your message"
                    value={message}
                    setInput={setMessage}
                ></Input>
            </div>
            <button type="submit" className="cta">
                Send Message
                <img src={ArrowIcon} alt="" />{" "}
            </button>
        </form>
    );
}
