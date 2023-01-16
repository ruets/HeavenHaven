import { Link, Routes, Route  } from "react-router-dom";
import { IslandPresentationPage } from "../../pages/IslandPresentation/IslandPresentationPage";
import "./IslandCard.scss";

function IslandCard(props) {
    return (
        <div className="island-card">
            <Routes>0
                <Route path={"island:" + props.id} element={<IslandPresentationPage id={props.id}/>}/>
            </Routes>
            <h4>{props.name}</h4>
            <img src={props.image} alt="" />
            <p>{props.country}</p>
            <div className="buttons">
                <Link to={"/island:" + props.id} className="btn-1">See More</Link>
                <Link to={"/auction:" + props.id} className="btn-1">Join The Auction</Link>
            </div>
        </div>
    );
}

export default IslandCard;
