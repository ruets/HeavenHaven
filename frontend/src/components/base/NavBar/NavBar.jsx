import "./NavBar.scss";
import { Link } from "react-router-dom";
import { LoginContext } from "../../../App";
import { useContext } from "react";
import UserIcon from "../../../assets/img/user-icon-unfilled.svg";

export function NavBar() {
    const loginContext = useContext(LoginContext);

    return (
        <nav>
            <ul className="links">
                <li>
                    <Link to="/islands">Islands</Link>
                </li>
                <li>
                    <Link to="/sell">Sell Your Island</Link>
                </li>
                <li>
                    <Link to="/contact">Contact Us</Link>
                </li>
            </ul>
            {loginContext.isUserLoggedIn === true ? (
                <Link to={"/profile"} className="user">
                    <img src={UserIcon} alt="" />
                </Link>
            ) : (
                <ul className="buttons">
                    <li>
                        <Link to="/login" className="btn-1">
                            Log In
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup" className="btn-2">
                            Sign Up
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}
