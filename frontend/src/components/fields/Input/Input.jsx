import "./Input.scss";

function Input(props) {
    return (
        <div className="global-input">
            <div className="input">
                {props.icon ? <img src={props.icon} className="icon" alt="Logo" /> : null}
                <input
                    name={props.name}
                    type={props.type}
                    onChange={(event) => {
                        props.setInput?.(event.target.value)
                    }}
                    value={props.value}
                    placeholder={props.label}
                    onBlur={props.onBlur ? props.onBlur : null}
                    required={props.required ? required : null}
                />
            </div>
            {props.errorMessage && props.errorMessage !== "" ? (
                <div className="error">
                    <p>{props.errorMessage}</p>
                </div>
                ) : null}
        </div>
    );
}

export default Input;
