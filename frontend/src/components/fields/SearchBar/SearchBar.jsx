import "./SearchBar.scss";
import SearchLogo from "../../../assets/img/search-icon.svg";
import { useCallback, useEffect, location } from "react";
import { useLocation } from "react-router-dom";

export function SearchBar(props) {

    const location = useLocation

    const verifyEnterKey = useCallback(
        (e) => {
            if (e.code === "Enter" || e.key === "Enter") {
                props.handleSearch();
            }
        },
        [props.handleSearch]
    );
    useEffect(() => {
        props.setInput(document.location.href.split('=')[1]);
    }, [])
    return (
        <div className="search-bar">
            <input
                name="search"
                type="text"
                value={props.value}
                onChange={(e) => props.setInput(e.target.value)}
                onKeyDown={verifyEnterKey}
            />
            <img
                src={SearchLogo}
                alt="SearchLogo"
                onClick={props.handleSearch}
            />
        </div>
    );
}
