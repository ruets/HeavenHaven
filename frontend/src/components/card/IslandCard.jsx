import { Link } from "react-router-dom";
import Image from "../../assets/img/island-card-replacement.png";
import "./IslandCard.scss";

function IslandCard(props) {
    return (
        <div className="island-card">
            <h4>{props.title}</h4>
            <img src={props.image} alt="" />
            <p>{props.description}</p>
            <div className="buttons">
                <Link to={"/islands:" + props.id} className="btn-1">See More</Link>
                <Link to={"/auction:" + props.id} className="btn-1">Join The Auction</Link>
            </div>
        </div>
    );
}

export default IslandCard;
