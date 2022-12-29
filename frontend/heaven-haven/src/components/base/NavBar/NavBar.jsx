import "./NavBar.scss";
import { Link } from "react-router-dom";

export function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/islands">Islands</Link>
                </li>
                <li>
                    <Link to="/sell">Sell</Link>
                </li>
                <li>
                    <Link to="/contact">Contact Us</Link>
                </li>
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
