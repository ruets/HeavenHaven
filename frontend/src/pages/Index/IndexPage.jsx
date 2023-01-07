import "./IndexPage.scss";
import MainImage from "../../assets/img/index-main-img.png";

export function IndexPage() {
    return (
        <div className="index">
            <div className="section-1">
                <img src={MainImage} alt="" />
                <div className="title">
                    <h1 className="title-1">Your best</h1>
                    <h1 className="title-2">solution for</h1>
                    <h1 className="title-3">islands auctions</h1>
                </div>
            </div>
            <div className="section">
                <h2>Trending</h2>
            </div>
        </div>
    );
}
