import "./ProfilePage.scss";
import GetCookie from "../../hooks/cookies/getCookie";
import RemoveCookie from "../../hooks/cookies/removeCookie";
import UserProfile from "../../assets/img/user-profile.svg";
import { useState, useContext, useCallback } from "react";
import AccountSettings from "../../components/profile/AccountSettings/AccountSettings";
import DashBoard from "../../components/profile/DashBoard/DashBoard";
import ReactLoading from "react-loading";
import ExitIcon from "../../assets/img/exit-icon.svg";
import { LoginContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import config from "../../config/config.json";
import axios from "axios";

export function ProfilePage() {
    const loginContext = useContext(LoginContext); // Gets the value of the LoginContext variable

    const navigate = useNavigate(); // Provides a function to navigate to a different URL

    const [isLoading, setIsLoading] = useState(true); // Sets the isLoading state to true
    const [isAccountSettings, setIsAccountSettings] = useState(true); // Sets the isAccountSettings state to true
    const [accountData, setAccountData] = useState({}); // Sets the accountData state to an empty object

    const getAccountData = async () => {
    // Check for a valid user token in the cookie
    let currentUserToken = "";
    if (GetCookie("userToken") !== undefined) {
        currentUserToken = GetCookie("userToken");
    } else {
        currentUserToken = loginContext.userToken;
    }

    // Create the request headers
    try {
        const headers = {
            headers: { Authorization: `Bearer ${currentUserToken}` },
        };

        // Make the request to the server
        const res = await axios.get(
            config.serverAddress + "/api/user/getProfile",
            headers
        );

        // Display the returned data
        console.log(res.data);
        setAccountData(res.data);
        setIsLoading(false);
    } catch (error) {
        console.log(error);
    }
};

        // Call getAccountData() on component mount.
    useEffect(() => {
        getAccountData();
    }, []);

    const handleLogOut = useCallback(() => {
        RemoveCookie("userToken");
        loginContext.setIsUserLoggedIn(false);
        navigate("/");
    });

    // Store a reference to the dashboard element.
    const dashboardElement = useRef(null);

    // Scroll to the dashboard element when the scroll button is clicked.
    const handleClickScroll = () => {
        if (dashboardElement) {
            dashboardElement.current.scrollIntoView(true, {
                behavior: "smooth",
            });
        }
    };

    let elementToShow;

    if (isLoading) {
        return (
            <div className="loading">
                <h1> Loading ... </h1>
                <ReactLoading
                    type={"spin"}
                    color={"#3A3A3A"}
                    height={200}
                    width={200}
                />
            </div>
        );
    } else {
        if (isAccountSettings) {
            elementToShow = <AccountSettings data={accountData} />;
        } else {
            elementToShow = <DashBoard data={accountData} />;
        }

        return (
            <div className="profil">
                <aside>
                    <img
                        src={UserProfile}
                        alt="User profile"
                        className="user"
                    />
                    <h1 className="welcome">
                        {" "}
                        Welcome,{" "}
                        {accountData.firstName +
                            " " +
                            accountData.lastName}{" "}
                    </h1>
                    <p>
                        {" "}
                        Affiliation code : {accountData.customer.sponsorCode}
                    </p>
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
                            <a>My listings</a>
                        </li>
                        <li>
                            <a onClick={handleClickScroll}>Watchlist</a>
                        </li>
                        <li>
                            <a> My agents</a>
                        </li>
                        <li className="lastLink">
                            <a>Sponsored parties</a>
                        </li>
                    </ul>
                    <button className="logOut" onClick={handleLogOut}>
                        <img src={ExitIcon} alt="Exit" className="exit" /> Log
                        out
                    </button>
                </aside>
                <div className="elementToShow">{elementToShow}</div>
            </div>
        );
    }
}
