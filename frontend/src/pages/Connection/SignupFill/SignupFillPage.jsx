import { SignUpFillForm } from "../../../components/forms/SignupFill/SignupFillForm";
import SignupFillImage from "../../../assets/img/login-img.png";
import "../Signup/SignupPage.scss";

export function SignupFillPage() {
    return (
        <div className="content">
            <SignUpFillForm></SignUpFillForm>
            <img src={SignupFillImage} alt="Island" className="login-img" />
        </div>
    );
}
