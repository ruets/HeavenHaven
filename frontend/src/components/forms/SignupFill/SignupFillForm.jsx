import { useCallback } from "react";
import Input from "../../fields/Input/Input";
import { Link } from "react-router-dom";
import "./SignupFillForm.scss";

export function SignUpFillForm() {
    const onSubmitForm = useCallback(() => {
        // TODO
    });

    return (
        <form className="signup" onSubmit={onSubmitForm}>
            <div className="form-steps">
                <span className="ball-filled"></span>
                <span className="line"></span>
                <span className="ball-filled"></span>
            </div>
            <h1>Sign Up</h1>
            <p className="description">
                The following information can be provided later.
            </p>
            <button onClick={onSubmitForm}>Sign Up</button>
            <p className="have-account">
                Already have an account ? <Link to={"/login"}>Log in</Link>
            </p>
        </form>
    );
}
