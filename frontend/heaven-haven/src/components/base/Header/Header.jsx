import "./Header.scss";
import Logo from "../../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { SearchBar } from "../../fields/SearchBar/SearchBar";
import { NavBar } from "../NavBar/NavBar";
import { useState } from "react";

export function Header() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <header>
            <Link to="/">
                <img src={Logo} alt="Logo" />
            </Link>
            <div className="right">
                <SearchBar
                    value={searchValue}
                    setInput={setSearchValue}
                ></SearchBar>
                <NavBar></NavBar>
            </div>
        </header>
    );
}
