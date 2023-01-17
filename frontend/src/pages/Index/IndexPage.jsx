import "./IndexPage.scss";
import { Cookies } from "../../components/cookies/Cookies";
import MainImage from "../../assets/img/index-main-img.jpg";
import IslandCard from "../../components/card/IslandCard";
import { CookiesContext } from "../../App";
import GetCookie from "../../hooks/cookies/getCookie";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import config from "../../config/config.json";
import { useContext } from "react";
import ReactLoading from 'react-loading';

export function IndexPage() {
    const [trendingIslands, setTrendingIslands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorThrown, setIsErrorThrown] = useState(false);

    const cookiesContext = useContext(CookiesContext);

    let cookieElement = null

    if (!GetCookie("cookieAccepted") && !cookiesContext.isCookiesClicked) {
        cookieElement = <Cookies/>
    }

    const getTrendingIslands = async () => {
        try {
            let res = await axios.get(
                config.serverAdress + "/api/islands/trends"
            );
            const data = res.data;
            const islands = data.map((island) => {
                return (
                    <IslandCard
                        key={island.id}
                        id={island.id}
                        name={island.name}
                        country={island.country}
                    />
                );
            });
            setTrendingIslands(islands);
            setIsLoading(false);
        } catch (error) {
            setIsErrorThrown(true);
        }
    };

    useEffect(() => {
        getTrendingIslands();
    }, []);

    if (isErrorThrown) {
        return <h1>Please excuse us, an error occured.</h1>;
    } else if (isLoading) {
        return (
        <div className="loading">
            <h1> Loading ... </h1>
            <ReactLoading type={"spin"} color={"#3A3A3A"} height={200} width={200} />;
        </div>
        )
    }

    return (
        <div className="index">
            {cookieElement}
            <div className="section-1">
                <img src={MainImage} alt="" />
                <div className="title">
                    <h1 className="title-1">Your best</h1>
                    <h1 className="title-2">solution for</h1>
                    <h1 className="title-3">islands auctions</h1>
                </div>
            </div>
            <div className="section-2">
                <h2>Trending</h2>
                <div className="islands">{trendingIslands}</div>
            </div>
        </div>
    );
}
