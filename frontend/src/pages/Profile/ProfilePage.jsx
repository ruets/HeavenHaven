import "./ProfilePage.scss";
import UserProfile from "../../assets/img/user-profile.svg";

export function ProfilePage() {



    return (
        <div className="profil">
            <aside> 
                <img src={ UserProfile} alt="User profile" />
                <h2 className="welcome"> Welcome, [Jeff] </h2>
                <p> Affiliation code : R165IBF963DSF</p>
                <h2 className="accountSettings"> Account settings </h2>
                <ul>
                    <li></li>
                </ul>
            </aside>
            <div></div>
        </div>
    );
}