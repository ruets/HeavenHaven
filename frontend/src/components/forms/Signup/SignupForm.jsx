// React, Components
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../fields/Input/Input";

// Icons
import EmailLogo from "../../../assets/img/email-icon.svg";
import PasswordLogo from "../../../assets/img/lock-icon.svg";
import PhoneIcon from "../../../assets/img/phone-icon.svg";

// Style
import "./SignupForm.scss";

export function SignupForm() {
    const navigate = useNavigate();

    const [isFirstPage, setIsFirstPage] = useState(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [affiliationCode, setAffiliationCode] = useState("");
    const [idCard, setIdCard] = useState(null);
    const [idCardName, setIdCardName] = useState("");
    const [country, setCountry] = useState("");
    const [streetAdress, setStreetAdress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    const handleFillIn = useCallback((e) => {
        // Check if errors in fields
        e.preventDefault();
        setIsFirstPage(false);
    })

    const handleBack = useCallback(() => {
        setIsFirstPage(true);
    })

    const onSubmitForm = useCallback(() => {
        console.log("Data verification");
        console.log("Post user data to API");
    });

    if (!isFirstPage) {
        return (
            <form className="signup" onSubmit={handleFillIn}>
                <div className="form-steps">
                    <span className="ball-filled"></span>
                    <span className="line-unfilled"></span>
                    <span className="ball-unfilled"></span>
                </div>
                <h1>Sign Up</h1>
                <div className="names">
                    <Input
                        name="first-name"
                        type="text"
                        value={firstName}
                        label="First Name"
                        setInput={setFirstName}
                    ></Input>
                    <Input
                        name="last-name"
                        type="text"
                        value={lastName}
                        label="Last Name"
                        setInput={setLastName}
                    ></Input>
                </div>
                <div className="fields">
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        icon={EmailLogo}
                        value={email}
                        setInput={setEmail}
                    ></Input>
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        icon={PasswordLogo}
                        value={password}
                        setInput={setPassword}
                    ></Input>
                    <Input
                        type="password"
                        name="confirm-password"
                        label="Confirm Password"
                        icon={PasswordLogo}
                        value={confirmedPassword}
                        setInput={setConfirmedPassword}
                    ></Input>
                    <Input
                        type="text"
                        name="phone-number"
                        label="Phone Number"
                        icon={PhoneIcon}
                        value={phoneNumber}
                        setInput={setPhoneNumber}
                    ></Input>
                </div>
                <div className="checkbox">
                <input type="checkbox"  name="accept-privacy" className="checkbox" required/>
                <label htmlFor="accept-privacy" className="checkbox">I have read and agree to the Privacy Policy, heavenhaven.com Terms & Conditions and Terms of Service</label>
                </div>
                <button type="submit">Fill In More Info</button>
                <p className="have-account">
                    Already have an account ? <Link to={"/login"}>Log in</Link>
                </p>
            </form>
        );
    } else {
        return (
            <form className="signup" onSubmit={onSubmitForm}>
                <div className="form-steps">
                    <span className="ball-filled"></span>
                    <span className="line-filled"></span>
                    <span className="ball-filled"></span>
                </div>
                <h1>Sign Up</h1>
                <div className="fields">
                    <Input
                        type="text"
                        name="affiliation"
                        label="Affiliation Code"
                        value={affiliationCode}
                        setInput={setAffiliationCode}
                    />
                    <div className="global-input">
                        <div className="input">
                            <input
                            type="file"
                            name="id-card"
                            label="Id Card (max 8 Mo)"
                            value={idCard}
                            setInput={setIdCard}
                            accept=".jpg,.jpeg,.png"
                            required
                            multiple
                            className="id-card"
                            />
                        </div>
                    </div>

                        <select name="countries" id="countries-select" onChange={(event) => props.setCountry(event.target.value)} required>
                            <option value="" selected="true" disabled="disabled">Country</option>
                            <option value="france">France</option>
                            <option value="united-states">United States</option>
                        </select>
                    <Input
                        type="text"
                        name="phone-number"
                        label="Phone Number"
                        icon={PhoneIcon}
                        value={phoneNumber}
                        setInput={setPhoneNumber}
                    ></Input>
                </div>
                <div className="buttons">
                    <button onClick={handleBack}>Back</button>
                    <button onClick={onSubmitForm}>Sign Up</button>
                </div>
                <p className="have-account">
                    Already have an account ? <Link to={"/login"}>Log in</Link>
                </p>
            </form>
        );
    }
}
