import "./Footer.scss";
import Logo from "../../../assets/img/logo.png";
import InstagramLogo from "../../../assets/img/instagram.svg";
import FacebookLogo from "../../../assets/img/facebook.svg";
import PinterestLogo from "../../../assets/img/pinterest.svg";
import LinkedinLogo from "../../../assets/img/linkedin.svg";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer>
            <div className="left">
                <h3>Connect With Us</h3>
                <div className="socials">
                    <a href="https://www.instagram.com">
                        <img src={InstagramLogo} alt="" />
                    </a>
                    <a href="https://www.facebook.com">
                        <img src={FacebookLogo} alt="" />
                    </a>
                    <a href="https://www.pinterest.com">
                        <img src={PinterestLogo} alt="" />
                    </a>
                    <a href="https://www.linkedin.com">
                        <img src={LinkedinLogo} alt="" />
                    </a>
                </div>
            </div>
            <span className="line"></span>
            <div className="right">
                <div>
                    <p>© 2022-2023 Heaven Haven, All Rights Reserved.</p>
                    <p>2 Pl. Doyen Gosse, 38000 Grenoble</p>
                </div>
                <p>Terms Of Service | Privacy | Legal notice | Contacts</p>
            </div>
            <Link to="/">
                <img src={Logo} alt="Logo" />
            </Link>
        </footer>
    );
}
