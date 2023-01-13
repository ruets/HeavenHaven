import "./IslandsPage.scss"; 
import IslandCard from "../../components/card/IslandCard";
import ChevronUpIcon from "../../assets/img/chevron-up.svg";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import config from '../../config/config.json'


export function IslandsPage() {

    const [isOpen, setIsOpen] = useState(false);

    const [allIslands, setAllIslands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorThrown, setIsErrorThrown] = useState(false);

    const refToImage = useRef(null);
    const refToDropDown = useRef(null);
    
    const handleFilterClick = useCallback(() => {
        if (isOpen) {
            refToImage.current.style.rotate = "";
            refToDropDown.current.style.display = "";
            setIsOpen(false);
        } else {
            refToImage.current.style.rotate = "180deg";
            refToDropDown.current.style.display = "flex";
            setIsOpen(true);
        }
    })

    const getAllIslands = async () => {
        try {
            let res = await axios.get(config.serverAdress + "/api/islands/");
            const data = res.data;
            const islands = data.map((island) => {
                return <IslandCard key={island.id} name={island.name} country={island.country}/>;
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
                <button className="filter" onClick={handleFilterClick}>Filter <img ref={refToImage} src={ChevronUpIcon}/></button>
                <div className="dropdown" ref={refToDropDown}>
                    <div className="option-1">
                        <h4>Location</h4>
                        <ul>
                            <li><p>Africa</p><input type="checkbox" name="africa"/></li>
                            <li><p>America</p><input type="checkbox" name="america"/></li>
                            <li><p>Europe</p><input type="checkbox" name="europe"/></li>
                            <li><p>Oceania</p><input type="checkbox" name="oceania"/></li>
                        </ul>
                    </div>
                    <span className="line"></span>
                    <div className="option-2">
                    <h4>Climate</h4>
                        <ul>
                            <li><p>Tropical</p><input type="checkbox" name="tropical"/></li>
                            <li><p>Dry</p><input type="checkbox" name="dry"/></li>
                            <li><p>Temperate</p><input type="checkbox" name="temperate"/></li>
                            <li><p>Continental</p><input type="checkbox" name="continental"/></li>
                            <li><p>Polar</p><input type="checkbox" name="polar"/></li>
                        </ul>
                    </div>
                    <span className="line"></span>
                    <div className="option-3">
                        <h4>Installations</h4>
                        <ul>
                            <li><p>Accommodations</p><input type="checkbox" name="accomodations"/></li>
                            <li><p>Landing strip</p><input type="checkbox" name="landingstrip"/></li>
                            <li><p>Port</p><input type="checkbox" name="port"/></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid">{allIslands}</div>
        </div>
    );
}