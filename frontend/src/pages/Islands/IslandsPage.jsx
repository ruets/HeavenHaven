import "./IslandsPage.scss"; 
import MainImage from "../../assets/img/index-main-img.jpg";
import IslandCard from "../../components/card/IslandCard";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


export function IslandsPage() {
    const [allIslands, setAllIslands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorThrown, setIsErrorThrown] = useState(false);

    const getAllIslands = async () => {
        try {
            // TODO Change URL to our API
            let res = await axios.get("https://reqres.in/api/users?page=2");
            const data = res.data.data;
            const islands = data.map((island) => {
                return <IslandCard key={island.id} />;
            });
            setAllIslands(islands);
            setIsLoading(false);
        } catch (error) {
            setIsErrorThrown(true);
        }
    };

    useEffect(() => {
        getAllIslands();
    }, []);

    if (isErrorThrown) {
        return <h1>Please excuse us, an error occured.</h1>;
    } else if (isLoading) {
        return <h1>Is loading</h1>;
    }

    return (
        <div className="islands">
             <button type="submit" className="button"> <p>Filter</p></button>
            <div>
                <h2>Islands</h2>
                <div className="islands">{allIslands}</div>
            </div>
        </div>
    );
}