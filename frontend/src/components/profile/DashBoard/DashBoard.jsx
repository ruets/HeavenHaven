import IslandCard from "../../card/IslandCard";
import "./DashBoard.scss";

function DashBoard(props) {
    function getUserIslands() {
        if (props.data.customer.auctions.length === 0) {
            return (
                <p className="nothing">
                    You don't have any listings to display.
                </p>
            );
        } else {
            const islands = props.data.customer.auctions.map((auction) => {
                const island = auction.island;
                return (
                    <IslandCard
                        key={island.id}
                        id={island.id}
                        name={island.name}
                        description={island.description}
                        image={island.mainImg}
                        userIsland={true}
                    />
                );
            });
            return <div className="grid">{islands}</div>;
        }
    }

    function getUserWatchlist() {
        if (props.data.watchlist.length === 0) {
            return <p className="nothing">You don't have any liked islands.</p>;
        } else {
            const islands = props.data.watchlist.map((auction) => {
                const island = auction.island;
                return (
                    <IslandCard
                        key={island.id}
                        id={island.id}
                        name={island.name}
                        description={island.description}
                        image={island.mainImg}
                    />
                );
            });
            return <div className="grid">{islands}</div>;
        }
    }

    function getUserAgents() {
        if (props.data.customer.agents.length === 0) {
            return (
                <p className="nothing">You don't have any agents to display.</p>
            );
        } else {
            const agents = props.data.cutsomer.agents.map((agent) => {
                return (
                    <IslandCard
                        key={agent.id}
                        id={agent.id}
                        name={agent.name}
                        description={agent.description}
                        image={agent.mainImg}
                    />
                );
            });
            return <div className="grid">{agents}</div>;
        }
    }

    function getUserRemainingSponsorUses() {
        if (props.data.customer.agents.length === 0) {
            return (
                <p className="nothing">
                    You don't have any sponsored parties to display.
                </p>
            );
        } else {
            const agents = props.data.cutsomer.agents.map((agent) => {
                return (
                    <IslandCard
                        key={agent.id}
                        id={agent.id}
                        name={agent.name}
                        description={agent.description}
                        image={agent.mainImg}
                    />
                );
            });
            return <div className="sponsor-grid">{agents}</div>;
        }
    }

    return (
        <div className="dashboard">
            <div id="dashboard-sections">
                <div id="my-listings">
                    <h3>My listings</h3>
                    <span className="line"></span>
                    {getUserIslands()}
                    <span className="line"></span>
                </div>

                <div id="watchlist">
                    <h3>Watchlist</h3>
                    <span className="line"></span>
                    {getUserWatchlist()}
                    <span className="line"></span>
                </div>

                <div id="my-agents">
                    <h3>My agents</h3>
                    <span className="line"></span>
                    {getUserAgents()}
                    <span className="line"></span>
                </div>

                <div id="remaining-uses">
                    <h3>Sponsored parties</h3>
                    <span className="line"></span>
                    {getUserRemainingSponsorUses()}
                    <span className="line"></span>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
