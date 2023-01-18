import "./AccountSettingsForm.scss"
import Input from "../../fields/Input/Input";
import GetCookie from "../../../hooks/cookies/getCookie";
import axios from 'axios';
import config from "../../../config/config.json"
import { useState, useContext } from "react";
import { LoginContext } from "../../../App";

export function AccountSettingsForm() {
    const loginContext = useContext(LoginContext);

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")

    const changePassword = async (e) => {
        e.preventDefault();
        let currentUserToken = "";
        if (GetCookie("userToken") !== undefined) {
            currentUserToken = GetCookie("userToken");
        } else {
            currentUserToken = loginContext.userToken;
        }
        const headers = {
            headers: { Authorization: `Bearer ${currentUserToken}` }
        }
        try {
            const res = await axios.post(config.serverAddress + "/api/user/changePassword", {
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
                <Input type="text"
                        name="oldPassword"
                        label=""
                        value={oldPassword}
                        setInput={setOldPassword}>
                </Input>
            </div>
            <div className="field">
                <p> New password </p>
                <Input type="text"
                        name="newPassword"
                        label=""
                        value={newPassword1}
                        setInput={setNewPassword1}>
            
                </Input>
            </div>
            <div className="field">
                <p> Confirm new password </p>
                <Input type="text"
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