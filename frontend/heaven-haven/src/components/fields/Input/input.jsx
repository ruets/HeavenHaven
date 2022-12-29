import "./input.scss";

function Input(props) {
    return (
        <div className="input">
            <div>
                {props.icon ? <img src={props.icon} alt="Logo" /> : null}
                <input
                    name={props.name}
                    type={props.type}
                    onChange={(event) => props.setInput?.(event.target.value)}
                    value={props.value}
                    placeholder={props.label}
                    onBlur={props.onBlur}
                />
            </div>
            {props.errorMessage === "" ? <p>{props.errorMessage}</p> : null}
        </div>
    );
}

export default Input;
