import "./Cookies.scss";
import SetCookie from "../../hooks/cookies/setCookie";
import { CookiesContext } from "../../App";
import { useContext } from "react";
import { useCallback } from "react";
import PrivacyPolicyPDF from "../../assets/documents/Privacy-policy-Heaven-Haven.pdf";

export function Cookies(props) {

    const cookiesContext = useContext(CookiesContext);

    const handleAccept = useCallback(() => {
        SetCookie("cookieAccepted", true);
        props.onClick()
        cookiesContext.setIsCookiesClicked(true);
        cookiesContext.setIsCookiesAccepted(true);
    })

    const handleReject = useCallback(() => {
        props.onClick()
        cookiesContext.setIsCookiesClicked(true);
        cookiesContext.setIsCookiesAccepted(false);
    });

    return (
        <div className="cookies">
            <h2>Cookie consent</h2>
             <p>This website uses cookies to ensure you get the best browsing experience. 
                Cookies allow you to stay connected anytime you browse the website for
                 24 hours following your first connection. By clicking "Accept", you 
                 consent to the use and storage of your personal data. Check our
                  privacy policy to learn more.
             </p>
             <div className="buttons">
                <button onClick={handleAccept}>Accept</button>
                <button onClick={handleReject}>Reject</button>
            </div>
            <a href={PrivacyPolicyPDF} target="_blank">Privacy policy</a>
        </div>
    );
}