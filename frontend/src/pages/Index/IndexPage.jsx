import "./IndexPage.scss";
import MainImage from "../../assets/img/index-main-img.png";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export function IndexPage() {
    const [trendingIslands, setTrendingIslands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorThrown, setIsErrorThrown] = useState(false);

    const getTrendingIslands = async () => {
        try {
            let res = await axios.get("https://reqr");
            const data = res.data.data;
            const islands = data.map((island) => {
                return (
                    <div key={island.id}>
                        {island.id} : {island.email}
                    </div>
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
            <div className="section">
                <h2>Trending</h2>
                <div className="islands">{trendingIslands}</div>
            </div>
        </div>
    );
}
