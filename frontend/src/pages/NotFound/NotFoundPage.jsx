import { useNavigate } from "react-router-dom";
import ErrorIcon from "../../assets/img/cancel-icon.svg";
import "./NotFoundPage.scss";

export function NotFoundPage() {
    const navigate = useNavigate();

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
                    <button className="cta" onClick={() => navigate("/")}>
                        Go To Home Page
                    </button>
                </div>
            </div>
        </div>
    );
}
