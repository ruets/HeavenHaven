import "./ProfilePage.scss";
import UserProfile from "../../assets/img/user-profile.svg";
import { useState } from "react";
import AccountSettings from "../../components/profile/AccountSettings/AccountSettings";
import DashBoard from "../../components/profile/DashBoard/DashBoard";

export function ProfilePage() {

    const [isAccountSettings, setIsAccountSettings] = useState(true);
    let elementToShow = <AccountSettings/>
    
    

    if (isAccountSettings) {
        elementToShow = <AccountSettings/>
    } else {
        elementToShow = <DashBoard/>
    }

    return (
        <div className="profil">
            <aside> 
                <img src={ UserProfile} alt="User profile" />
                <h2 className="welcome"> Welcome, [Jeff] </h2>
                <p> Affiliation code : [R165IBF963DSF]</p>
                <button className="bigButton" onClick={e => setIsAccountSettings(true)}> Account settings </button>
                <button className="bigButton" onClick={e => setIsAccountSettings(false)} > Dashboard </button>
                <ul>
                    <li> <button className="lilButton"> My islands </button> </li>
                    <li> <button className="lilButton"> My listings </button> </li>
                    <li> <button className="lilButton"> Watchlist </button> </li>
                    <li> <button className="lilButton"> My past auctions </button> </li>
                    <li> <button className="lilButton"> My agents </button> </li>
                    <li> <button className="lilButton"> Sponsored parties </button> </li>
                </ul>
            </aside>
            <div>
                {elementToShow}
            </div>
        </div>
    );
}