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

export function IslandPresentationPage() {
    const location = useLocation();
    const islandId = location.pathname.split('/')[2]

    const [islandData, setislandData] = useState({})

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getIslandData = async () => {
        try {
            const res = await axios.get(config.serverAddress + "/api/islands/" + islandId);
            console.log(res.data);
            setislandData(res.data)
            setIsLoading(false);
        } catch (error) {
            setError(true)
        }
    }

    useEffect(() => {
        getIslandData();
    }, [])

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
                <img src={topImage} alt="islandImage" /> {/* TO CHANGE */}
                <h1>{islandData.name}</h1>
            </div>
            <div className="topInfos">
                <div className="leftPart">
                    <p className="tittle">Auction Informations</p>
                    <p className="other"> <img src={dollarIcon} alt="dollar" /> Reserve price : {}</p>
                    <p className="other"> <img src={calendarIcon} alt="dollar" />Bidding Opens : {}</p>
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
                    <img src={weatherPart} alt="weather-Image" />
                </div>
                <div className="wildLifePart">
                    <img src={wildLifePart} alt="wildLife-Image" />
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
                    <img src={activitiesPart} alt="activities-Image" />
                </div>
            </div>
            <div className="picturesSection">
                <hr />
                <h2>Pictures</h2> 
                {/* Image slider start */}
                <div className="slider">
                    <div className="slides">
                        {/* Radio buttons start */}
                        <input type="radio" name="radio-btn" id="radio1"/>
                        <input type="radio" name="radio-btn" id="radio2"/>
                        <input type="radio" name="radio-btn" id="radio3"/>
                        <input type="radio" name="radio-btn" id="radio4"/>
                        <input type="radio" name="radio-btn" id="radio5"/>
                        {/* Radio buttons end */}
                        {/* Slide images start */}
                        <div className="slide first">
                            <img src="https://picsum.photos/id/1041/800/450" alt="" />
                        </div>
                        <div className="slide">
                            <img src="https://picsum.photos/id/1043/800/450" alt="" />
                        </div>
                        <div className="slide">
                            <img src="https://picsum.photos/id/1044/800/450" alt="" />
                        </div>
                        <div className="slide">
                            <img src="https://picsum.photos/id/1045/800/450" alt="" />
                        </div>
                        <div className="slide">
                            <img src="https://picsum.photos/id/1049/800/450" alt="" />
                        </div>
                        {/* Slide images end */}
                        {/* Automatic navigation start */}
                        <div className="navigation-auto"> 
                            <div className="auto-btn1"></div>
                            <div className="auto-btn2"></div>
                            <div className="auto-btn3"></div>
                            <div className="auto-btn4"></div>
                            <div className="auto-btn5"></div>
                        </div>
                        {/* Automatic navigation end */}
                    </div>
                    {/* Manual navigation start */}
                    <div className="navigation-manual">
                        <label htmlFor="radio1" className="manual-btn"></label>
                        <label htmlFor="radio2" className="manual-btn"></label>
                        <label htmlFor="radio3" className="manual-btn"></label>
                        <label htmlFor="radio4" className="manual-btn"></label>
                        <label htmlFor="radio5" className="manual-btn"></label>
                    </div>
                    {/* Manual navigation end */}
                </div>
                {/* Image slider end */}
            </div>
            <div className="locationSection">
                <hr />
                <h2>Location</h2>
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