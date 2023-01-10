import "./ContactForm.scss";
import Input from "../../fields/Input/Input";

export function ContactForm() {
    return (
        <form className="contact">
            <h1> Contact Us</h1>
            <p>Get in touch and let us know how we can help</p>
            <div className="fields">
                <div className="inputs-1">
                <Input type="name"
                        name="name"
                        label="Name">
                </Input>
                <Input type="email"
                        name="email"
                        label="E-mail">
                </Input>
                </div>
                <Input type="topic"
                        name="topic"
                        label="Topic">
                </Input>
                <Input type="messag"
                        name="message"
                        label="Your message">
                </Input>
            </div>
            <button type="submit">Send Message</button>
        </form>
);
}
