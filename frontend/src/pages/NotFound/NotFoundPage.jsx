import { Link } from "react-router-dom"
import ErrorIcon from "../../assets/img/cancel-icon.svg";
import "./NotFoundPage.scss";

export function NotFoundPage() {
    return (
        <div className="not-found">
            <div className="content">
                <div className="left">
                    <img src={ErrorIcon} alt="" />
                </div>
                <div className="right">
                    <h1>Error 404</h1>
                    <p>
                        The page you're looking for does not exist. Please make
                        sure you are on the right link. You can also go to the
                        Home Page by clicking this button.
                    </p>
                    <Link to="/">
                        <button className="cta">
                            Go To Home Page
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
