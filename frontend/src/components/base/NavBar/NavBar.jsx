import "./NavBar.scss";
import { Link } from "react-router-dom";

export function NavBar() {
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
        </nav>
    );
}
