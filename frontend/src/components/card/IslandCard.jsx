import { Link } from "react-router-dom";
import "./IslandCard.scss";

function IslandCard(props) {
    return (
        <div className="island-card">
            <h4>{props.name}</h4>
            <img src={props.image} alt="" />
            <p>{props.country}</p>
            <div className="buttons">
                <Link to={"/islands:" + props.id} className="btn-1">See More</Link>
                <Link to={"/auction:" + props.id} className="btn-1">Join The Auction</Link>
            </div>
        </div>
    );
}

export default IslandCard;
