import "./IslandsPage.scss";
import IslandCard from "../../components/card/IslandCard";
import ChevronUpIcon from "../../assets/img/chevron-up.svg";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import config from "../../config/config.json";
import { useFetcher } from "react-router-dom";
import ReactLoading from 'react-loading';

export function IslandsPage() {
    const [isOpen, setIsOpen] = useState(false);

    const [allIslands, setAllIslands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isErrorThrown, setIsErrorThrown] = useState(false);
    const [filterMap, setFilterMap] = useState([]);
    const [lastSearch, setLastSearch] = useState(String);
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
    });

    const getAllIslands = async () => {
        try {
            let res = await axios.get(config.serverAddress + "/api/islands/");
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
                )
            });
            setAllIslands(islands);
            setIsLoading(false);
        } catch (error) {
            setIsErrorThrown(true);
        }
    };
    const getIslandsWithSearch = async (search) =>{
        try{
            let res = await axios.get(config.serverAddress + "/api/islands/search/" + search);
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
            if(islands == []){
                setIsErrorThrown(true);
            }
            else{
                setAllIslands(islands);
                setIsLoading(false);
            }
        }
        catch(error){
            setIsErrorThrown(true);
        }
        return;

    }
    useEffect(() => {
        let enumFilter = [
            "africa",
            "america",
            "europe",
            "oceania",
            "tropical",
            "dry",
            "temperate",
            "continental",
            "polar",
            "accomodations",
            "landingstrip",
            "port"
        ];
        getAllIslands();
        let newArray = [];
        enumFilter.forEach(element => {
        newArray.push( { element: false } ) ;
        setFilterMap(newArray)

        
        });
}, []);

    const ClickOnCheckbox = async (e) => {
        // modification de l'attribut en fonction de la case coché
        filterMap[e.target.value]= e.target.checked;
        let url = new URL(document.location.href);
        var search_params = new URLSearchParams(url.search);
        var search = search_params.get('search');
        try {
            // requête vers l'api
            let res;
            if(search == null){
                res = await axios.get(config.serverAddress + "/api/islands/");
            }
            else{
                res = await axios.get(config.serverAddress + "/api/islands/search/" + search);
            }
            const data = res.data;
            // first filter --- "location"
            // chose
            let take = false;
            let islandsLocated = data.map((island) => {
                switch (island.continent) {
                        case "America":
                            if(filterMap["america"]){
                            take = true;
                        }
                            break;
                        case "Africa":
                            if(filterMap["africa"]){
                                take = true;
                            }
                            break;
                        case "Europe":
                            if(filterMap["europe"]){
                                take = true;
                            }
                            break;  
                        case "Oceania":
                            if(filterMap["oceania"]){
                                take = true;
                            }
                            break;
                        default:
                            take = false
                            break;

                }
                // if no filter take all the island
                if(!filterMap["africa"] && !filterMap["oceania"] && !filterMap["europe"] && !filterMap["america"]){
                    return island
                }
                else if (take == true){ // else only return the island who pass the filter
                    take = false;
                    return island;
                }
            });

            // second filter "weather"
            islandsLocated = islandsLocated.filter(element => element != undefined);
            take = false;
            var islandsWeather = islandsLocated.map((island) => {
                take = false;
                switch (island.weather) {
                        case "Tropical":
                            if(filterMap["tropical"]){
                            take = true;
                        }
                            break;
                        case "Dry":
                            if(filterMap["dry"]){
                                take = true;
                            }
                            break;
                        case "Temperate":
                            if(filterMap["temperate"]){
                                take = true;
                            }
                            break;  
                        case "Continental":
                            if(filterMap["continental"]){
                                take = true;
                            }
                            break;
                        case "Polar":
                            if(filterMap["polar"]){
                                take = true;
                            }
                            break;

                        default:
                            take = false
                            break;

                }
                // if no filter take all the island
                if(!filterMap["tropical"] && !filterMap["dry"] && !filterMap["temperate"] && !filterMap["continental"] && !filterMap["polar"]){
                    return island
                }
                else if (take == true){ // else only return the island who pass the filter
                    take = false;
                    return island;
                }

            });
            islandsWeather = islandsWeather.filter(element => element != undefined);
            const islandsFiltered = islandsWeather.map((island) => {
                try{
                return (
                    <IslandCard
                        key={island.id}
                        id={island.id}
                        name={island.name}
                        country={island.country}
                        description={island.description}
                        image={island.mainImg}
                    />
                );
                }
                catch{
                    console.error(error);
                }
            });
            if(islandsFiltered.length == 0){
                setAllIslands(undefined);
            }
            else{
                setAllIslands(islandsFiltered);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsErrorThrown(true);
        }
    };

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
    let url = new URL(document.location.href);
    var search_params = new URLSearchParams(url.search);
    var search = search_params.get('search');
    if(search !== null && search !== lastSearch){
        getIslandsWithSearch(search);
        setLastSearch(search);
    }

    return (
        <div className="islands">
            <div className="top">
                <h2>Islands</h2>
                <button className="filter" onClick={handleFilterClick}>
                    Filter <img ref={refToImage} src={ChevronUpIcon} />
                </button>
                <div className="dropdown" ref={refToDropDown}>
                    <div className="option-1">
                        <h4>Location</h4>
                        <ul>
                            <li>
                                <p>Africa</p>
                                <input type="checkbox" name="africa" value="africa" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                            <li>
                                <p>America</p>
                                <input type="checkbox" name="america" value="america" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                            <li>
                                <p>Europe</p>
                                <input type="checkbox" name="europe" value="europe" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                            <li>
                                <p>Oceania</p>
                                <input type="checkbox" name="oceania" value="oceania" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                        </ul>
                    </div>
                    <span className="line"></span>
                    <div className="option-2">
                        <h4>Climate</h4>
                        <ul>
                            <li>
                                <p>Tropical</p>
                                <input type="checkbox" name="tropical" value="tropical" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                            <li>
                                <p>Dry</p>
                                <input type="checkbox" name="dry" value="dry" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                            <li>
                                <p>Temperate</p>
                                <input type="checkbox" name="temperate" value="temperate" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                            <li>
                                <p>Continental</p>
                                <input type="checkbox" name="continental" value="continental" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                            <li>
                                <p>Polar</p>
                                <input type="checkbox" name="polar" value="polar" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                        </ul>
                    </div>
                    <span className="line"></span>
                    <div className="option-3">
                        <h4>Installations</h4>
                        <ul>
                            <li>
                                <p>Accommodations</p>
                                <input type="checkbox" name="accomodations" value="accomodations" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                            <li>
                                <p>Landing strip</p>
                                <input type="checkbox" name="landingstrip" value="landingstrip" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                            <li>
                                <p>Port</p>
                                <input type="checkbox" name="port" value="port" onClick={(e) => ClickOnCheckbox(e)}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid">{allIslands}</div>
        </div>
    );

}
