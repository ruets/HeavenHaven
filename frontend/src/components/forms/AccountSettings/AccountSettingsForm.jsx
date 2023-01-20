import "./AccountSettingsForm.scss"
import Input from "../../fields/Input/Input";
import GetCookie from "../../../hooks/cookies/getCookie";
import axios from 'axios';
import config from "../../../config/config.json"
import { useState, useContext } from "react";
import { LoginContext } from "../../../App";

export function AccountSettingsForm() {
    const loginContext = useContext(LoginContext);

    // Define old password
    const [oldPassword, setOldPassword] = useState("")

    // Define new password1
    const [newPassword1, setNewPassword1] = useState("")

    // Define new password2
    const [newPassword2, setNewPassword2] = useState("")

    const changePassword = async (e) => {
        e.preventDefault(); // Prevent default page refresh
        let currentUserToken = "";
        if (GetCookie("userToken") !== undefined) { // Get the user's token from the cookie
            currentUserToken = GetCookie("userToken");
        } else {
            currentUserToken = loginContext.userToken; // If the cookie doesn't exist, get the token from the context
        }
        const headers = {
            headers: { Authorization: `Bearer ${currentUserToken}` } // Create the token header
        }
        try {
            const res = await axios.post(config.serverAddress + "/api/user/changePassword", { // Make a post request to the server
                oldPassword: oldPassword,
                newPassword1: newPassword1,
                newPassword2: newPassword2
            }, headers)
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    return (
    <form className="account" onSubmit={e => changePassword(e)}>
        <h1> Password </h1>
            <div className="field">
                <p> Old password </p>
                <Input type="password"
                        name="oldPassword"
                        label=""
                        value={oldPassword}
                        setInput={setOldPassword}>
                </Input>
            </div>
            <div className="field">
                <p> New password </p>
                <Input type="password"
                        name="newPassword"
                        label=""
                        value={newPassword1}
                        setInput={setNewPassword1}>
            
                </Input>
            </div>
            <div className="field">
                <p> Confirm new password</p>
                <Input type="password"
                        name="confirmation"
                        label=""
                        value={newPassword2}
                        setInput={setNewPassword2}>
            
                </Input>
            </div>
            <button type="submit" className="cta"> Save changes </button>
        </form>
);
}