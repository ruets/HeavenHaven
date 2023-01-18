import "./Header.scss";
import Logo from "../../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../../fields/SearchBar/SearchBar";
import { NavBar } from "../NavBar/NavBar";
import { useState, useCallback } from "react";
import { useEffect } from "react";

export function Header() {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSearch = useCallback(() => {
        console.log("Searching");
        if (searchValue !== "") {
            const link = "/islands?search=" + searchValue;
            navigate(link);
            location.reload();
        }
       
        
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
