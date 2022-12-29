import "./SearchBar.scss";
import SearchLogo from "../../../assets/img/search-icon.svg";

export function SearchBar(props) {
    return (
        <div className="search-bar">
            <input
                name="search"
                type="text"
                value={props.value}
                onChange={(e) => props.setInput(e.target.value)}
            />
            <img src={SearchLogo} alt="SearchLogo" />
        </div>
    );
}
