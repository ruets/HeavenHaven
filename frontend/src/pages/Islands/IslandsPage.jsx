import "./IslandsPage.scss"; 
import IslandCard from "../../components/card/IslandCard";
import ChevronUpIcon from "../../assets/img/chevron-up.svg";
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
            <div className="top">
                <h2>Islands</h2>
                <button className="filter">Filter <img src={ChevronUpIcon}/></button>
                <div className="dropdown">
                    <ul>
                        <h4>Location</h4>
                        <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                        <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                        <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                    </ul>
                    <ul>
                        <h4>Price</h4>
                        <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                        <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                        <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                    </ul>
                    <ul>
                        <h4>Date</h4>
                        <li><p>More recent</p><input type="checkbox" name="Lorem"/></li>
                        <li><p>Less recent</p><input type="checkbox" name="Lorem"/></li>
                        <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                    </ul>
                </div>
            </div>
            <div className="grid">{allIslands}</div>
        </div>
    );
}