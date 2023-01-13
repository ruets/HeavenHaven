import topImage from "../../assets/img/presentationPage-test-img.png";
import "./IslandPresentationPage.scss";
import dollarIcon from "../../assets/img/dollarBill-icon.svg";
import calendarIcon from "../../assets/img/calendar-icon.svg";
import payToBidIcon from "../../assets/img/payToBid-icon.svg";
import comissionIcon from "../../assets/img/comission-icon.svg";
import weatherPart from "../../assets/img/weatherPart-test-img.png";

export function IslandPresentationPage() {
    return (
        <div className="islandPresentation">
            <div className="topSection">
                <img src={topImage} alt="islandImage" />
                <h1>Lorem Ipsum</h1>
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
                        <p className="description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor metus sed sodales cursus.
                         Pellentesque pellentesque sollicitudin dignissim. Etiam non tellus vitae lorem luctus ultricies. 
                         Etiam non arcu eros. Duis elementum vitae tellus in sodales. 
                         Suspendisse elementum ex eu sodales facilisis. Sed at nibh non felis facilisis vulputate. 
                         Nam pulvinar molestie metus, tincidunt egestas lorem sodales eget. 
                         Nulla sollicitudin fermentum turpis sed luctus. Nam efficitur, nulla et feugiat pretium, orci lectus fringilla dolor, in tempor libero tortor id dolor. 
                         Phasellus ut ante pharetra, porta dolor at, tempor mauris. 
                         Ut sed nisi in felis sagittis finibus blandit vitae massa. 
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    <img src={weatherPart} alt="weather-Image" />
                </div>
            </div>
        </div>
    );
}