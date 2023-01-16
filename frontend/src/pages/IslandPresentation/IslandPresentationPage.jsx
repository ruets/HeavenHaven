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
import { useLocation } from "react-router-dom";
import axios from "axios";

export function IslandPresentationPage() {
    const location = useLocation();
    const islandId = location.pathname.split('/')[2]
    let islandData = null;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getIslandData = async () => {
        try {
            const res = await axios.get(config.serverAdress + "/api/islands/" + islandId);
            console.log(res.data);
            islandData = res.data;
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
            <h1>Loading</h1>
        )
    } else if (isLoading) {
        return (
            <h1>Error</h1>
        )
    } else {

    return (
        <div className="islandPresentation">
            <div className="topSection">
                <img src={topImage} alt="islandImage" />
                <h1>[Lorem Ipsum]</h1>
            </div>
            <div className="topInfos">
                <div className="leftPart">
                    <p className="tittle">Auction Informations</p>
                    <p className="other"> <img src={dollarIcon} alt="dollar" /> Reserve price : [$4.5M]</p>
                    <p className="other"> <img src={calendarIcon} alt="dollar" />Bidding Opens : [Jan 24, 2023 1 AM EST]</p>
                </div>
                <div className="rightPart">
                    <p className="tittle">Fees and Commission</p>
                    <div className="infoAtTop">
                        <img src={payToBidIcon} alt="" />
                        <div>
                            <p> Pay To Bid </p>
                            <p> [0.5%] </p>
                        </div>
                    </div>
                    <div className="infoAtBottom">
                        <img src={comissionIcon} alt="payToBid-icon" />
                        <div>
                            <p> Co-broke Commission </p>
                            <p> [5%] </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="featuresSection">
                <h2> Features </h2>
                <div className="weatherPart">
                    <div className="text">
                        <p className="tittle">Weather</p>
                        <p className="description"> [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor metus sed sodales cursus.
                         Pellentesque pellentesque sollicitudin dignissim. Etiam non tellus vitae lorem luctus ultricies. 
                         Etiam non arcu eros. Duis elementum vitae tellus in sodales. 
                         Suspendisse elementum ex eu sodales facilisis. Sed at nibh non felis facilisis vulputate. 
                         Nam pulvinar molestie metus, tincidunt egestas lorem sodales eget. 
                         Nulla sollicitudin fermentum turpis sed luctus. Nam efficitur, nulla et feugiat pretium, orci lectus fringilla dolor, in tempor libero tortor id dolor. 
                         Phasellus ut ante pharetra, porta dolor at, tempor mauris. 
                         Ut sed nisi in felis sagittis finibus blandit vitae massa. 
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit.]
                        </p>
                    </div>
                    <img src={weatherPart} alt="weather-Image" />
                </div>
                <div className="wildLifePart">
                    <img src={wildLifePart} alt="wildLife-Image" />
                    <div className="text">
                        <p className="tittle">Wildlife</p>
                        <p className="description"> [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor metus sed sodales cursus.
                         Pellentesque pellentesque sollicitudin dignissim. Etiam non tellus vitae lorem luctus ultricies. 
                         Etiam non arcu eros. Duis elementum vitae tellus in sodales. 
                         Suspendisse elementum ex eu sodales facilisis. Sed at nibh non felis facilisis vulputate. 
                         Nam pulvinar molestie metus, tincidunt egestas lorem sodales eget. 
                         Nulla sollicitudin fermentum turpis sed luctus. Nam efficitur, nulla et feugiat pretium, orci lectus fringilla dolor, in tempor libero tortor id dolor. 
                         Phasellus ut ante pharetra, porta dolor at, tempor mauris. 
                         Ut sed nisi in felis sagittis finibus blandit vitae massa. 
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit.]
                        </p>
                    </div>
                </div>
                <div className="activitiesPart">
                    <div className="text">
                        <p className="tittle">Activities</p>
                        <p className="description"> [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor metus sed sodales cursus.
                         Pellentesque pellentesque sollicitudin dignissim. Etiam non tellus vitae lorem luctus ultricies. 
                         Etiam non arcu eros. Duis elementum vitae tellus in sodales. 
                         Suspendisse elementum ex eu sodales facilisis. Sed at nibh non felis facilisis vulputate. 
                         Nam pulvinar molestie metus, tincidunt egestas lorem sodales eget. 
                         Nulla sollicitudin fermentum turpis sed luctus.]</p>
                    </div>
                    <img src={activitiesPart} alt="activities-Image" />
                </div>
            </div>
            <div className="picturesSection">
                <hr />
                <h2>Pictures</h2>
                
            </div>
            <div className="locationSection">
                <hr />
                <h2>Location</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.6650811495997!2d-77.7610641494411!3d25.44945837758531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8925e610d2be164b%3A0x41a1a7d5032b888e!2sLittle%20Whale%20Cay!5e0!3m2!1sen!2sfr!4v1673853050507!5m2!1sen!2sfr" 
                width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                 <div className="info">
                    <p className="leftText">[Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor metus sed sodales cursus.
                        Pellentesque pellentesque sollicitudin dignissim. Etiam non tellus vitae lorem luctus ultricies. 
                        Etiam non arcu eros. Duis elementum vitae tellus in sodales. Suspendisse elementum ex eu sodales facilisis.] 
                    </p>
                    <p className="rightText">[Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor metus sed sodales cursus.
                        Pellentesque pellentesque sollicitudin dignissim. Etiam non tellus vitae lorem luctus ultricies. 
                        Etiam non arcu eros. Duis elementum vitae tellus in sodales. Suspendisse elementum ex eu sodales facilisis.]
                    </p>
                 </div>
            </div>
            <div className="interested">
                <hr />
                <h3>Interested in this island ?</h3>
                <button type="submit" className="cta">Join the auction</button>
            </div>
        </div>
    )
}
}