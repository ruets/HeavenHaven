function Input(props) {
    return (
        <div>
            <img src={props.icon} alt="Logo" />
            <input
                name={props.name}
                type={props.type}
                onChange={(event) => props.setInput(event.target.value)}
                value={props.value}
                placeholder={props.label}
                onBlur={props.onBlur}
            />
            <label id="emailLabel" htmlFor={props.name}>
                Veuillez entrer un email valide
            </label>
        </div>
    );
}

export default Input;
