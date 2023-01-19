import { useEffect, useState, useContext, useCallback, useRef} from "react";
import ReactDOM from "react-dom";
import { LoginContext } from "../../../App";
import axios from 'axios'
import GetCookie from "../../../hooks/cookies/getCookie"
import config from "../../../config/config.json"
import "./DashBoard.scss";


function DashBoard() {
    const [userIslands, setUserIslands] = useState({});

    const loginContext = useContext(LoginContext);

    let userToken = "";

    if (GetCookie("userToken") !== undefined) {
        userToken = GetCookie("userToken");
    } else {
        userToken = loginContext.userToken;
    }

    const getUserIslands = useCallback(
      (data) => {
        const islands = data.map((island => {
            return (
                <IslandCard
                        key={island.id}
                        id={island.id}
                        name={island.name}
                        country={island.country}
                    />
            )
        }))
      },
      [],
    )
    

    const getUserData = async () => {
        try {
            const res = await axios.get(config.serverAdress + "/api/user/getProfile/" + userToken)
            console.log(res.data);
            getUserIslands(res.data.userIslands);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div className="dashboard">
            <div id="dashboard-sections">
                <h3 id="my-islands">My islands</h3>
                <h3 id="my-listings">My listings</h3>
                <h3 id="watchlist">Watchlist</h3>
                <h3 id="my-past-auctions">My past auctions</h3>
                <h3 id="my-agents">My agents</h3>
                <h3 id="sponsored-parties">Sponsored parties</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
            </div>
        </div>
    );

}

export default DashBoard;