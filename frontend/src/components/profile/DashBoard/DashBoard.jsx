import { useEffect, useState, useContext, useCallback } from "react";
import IslandCard from "../../card/IslandCard";
import "./DashBoard.scss";


function DashBoard(props) {

    function getUserIslands() {
        if (props.data.customer.auctions.length === 0) {
            return <p></p>
        } else {
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
        
    }

      function getuserWatchlist() {
            if (props.data.watchlist.length === 0) {
                return <p style={{paddingLeft: "3%"}}>There's nothing to display here.</p>
            } else {
                    const islands = props.data.watchlist.map((island => {
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
        }

    return (
        <div className="dashboard">
            <div id="dashboard-sections">
                <div id="my-islands"> 
                    <h3> My islands</h3>
                </div>
               
                <div id="my-listings">
                    <h3 >My listings</h3>
                    {getUserIslands()}
                </div>

                <div id="watchlist">
                    <h3>Watchlist</h3>
                    {getuserWatchlist()}
                </div>
                
                <div id="my-past-auctions">
                    <h3>My past auctions</h3>
                </div>

                <div id="my-agents">
                    <h3>My agents</h3>
                </div>

                <div id="sponsored-parties">
                    <h3>Sponsored parties</h3>
                </div>

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