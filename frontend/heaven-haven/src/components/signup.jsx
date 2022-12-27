import Input from "./input";

function Signup() {
    return (
        <div>
            <Input
                type="text"
                name="email"
                label="E-Mail"
                iconPath="./assets/img/email-icon.svg"
            ></Input>
            <Input type="password" name="password" label="Password"></Input>
        </div>
    );
}

export default Signup;
