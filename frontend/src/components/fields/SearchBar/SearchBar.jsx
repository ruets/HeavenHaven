import "./SearchBar.scss";
import SearchLogo from "../../../assets/img/search-icon.svg";
import { useCallback, useEffect, location } from "react";
import { useLocation } from "react-router-dom";

export function SearchBar(props) {

    const location = useLocation

    // Verify that the key pressed is the "Enter" key.
const verifyEnterKey = useCallback(
    (e) => {
        if (e.code === "Enter" || e.key === "Enter") {
            props.handleSearch();
        }
    },
    // Only run this callback if the handleSearch prop changes.
    [props.handleSearch]
);
    
// This line of code will run when the component is first rendered on the screen
    useEffect(() => {
        // When the component is first rendered, we want to get the query from the URL
        // and set it as the input value
        // We do this by setting the input value to the query in the URL
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
