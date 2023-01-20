import React, { useState, useCallback, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.scss";
import Input from "../../fields/Input/Input";
import ArrowIcon from "../../../assets/img/right-arrow.svg";

export function ContactForm() {
    const form = useRef(null);

    // Creates a state variable called name, and a function to update it
    const [name, setName] = useState("");

    // Creates a state variable called email, and a function to update it
    const [email, setEmail] = useState("");

    // Creates a state variable called topic, and a function to update it
    const [topic, setTopic] = useState("");

    // Creates a state variable called message, and a function to update it
    const [message, setMessage] = useState("");

    // Creates a state variable called errorMessageEmail, and a function to update it
    const [errorMessageEmail, setErrorMessageEmail] = useState("");

    const validateEmailFieldValue = useCallback(() => {
        // Check if the email address fulfils the regex pattern to be valid
        const isEmailInputValid =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        // If the email address is not valid, set the error message
        if (!isEmailInputValid) {
            setErrorMessageEmail("The email adress format is not correct.");
        } else {
            // If the email address is valid, remove the error message
            setErrorMessageEmail("");
        }
    }, [setErrorMessageEmail, email]);

    //Step 1: add a new function
const sendEmail = async (e) => {
    //Step 2: prevent the default form submission
    e.preventDefault();

    //Step 3: call the function to validate the form
    validateEmailFieldValue();

    //Step 4: check if the error message is empty or not
    if (errorMessageEmail === "") {
        //Step 5: log to the console that the email is being sent
        console.log("Sending Email");

        //Step 6: try to send the email
        try {
            const res = await emailjs.sendForm(
            "service_jzu7peu",
            "template_kvrfwzk",
            form.current,
            "4L1rLxiOGSbrS-xqJ"
            );
            alert("Your email is sent !");
            setName("");
            setEmail("");
            setTopic("");
            setMessage("");
            } catch (error) {
            //Step 7: if there is an error, log the error to the console
            console.log(console.log(error));
            //Step 8: alert the user that there is an error
            alert("An error occured, please try again later");
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
                <textarea type="text"
                    name="message"
                    placeholder="Your message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" className="cta">
                Send Message
                <img src={ArrowIcon} alt="" />{" "}
            </button>
        </form>
    );
}
