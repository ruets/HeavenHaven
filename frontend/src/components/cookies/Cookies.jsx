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
        // Set the cookieAccepted to true for 365 days. This is a boolean value.
        SetCookie("cookieAccepted", true);
        // Call the onClick event that is passed into the component as a prop.
        props.onClick()
        // Set the state of the isCookiesClicked to true. This is a boolean value.
        cookiesContext.setIsCookiesClicked(true);
        // Set the state of the isCookiesAccepted to true. This is a boolean value.
        cookiesContext.setIsCookiesAccepted(true);
    })

    const handleReject = useCallback(() => {
        // Set the state of the isCookiesClicked to true. This is a boolean value.
        cookiesContext.setIsCookiesClicked(true);
        // Set the state of the isCookiesAccepted to true. This is a boolean value.
        cookiesContext.setIsCookiesAccepted(false);
    })

    // This is a custom hook that will be used to store the value of the cookie policy
// in local storage. It takes the initial value as an argument and returns the
// current value of the cookie policy and a function that can be used to update
// the value of the cookie policy.
const useLocalStorage = initialValue => {
    // Use the useState hook to store the value of the cookie policy in state.
    const [value, setValue] = useState(initialValue);

    // The useEffect hook is used to run a function when the component is first
    // mounted and when the value of the cookie policy stored in state changes.
    useEffect(() => {
        // Try to retrieve the value of the cookie policy from local storage.
        const storedValue = window.localStorage.getItem('cookiePolicy');

        // If the value of the cookie policy is stored in local storage, use that
        // value to update the value of the cookie policy in state.
        if (storedValue) {
            setValue(storedValue);
        // If the value of the cookie policy is not stored in local storage, store
        // the initial value of the cookie policy in local storage.
        } else {
            window.localStorage.setItem('cookiePolicy', initialValue);
        }
    }, []);

    // Return the current value of the cookie policy and a function that can be
    // used to update the value of the cookie policy.
    return [value, setValue];
};

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