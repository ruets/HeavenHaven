import { LoginForm } from "../../../components/forms/Login/LoginForm";
import LoginImage from "../../../assets/img/login-img.png";
import "./LoginPage.scss";

export function LoginPage() {
    return (
        <div className="login">
            <div className="content">
                <LoginForm></LoginForm>
                <img src={LoginImage} alt="Island" className="login-img" />
            </div>
        </div>
    );
}
