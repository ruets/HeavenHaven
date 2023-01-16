import "./ProfilePage.scss";
import RemoveCookie from "../../hooks/cookies/removeCookie";
import UserProfile from "../../assets/img/user-profile.svg";
import { useState, useContext, useCallback } from "react";
import AccountSettings from "../../components/profile/AccountSettings/AccountSettings";
import DashBoard from "../../components/profile/DashBoard/DashBoard";
import ExitIcon from "../../assets/img/exit-icon.svg";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
    const loginContext = useContext(LoginContext);

    const navigate = useNavigate();

    const [isAccountSettings, setIsAccountSettings] = useState(true);

    const handleLogOut = useCallback(() => {
        RemoveCookie("userToken");
        loginContext.setIsUserLoggedIn(false);
        navigate("/");
    });

    let elementToShow = <AccountSettings />;

    if (isAccountSettings) {
        elementToShow = <AccountSettings />;
    } else {
        elementToShow = <DashBoard />;
    }

    return (
        <div className="profil">
            <aside>
                <img src={UserProfile} alt="User profile" className="user" />
                <h1 className="welcome"> Welcome, [Jeff] </h1>
                <p> Affiliation code : [R165IBF963DSF]</p>
                <button
                    className="account"
                    onClick={(e) => setIsAccountSettings(true)}
                >
                    Account settings
                </button>
                <button
                    className="dashBoard"
                    onClick={(e) => setIsAccountSettings(false)}
                >
                    Dashboard
                </button>
                <ul>
                    <li>
                        <a>My islands</a>
                    </li>
                    <li>
                        <a>My listings</a>
                    </li>
                    <li>
                        <a>Watchlist</a>
                    </li>
                    <li>
                        <a>My past auctions</a>
                    </li>
                    <li>
                        <a> My agents</a>
                    </li>
                    <li className="lastLink">
                        <a>Sponsored parties</a>
                    </li>
                </ul>
                <button className="logOut" onClick={handleLogOut}>
                    <img src={ExitIcon} alt="Exit" className="exit" /> Log out
                </button>
            </aside>
            <div className="elementToShow">{elementToShow}</div>
        </div>
    );
}
