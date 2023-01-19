import { useEffect, useState, useContext, useCallback } from "react";
import IslandCard from "../../card/IslandCard";
import "./DashBoard.scss";


function DashBoard(props) {

    function getUserIslands() {
        console.log(props.data.customer.auctions);
        const islands = props.data.customer.auctions.map((auction => {
            const island = auction.island
            return (
                <IslandCard
                        key={island.id}
                        id={island.id}
                        name={island.name}
                        description={island.description}
                        image={island.mainImg}
                    />
            )
        }))
        return islands
      }

    return (
        <div className="dashboard">
            <div id="dashboard-sections">
                <h3>My islands</h3>
                <h3>My listings</h3>
                {getUserIslands()}
                <h3>Watchlist</h3>
                <h3>My past auctions</h3>
                <h3>My agents</h3>
                <h3>Sponsored parties</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
                <h3>My islands</h3>
            </div>
        </div>
    );
}

export default DashBoard;