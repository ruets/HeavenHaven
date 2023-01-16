import { Link } from "react-router-dom";
import ErrorIcon from "../../assets/img/cancel-icon.svg";
import "./ForbiddenPage.scss";

export function ForbiddenPage() {
    return (
        <div className="forbidden">
            <div className="content">
                <div className="left">
                    <img src={ErrorIcon} alt="" />
                </div>
                <div className="right">
                    <h1>Forbidden</h1>
                    <p>
                        You must be connected to access this page. Please Log In to continue
                    </p>
                    <Link to="/login">
                        <button className="cta">
                            Log In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
