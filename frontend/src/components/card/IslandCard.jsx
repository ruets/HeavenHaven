import { Link } from "react-router-dom";
import "./IslandCard.scss";

function IslandCard(props) {
    return (
        <div className="island-card">
            {props.userIsland ? (
                <div className="title">
                    <h4>{props.name}</h4>
                    <button onClick={onDelete()}>-</button>
                </div>
            ) : (
                <h4>{props.name}</h4>
            )}
            <img src={props.image} alt="" />
            <p>{props.description}</p>
            <div className="buttons">
                <Link to={"/island/" + props.id}>
                    <button className="cta">See More</button>
                </Link>
                <Link to={"/bidding/" + props.id}>
                    <button className="cta">Join The Auction</button>
                </Link>
            </div>
        </div>
    );
}

export default IslandCard;
