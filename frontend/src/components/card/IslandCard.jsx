import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../App";
import axios from "axios";
import config from "../../config/config.json";
import GetCookie from "../../hooks/cookies/getCookie";
import "./IslandCard.scss";

function IslandCard(props) {
    const loginContext = useContext(LoginContext);

    const onDeleteIsland = async () => {
        var result = confirm("Want to delete?");
        if (result) {
            // get the current user token
            let currentUserToken = "";
            if (GetCookie("userToken") !== undefined) {
                currentUserToken = GetCookie("userToken");
            } else {
                currentUserToken = loginContext.userToken;
            }
            try {
                // set the headers
                const headers = {
                    headers: { Authorization: `Bearer ${currentUserToken}` },
                };
                // send the delete request
                const res = await axios.post(
                    config.serverAddress + "/api/islands/delete",
                    { id: props.id },
                    headers
                );
                window.location.reload();
                console.log(res.data);
            } catch (error) {
                console.error(error);
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="island-card">
            {props.userIsland ? (
                <div className="title">
                    <h4>{props.name}</h4>
                    <button onClick={() => onDeleteIsland()}>-</button>
                </div>
            ) : (
                <h4>{props.name}</h4>
            )}
            <img src={props.image} alt="" />
            <p>{props.description}</p>
            <div className="buttons">
                <Link to={"/island/" + props.id}>
                    <button className="cta">See More</button>
                </Link>
                <Link to={"/bidding/" + props.id}>
                    <button className="cta">Join The Auction</button>
                </Link>
            </div>
        </div>
    );
}

export default IslandCard;
