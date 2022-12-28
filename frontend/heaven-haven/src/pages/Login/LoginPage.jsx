import { LoginForm } from "../../components/LoginForm";
import LoginImage from "../../assets/img/login-img.png";
import "./loginPage.scss";

export function LoginPage() {
    return (
        <div className="content">
            <LoginForm></LoginForm>
            <img src={LoginImage} alt="Island" className="login-img" />
        </div>
    );
}
