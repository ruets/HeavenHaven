import "./Cookies.scss";
import SetCookie from "../../hooks/cookies/setCookie";
import { CookiesContext } from "../../App";
import { useContext, useRef } from "react";
import { useCallback } from "react";
import PrivacyPolicyPDF from "../../assets/documents/Privacy-policy-Heaven-Haven.pdf";
import TermsConditionsPDF from "../../assets/documents/Terms-and-conditions-of-use-of-Heaven-Haven-website.pdf";

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
        <form className="cookies" onSubmit={handleAccept}>
            <h2>Cookie consent</h2>
            <p>This website uses cookies to ensure you get the best browsing experience. 
                We exclusively use functionality cookies that allow you to stay connected 
                anytime you browse the website for 24 hours following your first connection. 
                Please note that our payment system is based on PayPal API, which may generate 
                third party cookies. By clicking "Accept", you consent to the use and storage of 
                your personal data. Check our privacy policy to learn more.
            </p>

            <div className="checkbox">
                    <input
                        type="checkbox"
                        name="accept-privacy"
                        className="checkbox"
                        required
                    />
                    <label htmlFor="accept-privacy" className="checkbox">
                        I have read and agree to the <a href={PrivacyPolicyPDF} target="_blank">Privacy Policy</a>, and heavenhaven.com <a href={TermsConditionsPDF} target="_blank">Terms of Services.</a>
                    </label>        
                </div> 

            <div className="buttons">
                <button type="submmit">Accept</button>
                <button onClick={handleReject}>Reject</button>
            </div>
        </form>
    );
}