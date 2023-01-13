import "./AccountSettings.scss";
import { AccountSettingsForm } from "../../../components/forms/AccountSettings/AccountSettingsForm";

function AccountSettings(props) {
    return (
        <main className="accountSettings">
            <div className="infoPart">
                <h1> Profile </h1>
                    <div className="line">
                        <div className="first">
                            <p>First name</p>
                            <p className="info">[Jeff]</p>
                        </div>
                        <div className="last">
                            <p>Last name</p>
                            <p className="info">[Boyd]</p>
                        </div>
                    </div>
                    <div className="line">
                        <div className="first">
                            <p>Email</p>
                            <p className="info">[...]</p>
                        </div>
                        <div className="last">
                            <p>Phone number</p>
                            <p className="info">[...]</p>
                        </div>
                    </div>
                    <div className="line">
                        <div className="first">
                            <p>Country</p>
                            <p className="info">[...]</p>
                        </div>
                        <div className="last">
                            <p>Street address</p>
                            <p className="info">[...]</p>
                        </div>
                    </div>
                    <div className="line">
                        <div className="first">
                            <p>Apt, suite, etc</p>
                            <p className="info">[...]</p>
                        </div>
                        <div className="last">
                            <p>City</p>
                            <p className="info">[...]</p>
                        </div>
                        <div className="last">
                            <p>ZIP Code</p>
                            <p className="small">[...]</p>
                        </div>
                    </div>
            </div>
            <div className="formPart">
            <AccountSettingsForm></AccountSettingsForm>
            </div>
        </main>
    );
}

export default AccountSettings;