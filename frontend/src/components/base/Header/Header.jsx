import "./Header.scss";
import Logo from "../../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../../fields/SearchBar/SearchBar";
import { NavBar } from "../NavBar/NavBar";
import { useState, useCallback } from "react";
import { useEffect } from "react";

export function Header() {
    // Declare variables
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    // Declare function
    const handleSearch = useCallback(() => {
        console.log("Searching");
        // If the search value is not empty
        if (searchValue !== "") {
            // Create a new link for the search
            const link = "/islands?search=" + searchValue;
            // Navigate to the new link
            navigate(link);
            // Reload the page to display the new search results
            location.reload();
        }
        // If the search value is empty, navigate to the islands page
        navigate("/islands");
       
        
    }, [searchValue]);


    return (
        <header>
            <Link to="/">
                <img src={Logo} alt="Logo" />
            </Link>
            <div className="right">
                <SearchBar
                    value={searchValue}
                    setInput={setSearchValue}
                    handleSearch={handleSearch}
                ></SearchBar>
                <NavBar></NavBar>
            </div>
        </header>
    );
}
