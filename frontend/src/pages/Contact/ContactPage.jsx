import "./ContactPage.scss";
import ContactImage from "../../assets/img/contact-img.png";
import { ContactForm } from "../../components/forms/Contact/ContactForm";

export function ContactPage() {
    return (
        <div className="contact">
            <div className="content">
                <ContactForm></ContactForm>
                <img
                    src={ContactImage}
                    alt="IslandSunShine"
                    className="contact-img"
                />
            </div>
        </div>
    );
}
