import Input from "./input";
import EmailLogo from "../assets/img/email-icon.svg";

function Signup() {
    return (
        <div>
            <Input
                type="text"
                name="email"
                label="E-Mail"
                icon={EmailLogo}
            ></Input>
            {/*<Input type="password" name="password" label="Password"></Input>*/}
        </div>
    );
}

export default Signup;
