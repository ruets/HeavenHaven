import "./IndexPage.scss";
import MainImage from "../../assets/img/index-main-img.jpg";
import IslandCard from "../../components/card/IslandCard";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import config from '../../config/config.json'

export function IndexPage() {
    const [trendingIslands, setTrendingIslands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorThrown, setIsErrorThrown] = useState(false);

    const getTrendingIslands = async () => {
        try {
            let res = await axios.get(config.serverAdress + "/api/islands/trends");
            const data = res.data;
            const islands = data.map((island) => {
                return <IslandCard key={island.id} id={island.id} name={island.name} country={island.country}/>;
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
        return <h1>Is loading</h1>;
    }

    return (
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
    );
}
