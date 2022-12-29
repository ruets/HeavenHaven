import "./SearchBar.scss";
import SearchLogo from "../../../assets/img/search-icon.svg";
import { useCallback } from "react";

export function SearchBar(props) {
    const verifyEnterKey = useCallback(
        (e) => {
            console.log("daz");
            if (e.code === "Enter" || e.key === "Enter") {
                props.handleSearch();
            }
        },
        [props.handleSearch]
    );

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
