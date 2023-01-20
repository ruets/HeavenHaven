import topImage from "../../assets/img/presentationPage-test-img.png";
import "./IslandPresentationPage.scss";
import dollarIcon from "../../assets/img/dollarBill-icon.svg";
import calendarIcon from "../../assets/img/calendar-icon.svg";
import payToBidIcon from "../../assets/img/payToBid-icon.svg";
import comissionIcon from "../../assets/img/comission-icon.svg";
import weatherPart from "../../assets/img/weatherPart-test-img.png";
import wildLifePart from "../../assets/img/wildLife-test-img.png";
import activitiesPart from "../../assets/img/activitiesPart-test-img.png";
import { useEffect, useState } from "react";
import config from "../../config/config.json";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useCallback } from "react";

export function IslandPresentationPage() {
    const location = useLocation(); // Get the current path
    const islandId = location.pathname.split('/')[2] // Get the island id from the path

    const [islandData, setislandData] = useState({}) // Define a state to store the island data

    const [caroussel, setCaroussel] = useState({inputs: [], slides: [], buttons: [], labels: []}); // Define a state to store caroussel data

    const [isLoading, setIsLoading] = useState(true); // Define a state to know if the data is loading
    const [error, setError] = useState(false); // Define a state to know if there is an error

    const getIslandData = async () => { // this is an async function
        try {
            const res = await axios.get(config.serverAddress + "/api/islands/" + islandId); // this line makes a request to the server, and waits for the answer
            console.log(res.data); // here we log the data, so we can see it in the console
            setislandData(res.data) // here we save the data in the state
            createCaroussel(res.data); // we call a function that creates a carousel
            setIsLoading(false); // we set the loading state to false
        } catch (error) { // if anything in the try block fails, we get here
            setError(true) // we set the error state to true
        }
    }

    const createCaroussel = useCallback((data) => {
    // Create temporary caroussel object
    let tempCaroussel = {inputs: [], slides: [], buttons: [], labels: []};
    // Loop through images
    for (let i = 0; i < data.images.length; i++) {
        // Add input to inputs array
        tempCaroussel.inputs.push(<input type="radio" name="radio-btn" id={"radio" + (i + 1)}/>);
        // Add slide to slides array
        tempCaroussel.slides.push(<div className={i === 0 ? "slide first" : "slide"}><img src={data.images[i]} alt="" /></div>)
        // Add button to buttons array
        tempCaroussel.buttons.push(<div className={"auto-btn" + (i + 1)}></div>)
        // Add label to labels array
        tempCaroussel.labels.push(<label htmlFor={"radio" + (i + 1)} className="manual-btn"></label>)
    }
    // Set caroussel to tempCaroussel
    setCaroussel(tempCaroussel);
    });

    useEffect(() => {
        // This function will be called only once when the
        // component mounts
        getIslandData();
    }, [])
    
    function fetchDate() {
        // Split the date string by the dash character
        const startDate = islandData.auction.startDate.split("-");
        // Create a date object with the year, month, and day from the split string
        let date = new Date(startDate[0], startDate[1], startDate[2], 0, 0, 0);
        // Return the date as a string
        return date.toLocaleString();
    }

    if (error) {
        return (
            <h1>Error</h1>
        )
    } else if (isLoading) {
        return (
            <h1>Loading</h1>
        )
    } else {
    return (
        <div className="islandPresentation">
            <div className="topSection">
                <img src={islandData.mainImg} alt="islandImage" /> {/* TO CHANGE */}
                <h1>{islandData.name}</h1>
            </div>
            <div className="topInfos">
                <div className="leftPart">
                    <p className="tittle">Auction Informations</p>
                    <p className="other"> <img src={dollarIcon} alt="dollar" /> Reserve price : ${islandData.auction.reservePrice}</p>
                    <p className="other"> <img src={calendarIcon} alt="dollar" />Bidding Opens : {fetchDate()}</p>
                </div>
                <div className="rightPart">
                    <p className="tittle">Fees and Commission</p>
                    <div className="infoAtTop">
                        <img src={payToBidIcon} alt="" />
                        <div>
                            <p> Pay To Bid </p>
                            <p>0.5%</p>
                        </div>
                    </div>
                    <div className="infoAtBottom">
                        <img src={comissionIcon} alt="payToBid-icon" />
                        <div>
                            <p> Co-broke Commission </p>
                            <p>5%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="featuresSection">
                <h2> Features </h2>
                <div className="weatherPart">
                    <div className="text">
                        <p className="tittle">Weather</p>
                        <p className="description"> 
                        {islandData.weather}
                        </p>
                    </div>
                    <img src={islandData.weatherImg} alt="weather-Image" />
                </div>
                <div className="wildLifePart">
                    <img src={islandData.wildlifeImg} alt="wildLife-Image" />
                    <div className="text">
                        <p className="tittle">Wildlife</p>
                        <p className="description">
                        {islandData.wildlife}
                        </p>
                    </div>
                </div>
                <div className="activitiesPart">
                    <div className="text">
                        <p className="tittle">Activities</p>
                        <p className="description">
                        {islandData.activities}
                        </p>
                    </div>
                    <img src={islandData.activitiesImg} alt="activities-Image" />
                </div>
            </div>
            <div className="picturesSection">
                <hr />
                <h2>Pictures</h2> 
                {/* Image slider start */}
                <div className="caroussel">
                    <div className="slides">

                        {/* Radio buttons start */}
                        {caroussel.inputs}
                        {/* Radio buttons end */}
                        {/* Slide images start */}
                        {caroussel.slides}
                        {/* Slide images end */}
                        {/* Automatic navigation start */}
                        <div className="navigation-auto"> 
                            {caroussel.buttons}
                        </div>
                        {/* Automatic navigation end */}
                    </div>
                    {/* Manual navigation start */}
                    <div className="navigation-manual">
                        {caroussel.labels}
                    </div>
                    {/* Manual navigation end */}
                </div>
                {/* Image slider end */}
            </div>
            <div className="locationSection">
                <hr />
                <h2>Location</h2>
                {/* This i-Frame defaults to Little Whale Cay for all islands. As we explained during the presentation, 
                once the user submits an island for sale form, it will not be displayed directly on the application (as it is currently). 
                Our team has to check the authenticity of the title, and it is at this moment that we will modify the i-Frame, 
                from the coordinates provided by the user, to display the right map. */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.6650811495997!2d-77.7610641494411!3d25.44945837758531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8925e610d2be164b%3A0x41a1a7d5032b888e!2sLittle%20Whale%20Cay!5e0!3m2!1sen!2sfr!4v1673853050507!5m2!1sen!2sfr" 
                width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                 <div className="info">
                    <p>{islandData.location}</p>
                 </div>
            </div>
            <div className="interested">
                <hr />
                <h3>Interested in this island ?</h3>
                <Link to={"/bidding/" + islandId}><button className="cta">Join the auction</button></Link>
            </div>
        </div>
    )
}
}