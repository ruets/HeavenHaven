import { SignupForm } from "../../../components/forms/Signup/SignupForm";
import SignupImage from "../../../assets/img/login-img.png";
import "./SignupPage.scss";

export function SignupPage() {
    return (
        <div className="layout">
            <div className="content">
            <SignupForm></SignupForm>
            <img src={SignupImage} alt="Island" className="login-img" />
            </div>
        </div>
    );
}
