import "./IndexPage.scss";
import { Cookies } from "../../components/cookies/Cookies";
import MainImage from "../../assets/img/index-main-img.avif";
import IslandCard from "../../components/card/IslandCard";
import { CookiesContext } from "../../App";
import GetCookie from "../../hooks/cookies/getCookie";
import axios from "axios";
import { useEffect, useCallback } from "react";
import { useState } from "react";
import config from "../../config/config.json";
import { useContext } from "react";
import ReactLoading from "react-loading";
import { useRef } from "react";

export function IndexPage() {
    // First, we create the hook to store the trendingIslands data in a state.
    const [trendingIslands, setTrendingIslands] = useState([]);
    // Next, we create the hook to store the isLoading state, which will determine if the loading animation will be shown or not.
    const [isLoading, setIsLoading] = useState(true);
    // Next, we create the hook to store the isErrorThrown state, which will determine if the error message will be shown or not.
    const [isErrorThrown, setIsErrorThrown] = useState(false);
    // Next, we create the hook to store the title2 state, which will determine if the title2 will be shown or not.
    const [title2, setTitle2] = useState(null);
    // Next, we create the hook to store the title3 state, which will determine if the title3 will be shown or not.
    const [title3, setTitle3] = useState(null);
    // Next, we create the hook to store the refToCookieGreyDiv state, which will determine if the refToCookieGreyDiv will be shown or not.
    const refToCookieGreyDiv = useRef(null);

    const cookiesContext = useContext(CookiesContext)


    const handleCookieClick = useCallback(() => {
        // Get the cookie grey div ref and set the display to none
        refToCookieGreyDiv.current.style.display = "none";
        // Set the overflow of the document body to auto
        document.body.style.overflowY = "auto";
    });

    // This function returns a div with a cookie message and a button, if no cookie is set and the user didn't click on the button to accept cookies.
    function showCookie() {
    // GetCookie is a function that checks if a cookie is set. If it is set, it returns the cookie value.
    if (!GetCookie("cookieAccepted") && !cookiesContext.isCookiesClicked) {
        return (
            <div className="cookie-grey" ref={refToCookieGreyDiv}>
                <Cookies onClick={handleCookieClick} />
            </div>
        );
    }
    }

    const getTrendingIslands = async () => {
        try {
            // 1. Make a GET request to the API to get trending islands
            let res = await axios.get(
                config.serverAddress + "/api/islands/trends"
            );
            // 2. Save the response data
            const data = res.data;
            // 3. Map each island to an IslandCard component
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
            // 4. Save the mapped components to the trendingIslands state
            setTrendingIslands(islands);
            // 5. Set the loading state to false
            setIsLoading(false);
        } catch (error) {
            // 6. Set the error state to true
            setIsErrorThrown(true);
        }
    };

    const beginTitleAnimation = useCallback(() => {
        // Add a delay of 400 milliseconds before displaying the second line of the title
        setTimeout(() => {
            setTitle2(<h1 className="title-2">solution for</h1>);
        }, 400);

        // Add a delay of 800 milliseconds before displaying the third line of the title
        setTimeout(() => {
            setTitle3(<h1 className="title-3">island auctions.</h1>);
        }, 800);
    });

    useEffect(() => {
        // Check if the cookie is not accepted and if the user clicked on the cookies button
        if (!GetCookie("cookieAccepted") && !cookiesContext.isCookiesClicked) {
            document.body.style.overflowY = "hidden";
        }
        // Get trending islands
        getTrendingIslands();
    }, []);


    // If an error is thrown, return this JSX
    if (isErrorThrown) {
        return <h1>Please excuse us, an error occured.</h1>;
    } else if (isLoading) {
        // If the page is still loading, return this JSX
        return (
            <div className="loading">
                <h1> Loading ... </h1>
                <ReactLoading
                    type={"spin"}
                    color={"#3A3A3A"}
                    height={200}
                    width={200}
                />
            </div>
        );
    }

    return (
        <>
            <div className="index">
                <div className="section-1">
                    <img src={MainImage} alt="" />
                    <div className="title">
                        <h1 className="title-1" onLoad={beginTitleAnimation()}>
                            Your best
                        </h1>
                        {title2 ? title2 : null}
                        {title3 ? title3 : null}
                    </div>
                </div>
                <div className="section-2">
                    <h2>Trending</h2>
                    <div className="islands">{trendingIslands}</div>
                </div>
            </div>
            {showCookie()}
        </>
    );
}
