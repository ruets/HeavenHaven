import "./SponsoredParty.scss";

function SponsoredParty(props) {
    return (
        <div className="sponsored-party">
            <h4>{props.name}</h4>
            <div className="status">
                {props.status === "pending" ? (
                    <div className="buttons">
                        <p>{props.status}</p>
                        <button>Validate</button>
                        <button>Reject</button>
                    </div>
                ) : (
                    <p>Validated</p>
                )}
            </div>
        </div>
    );
}

export default SponsoredParty;
