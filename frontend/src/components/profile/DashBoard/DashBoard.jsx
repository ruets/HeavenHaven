import { useEffect, useState, useContext } from "react";
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
      [second],
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
            <div className="my-islands">

            </div>
        </div>
    );
}

export default DashBoard;