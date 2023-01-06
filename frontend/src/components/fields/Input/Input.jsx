import "./input.scss";

function Input(props) {
    return (
        <div className="global-input">
            <div className="input">
            {props.icon ? <img src={props.icon} alt="Logo" /> : null}
                <input
                    name={props.name}
                    type={props.type}
                    onChange={(event) => props.setInput?.(event.target.value)}
                    value={props.value}
                    placeholder={props.label}
                    onBlur={props.onBlur ? props.onBlur : null}
                    required
                />
            </div>
            <div className="error">
            {props.errorMessage && props.errorMessage !== "" ? (
                <p>{props.errorMessage}</p>
            ) : null}
            </div>
        </div>
    );
}

export default Input;
