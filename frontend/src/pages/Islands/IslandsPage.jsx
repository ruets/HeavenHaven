import "./IslandsPage.scss"; 
import IslandCard from "../../components/card/IslandCard";
import ChevronUpIcon from "../../assets/img/chevron-up.svg";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";


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
                <button className="filter" onClick={handleFilterClick}>Filter <img ref={refToImage} src={ChevronUpIcon}/></button>
                <div className="dropdown" ref={refToDropDown}>
                    <div className="option-1"><h4>Location</h4>
                        <ul>
                           <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                           <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                           <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                        </ul>
                    </div>
                    <div className="option-2">
                    <h4>Price</h4>
                        <ul>
                            <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                            <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                            <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                        </ul>
                    </div>
                    
                    <div className="option-3">
                        <h4>Date</h4>
                        <ul>
                            <li><p>More recent</p><input type="checkbox" name="Lorem"/></li>
                            <li><p>Less recent</p><input type="checkbox" name="Lorem"/></li>
                            <li><p>Lorem</p><input type="checkbox" name="Lorem"/></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid">{allIslands}</div>
        </div>
    );
}