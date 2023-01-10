// React, Components
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../fields/Input/Input";

// Icons
import EmailLogo from "../../../assets/img/email-icon.svg";
import PasswordLogo from "../../../assets/img/lock-icon.svg";
import PhoneIcon from "../../../assets/img/phone-icon.svg";
import UploadLogo from "../../../assets/img/signup-upload-icon.svg"

// Style
import "./SignupForm.scss";

export function SignupForm() {
    const navigate = useNavigate();

    const [isFirstPage, setIsFirstPage] = useState(true);

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [email, setEmail] = useState("");
    const [errorMessageEmail, setErrorMessageEmail] = useState("");

    const [password, setPassword] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState([]);

    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [affiliationCode, setAffiliationCode] = useState("");

    const hiddenFileInput = React.useRef(null);
    const labelForFileInput = React.useRef(null);

    const [idCard, setIdCard] = useState(undefined);
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

    const validateEmailFieldValue = useCallback(() => {
        const isEmailInputValid =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        if (!isEmailInputValid) {
            setErrorMessageEmail("The email adress format is not correct.");
        } else {
            setErrorMessageEmail("");
        }
    }, [setErrorMessageEmail, email]);

    const validatePassword = useCallback(() => {
        let errorArray = errorMessagePassword;
        if (password.length < 8) {
            errorArray.push("Your password must have at least 8 characters.")
        } else if (password.search[/a-z/i] < 1) {
            errorArray.push("Your password must contain at least 1 upper case character.")
        } else if (password.search[/A-Z/i] < 1) {
            errorArray.push("Your password must contain at least 1 lower case character.")
        } else if (password.search[/0-9/] < 1) {
            errorArray.push("Your password must contain at least 1 number.")
        }
        setErrorMessageEmail(errorArray)
    }, [setErrorMessagePassword, password])

    const handleBack = useCallback(() => {
        setIsFirstPage(true);
    })

    const handleOnUploadButtonClick = useCallback(()=> {
        hiddenFileInput.current.click();
    })

    const handleFileChange = e => {
        setIdCard(e.target.value)
        const files = e.target.files;
        const num = files.length - 1
        if (files.length > 1) {
            setIdCardName(files[0].name + " + " + num.toString());
        } else {
            setIdCardName(files[0].name);
        }
    }

    const onSubmitForm = useCallback(() => {
        console.log("Data verification");
        console.log("Post user data to API");
    });

    if (isFirstPage) {
        return (
            <form className="signup" onSubmit={handleFillIn}>
                <div className="form-steps">
                    <span className="ball-filled"></span>
                    <span className="line-unfilled"></span>
                    <span className="ball-unfilled"></span>
                </div>
                <h1>Sign Up</h1>
                <div className="doubled-inputs">
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
                <button className="cta" type="submit">Fill In More Info</button>
                <p className="have-account">
                    Already have an account ? <Link to={"/login"}>Log in</Link>
                </p>
            </form>
        );
    } else {
        return (
            <form className="signup-fill" onSubmit={onSubmitForm}>
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
                            <input type="text" name="id-card" ref={labelForFileInput} value={idCardName} placeholder="Id Card (max 8 Mo)" className="id-card" onClick={handleOnUploadButtonClick} readOnly/>
                            <button className="upload-btn" onClick={handleOnUploadButtonClick}><img src={ UploadLogo } alt="" /></button>
                            <input
                            type="file"
                            ref={hiddenFileInput}
                            name="id-card-upload"
                            label="Id Card (max 8 Mo)"
                            value={idCard}
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                            required
                            multiple
                            className="id-card-upload"
                            />
                        </div>
                    </div>
                        <select name="countries" id="countries-select" onChange={(event) => setCountry(event.target.value)} required>
                            <option value="" disabled="disabled">Country</option>
                            <option value="france">France</option>
                            <option value="united-states">United States</option>
                        </select>
                    <Input
                        type="text"
                        name="street-adress"
                        label="Street Adress"
                        value={streetAdress}
                        setInput={setStreetAdress}
                    ></Input>
                    <Input
                        type="text"
                        name="street-adress"
                        label="Apt, suite, etc (optional)"
                        value={apartment}
                        setInput={setApartment}
                        required={false}
                    ></Input>
                </div>
                <div className="doubled-inputs">
                    <Input
                        type="text"
                        name="City"
                        label="City"
                        value={city}
                        setInput={setCity}
                    ></Input>
                    <Input
                        type="text"
                        name="zip-code"
                        label="Zip Code"
                        value={zipCode}
                        setInput={setZipCode}
                    ></Input>
                    </div>
                <div className="buttons">
                    <button className="cta" onClick={handleBack}>Back</button>
                    <button className="cta" type="submit">Sign Up</button>
                </div>
                <p className="have-account">
                    Already have an account ? <Link to={"/login"}>Log in</Link>
                </p>
            </form>
        );
    }
}
