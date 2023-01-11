import "./SellingPage.scss";
import MainImage from "../../../assets/img/selling-banner.png";
import SearchIcon from "../../../assets/img/search-icon-2.svg";
import UploadIcon from "../../../assets/img/upload-icon.svg";
import CheckIcon from "../../../assets/img/check-icon.svg";
import { Link } from "react-router-dom";

export function SellingPage() {
    return (
        <div className="selling">
            <div className="section-1">
                <img src={MainImage} alt="" />
                <h1>Sell Your Island</h1>
            </div>
            <div className="section-2">
                <div className="left">
                    <div className="layout">
                        <h3>How To Sell</h3>
                        <div>
                            <img
                                className="search-icon"
                                src={SearchIcon}
                                alt=""
                            />
                            <p>Tell us about your island</p>
                        </div>
                        <div>
                            <img src={UploadIcon} alt="" />
                            <p>Upload photos</p>
                        </div>
                        <div>
                            <img src={CheckIcon} alt="" />
                            <p>Submit your advertisment</p>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="layout">
                        <h3>Start Selling</h3>
                        <p className="selling-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ratione maiores doloribus autem? Nesciunt
                            quisquam quas sint? Quis distinctio commodi est
                            architecto quidem!
                        </p>
                        <Link className="btn-1" to="/sell/form">
                            List An Island
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
