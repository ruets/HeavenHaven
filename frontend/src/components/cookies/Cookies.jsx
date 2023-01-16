import "./Cookies.scss";

export function Cookies() {
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
                <button>Accept</button>
                <button>Reject</button>
            </div>
            <a href="#">Privacy policy</a>
        </div>
    );
}