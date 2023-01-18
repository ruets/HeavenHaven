import "./IndexPage.scss";
import { Cookies } from "../../components/cookies/Cookies";
import MainImage from "../../assets/img/index-main-img.jpg";
import IslandCard from "../../components/card/IslandCard";
import { CookiesContext } from "../../App";
import GetCookie from "../../hooks/cookies/getCookie";
import axios from "axios";
import { useEffect, useCallback } from "react";
import { useState } from "react";
import config from "../../config/config.json";
import { useContext } from "react";
import ReactLoading from 'react-loading';
import { useRef } from "react";

export function IndexPage() {
    const [trendingIslands, setTrendingIslands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorThrown, setIsErrorThrown] = useState(false);

    const cookiesContext = useContext(CookiesContext);

    const refToCookieGreyDiv = useRef(null);

    const handleCookieClick = useCallback(() => {
        refToCookieGreyDiv.current.style.display = "none"
        document.body.style.overflowY = "auto"
    })

    function showCookie() {
        if (!GetCookie("cookieAccepted") && !cookiesContext.isCookiesClicked) {
            return (<div className="cookie-grey" ref={refToCookieGreyDiv}><Cookies onClick={handleCookieClick}/></div>)
        }
    }

    const getTrendingIslands = async () => {
        try {
            let res = await axios.get(
                config.serverAddress + "/api/islands/trends"
            );
            const data = res.data;
            const islands = data.map((island) => {
                return (
                    <IslandCard
                        key={island.id}
                        id={island.id}
                        name={island.name}
                        description={island.description}
                        image={island.mainImg}
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
        if (!GetCookie("cookieAccepted") && !cookiesContext.isCookiesClicked) {
            document.body.style.overflowY = "hidden";
        }
        getTrendingIslands();
    }, []);

    if (isErrorThrown) {
        return <h1>Please excuse us, an error occured.</h1>;
    } else if (isLoading) {
        return (
        <div className="loading">
            <h1> Loading ... </h1>
            <ReactLoading type={"spin"} color={"#3A3A3A"} height={200} width={200} />
        </div>
        )
    }

    return (
        <>
        <div className="index">
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
            {showCookie()}
        </>
    );
}
