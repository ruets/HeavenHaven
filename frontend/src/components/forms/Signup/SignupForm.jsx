// React, Components
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../fields/Input/Input";
import PrivacyPolicyPDF from "../../../assets/documents/Privacy-policy-Heaven-Haven.pdf";
import TermsConditionsPDF from "../../../assets/documents/Terms-and-conditions-of-use-of-Heaven-Haven-website.pdf";
import countries from "../../../assets/data/countries.json";

// Config
import config from "../../../config/config.json";

// More
import axios from "axios";

// Icons
import EmailLogo from "../../../assets/img/email-icon.svg";
import PasswordLogo from "../../../assets/img/lock-icon.svg";
import PhoneIcon from "../../../assets/img/phone-icon.svg";
import UploadLogo from "../../../assets/img/signup-upload-icon.svg";

// Style
import "./SignupForm.scss";

export function SignupForm() {
    const navigate = useNavigate();

    const [isFirstPage, setIsFirstPage] = useState(true);

    // First name
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessageNames, setErrorMessageNames] = useState("");

    // Email
    const [email, setEmail] = useState("");
    const [errorMessageEmail, setErrorMessageEmail] = useState("");

    // Password
    const [password, setPassword] = useState("");
    const [errorMessagesPassword, setErrorMessagesPassword] = useState([]);

    const [confirmedPassword, setConfirmedPassword] = useState("");

    // Phone number
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState("");

    // Affiliation code
    const [affiliationCode, setAffiliationCode] = useState("");

    // ID card
    const hiddenFileInput = React.useRef(null);
    const labelForFileInput = React.useRef(null);

    const [idCard, setIdCard] = useState([]);

    const [idCardName, setIdCardName] = useState("");
    const [errorMessageIdCard, setErrorMessageIdCard] = useState("");

    // Address
    const [country, setCountry] = useState("");
    const [streetAdress, setStreetAdress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");

    const validateNames = useCallback(() => {
        // Check if first name and last name are valid
        const isNamesInputsValid =
            /^[a-zA-Z]+$/.test(firstName) && /^[a-zA-Z]+$/.test(lastName);
        // If names are not valid, set error message
        if (!isNamesInputsValid) {
            setErrorMessageNames("Your names must only contains letters");
        // If names are valid, clear error message
        } else {
            setErrorMessageNames("");
        }
    }, [setErrorMessageNames, firstName, lastName]);

    const validateEmail = useCallback(() => {
        // 1. Check if the input is a valid email address
        const isEmailInputValid =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        // 2. If not valid, set the error message for the email input
        if (!isEmailInputValid) {
            setErrorMessageEmail("The email adress format is not correct.");
        // 3. If valid, remove the error message for the email input
        } else {
            setErrorMessageEmail("");
        }
    }, [setErrorMessageEmail, email]);

    const validatePassword = useCallback(() => {
        let errorArray = [];
        const containsLowercaseLetter = /[a-z]/;
        const containsUpperCase = /[A-Z]/;
        const containsNumber = /[0-9]/;
        if (
            password.length > 8 && // is at least 8 characters long
            containsLowercaseLetter.test(password) && // contains a lowercase letter
            containsUpperCase.test(password) && // contains an uppercase letter
            containsNumber.test(password) // contains a number
        ) {
            setErrorMessagesPassword([]);
        } else {
            setErrorMessagesPassword([]);

            // Your password must have at least 8 characters.
            if (password.length < 8) {
            // Add an error message to the error array.
            errorArray.push(
                <p key={0}>
                    Your password must have at least 8 characters.
                </p>
            );
            }

            // check if password contains at least 1 lower case letter
            if (!containsLowercaseLetter.test(password)) {
            // if password doesn't contain a lower case letter, push this error message to the array
            errorArray.push(
                <p key={1}>
                Your password must contain at least 1 lower case
                character.
            </p>
            );
}

            // Check if password contains at least 1 upper case character.
            if (!containsUpperCase.test(password)) {
            // If not, add an error message to the errorArray.
            errorArray.push(
                <p key={2}>
                    Your password must contain at least 1 upper case
                    character.
                </p>
            );
            }

            if (!containsNumber.test(password)) { //checks to see if the password does not contain a number
                errorArray.push( //adds a message to the array
                    <p key={3}>Your password must contain at least 1 number.</p>
                );
            }

            setErrorMessagesPassword(errorArray);
        }
    }, [setErrorMessagesPassword, password]);

    // This function checks whether the phone number is valid
    const validatePhoneNumber = useCallback(() => {
    // Check if the phone number contains only numbers
    const isPhoneNumberValid = /^[0-9]+$/.test(phoneNumber);
    // If the phone number is not valid, then display an error message
    if (!isPhoneNumberValid) {
        setErrorMessagePhoneNumber(
            "The phone number must only contain numbers"
        );
    // If the phone number is valid, then display an empty message
    } else {
        setErrorMessagePhoneNumber("");
    }
}, [setErrorMessagePhoneNumber, phoneNumber]);

    const handleFillIn = useCallback((e) => {
        e.preventDefault();
        // Validate the names
        validateNames();
        // Validate the email
        validateEmail();
        // Validate the password
        validatePassword();
        // Validate the phone number
        validatePhoneNumber();
        if (
            // If there are no errors in the names
            errorMessageNames === "" &&
            // If there are no errors in the email
            errorMessageEmail === "" &&
            // If there are no errors in the password
            errorMessagesPassword.length === 0 &&
            // If there are no errors in the phone number
            errorMessagePhoneNumber === ""
        ) {
            // Move to the next page
            setIsFirstPage(false);
        }
    });

    const handleBack = useCallback(() => {
        // Set the first page to true so that the
        // next time the user clicks on the button
        // they go back to the first page.
        setIsFirstPage(true);
    });

        // 1. Define a callback function
    const handleOnUploadButtonClick = useCallback(() => {
        // 2. Call the click method on the hiddenFileInput ref
        hiddenFileInput.current.click();
    }, [hiddenFileInput]);

    const handleFileChange = useCallback(() => {
        // Get the file(s) from the input field
        const idCard = hiddenFileInput.current.files;

        // Check if the user has selected more than 2 files
        if (idCard.length > 2) {
            // If so, set an error message
            setErrorMessageIdCard("You cannot put more than 2 files");
            // Reset the name of the file to be empty
            setIdCardName("");
        } else {
            // Get the number of files selected
            const num = idCard.length - 1;

            // If the user has selected more than 1 file
            if (idCard.length > 1) {
                // Set the name of the file to be the first file name + the number of files selected
                setIdCardName(idCard[0].name + " + " + num.toString());
            } else {
                // Set the name of the file to be the first file name
                setIdCardName(idCard[0].name);
            }
            // Validate the files
            validateIdCard(idCard);
        }
    }, [setIdCardName, hiddenFileInput]);

    function validateIdCard(idCard) {
    // We assume that the max file size is 8192 KB
    const maxFileSizeKilo = 8192;

    // We loop through all the files in the idCard array
    for (let i = 0; i <= idCard.length - 1; i++) {
        // We get the size of the current file in bytes
        const fileSizeBytes = idCard[i].size;
        // We convert the file size from bytes to KB
        const fileSizeKilo = Math.round(fileSizeBytes / 1024);
        // We check if the file size is greater than the max file size
        if (fileSizeKilo >= maxFileSizeKilo) {
            // We set the error message
            setErrorMessageIdCard("The file(s) must be less than 8Mo.");
        } else {
            // We set the error message to an empty string
            setErrorMessageIdCard("");
            }
        }
    }

    const postData = async () => {
        var formData = new FormData();

        
        formData.append("email", email);
        formData.append("password1", password);
        formData.append("password2", confirmedPassword);
        formData.append("lastName", lastName);
        formData.append("firstName", firstName);
        formData.append("phone", phoneNumber);
        formData.append("address", streetAdress);
        formData.append("apt", apartment);
        formData.append("city", city);
        formData.append("zip", zipCode);
        formData.append("country", country);
        formData.append("sponsorCode", affiliationCode);
        
        for (let i = 0; i <= idCard.length - 1; i++) {
            // 1. Add the key "idCard" to the FormData object
            formData.append("idCard", idCard[i]);
        }
        
        try {
            // Display the form data in the console for debugging purposes
            console.log(formData);
            // Send a post request to the server with the form data for the new user
            let res = await axios.post(config.serverAddress + "/api/auth/signup", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // handle success
            // Display the token in an alert
            alert("Token d'authentification : " + res.data.token);
            // Redirect the user to the homepage
            navigate("/");
        } catch (error) {
            // handle error
            // Display the error in the console for debugging purposes
            console.error(error.response);
        }
    };

    const onSubmitForm = useCallback((e) => {
        e.preventDefault(); // prevent the form from sending the data with the default method
        console.log("Data verification");
        validateIdCard(hiddenFileInput.current.value);
        if (errorMessageIdCard === "") {
            console.log("Post data to API");
            postData();
        }
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
                        onBlur={validateNames}
                    ></Input>
                </div>
                <div className="error">
                    {errorMessageNames !== "" ? (
                        <p>{errorMessageNames}</p>
                    ) : null}
                </div>
                <div className="fields">
                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        icon={EmailLogo}
                        value={email}
                        setInput={setEmail}
                        onBlur={validateEmail}
                        errorMessage={errorMessageEmail}
                    ></Input>
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        icon={PasswordLogo}
                        value={password}
                        setInput={setPassword}
                        onBlur={validatePassword}
                    ></Input>
                    {errorMessagesPassword.length !== 0 ? (
                        <div className="error">{errorMessagesPassword}</div>
                    ) : null}
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
                        onBlur={validatePhoneNumber}
                        errorMessage={errorMessagePhoneNumber}
                    ></Input>
                </div>
                <div className="checkbox">
                    <input
                        type="checkbox"
                        name="accept-privacy"
                        className="checkbox"
                        required
                    />
                    <label htmlFor="accept-privacy" className="checkbox">
                        I have read and agree to the <a href={PrivacyPolicyPDF} target="_blank">Privacy Policy</a>, and heavenhaven.com <a href={TermsConditionsPDF} target="_blank">Terms of Services.</a>
                    </label>        
                </div>
                <button type="submit" className="cta">
                    Fill In More Info
                </button>
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
                            <input
                                type="text"
                                name="id-card"
                                ref={labelForFileInput}
                                value={idCardName}
                                placeholder="Id Card (max 8 Mo)"
                                className="id-card"
                                onClick={handleOnUploadButtonClick}
                                readOnly
                            />
                            <button
                                className="upload-btn"
                                onClick={handleOnUploadButtonClick}
                            >
                                <img src={UploadLogo} alt="" />
                            </button>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                name="id-card-upload"
                                onChange={(e) => {
                                    setIdCard(e.target.files);
                                    handleFileChange();
                                }}
                                accept=".jpg,.jpeg,.png"
                                required
                                multiple
                                className="id-card-upload"
                            />
                        </div>
                        {errorMessageIdCard && errorMessageIdCard !== "" ? (
                            <div className="error">
                                <p>{errorMessageIdCard}</p>
                            </div>
                        ) : null}
                    </div>
                    <select
                        name="countries"
                        id="countries-select"
                        defaultValue=""
                        onChange={(event) => setCountry(event.target.value)}
                        required
                    >
                        <option value="" disabled="disabled">
                            Country
                        </option>
                        {countries.list.map((country) => {
                            return (
                                <option key={country.code} value={country.name}>
                                    {country.name}
                                </option>
                            );
                        })}
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
                    <button className="cta" onClick={handleBack}>
                        Back
                    </button>
                    <button className="cta" type="submit">
                        Sign Up
                    </button>
                </div>
                <p className="have-account">
                    Already have an account ? <Link to={"/login"}>Log in</Link>
                </p>
            </form>
        );
    }
}
