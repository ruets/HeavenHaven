import "./ContactForm.scss";
import Input from "../../fields/Input/Input";

export function ContactForm() {
    return (
        <form className="contact">
            <h1> Contact Us</h1>
            <p>Get in touch and let us know how we can help</p>
            <div className="fields">
                <div className="inputs-1"></div>
                <Input type="email"
                        name="email"
                        label="Email">
                </Input>
                <Input>
                </Input>
            </div>
        </form>
);
}
