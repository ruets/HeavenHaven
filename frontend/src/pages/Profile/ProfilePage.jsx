import "./ProfilePage.scss";
import GetCookie from "../../hooks/cookies/getCookie";
import RemoveCookie from "../../hooks/cookies/removeCookie";
import UserProfile from "../../assets/img/user-profile.svg";
import { useState, useContext, useCallback } from "react";
import AccountSettings from "../../components/profile/AccountSettings/AccountSettings";
import DashBoard from "../../components/profile/DashBoard/DashBoard";
import ReactLoading from 'react-loading';
import ExitIcon from "../../assets/img/exit-icon.svg";
import { LoginContext } from "../../App";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useEffect } from "react";
import config from "../../config/config.json"
import axios from "axios";

export function ProfilePage() {
    const loginContext = useContext(LoginContext);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    const [isAccountSettings, setIsAccountSettings] = useState(true);
    const [accountData, setAccountData] = useState({})

    const getAccountData = async () => {
        let currentUserToken = "";
        if (GetCookie("userToken") !== undefined) {
            currentUserToken = GetCookie("userToken");
        } else {
            currentUserToken = loginContext.userToken;
        }
        try {
            const headers = {
                headers: { Authorization: `Bearer ${currentUserToken}` }
            }
            const res = await axios.get(config.serverAddress + "/api/user/getProfile", headers);
            console.log(res.data);
            setAccountData(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAccountData();
    }, [])

    const handleLogOut = useCallback(() => {
        RemoveCookie("userToken");
        loginContext.setIsUserLoggedIn(false);
        navigate("/");
    });

    let elementToShow;

    if (isLoading) {
        return (
            <div className="loading">
                <h1> Loading ... </h1>
                <ReactLoading type={"spin"} color={"#3A3A3A"} height={200} width={200} />
            </div>
            ) 
    } else {
        if (isAccountSettings) {
            elementToShow = <AccountSettings data={accountData}/>;
        } else {
            elementToShow = <DashBoard />;
        }
    
        return (
            <div className="profil">
                <aside>
                    <img src={UserProfile} alt="User profile" className="user" />
                    <h1 className="welcome"> Welcome, {accountData.firstName + " " + accountData.lastName} </h1>
                    <p> Affiliation code : </p>
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
}
