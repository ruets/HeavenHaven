import { useState, useCallback, useRef, useContext } from "react";
import { LoginContext } from "../../../App";
import { ForbiddenPage } from "../../../pages/ForbiddenPage/ForbiddenPage";
import { useNavigate } from "react-router-dom";
import SellingUploadImage from "../../../assets/img/selling-upload-icon.svg";
import CongratulationsIcon from "../../../assets/img/congrats-icon.png";
import Input from "../../../components/fields/Input/Input";
import config from "../../../config/config.json"
import "./SellingForm.scss";
import GetCookie from "../../../hooks/cookies/getCookie";
import axios from "axios";

export function SellingForm() {
    // Getting the user context
    const loginContext = useContext(LoginContext);

    if (!(GetCookie("userToken") !== undefined || loginContext.isUserLoggedIn)) {
        return <ForbiddenPage />;
    }

    // Global variable
    const [pagesCount, setPagesCount] = useState(0);
    const navigate = useNavigate();

    // Global functions
    const handleNextPage = useCallback(() => {
        setPagesCount(pagesCount + 1);
    }, [pagesCount, setPagesCount]);

    function validateImage(image) {
        const maxFileSizeKilo = 8192;
        const fileSizeBytes = image[0].size;
        const fileSizeKilo = Math.round(fileSizeBytes / 1024);
        if (fileSizeKilo >= maxFileSizeKilo) {
            refToErrorMessageContent.current.innerText =
                "The " + image.name + " image must be less than 8Mo.";
        } else {
            refToErrorMessageContent.current.innerText = "";
        }
    }

    function validateFile(file) {
        const maxFileSizeKilo = 8192;
        const fileSizeBytes = file[0].size;
        const fileSizeKilo = Math.round(fileSizeBytes / 1024);
        if (fileSizeKilo >= maxFileSizeKilo) {
            refToErrorMessageDocument.current.innerText =
                "The " + file.name + " image must be less than 8Mo.";
        } else {
            refToErrorMessageDocument.current.innerText = "";
        }
    }

    function validateTextarea(text, checkbox) {
        if (checkbox.checked) {
            return true;
        } else if (text.value.length < 200 || text.value.length > 625) {
            text.style.border = "1px red solid";
            return false;
        } else {
            return true;
        }
    }

    // Error Messages
    const refToErrorMessageGeneral = useRef(null);
    const refToErrorMessageContent = useRef(null);

    // Step 1

    const [islandName, setIslandName] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [surface, setSurface] = useState("");
    const [country, setCountry] = useState("");
    const [continent, setContinent] = useState("");
    const [reservePrice, setReservePrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    function validateDate() {
        if (endDate <= startDate) {
            refToErrorMessageGeneral.current.innerText =
                "The ending date must be after the starting date";
        } else {
            refToErrorMessageGeneral.current.innerText = "";
        }
    }

    function validateFirstStep(e) {
        e.preventDefault();
        validateDate();
        validateErrorMessage(refToErrorMessageGeneral.current.innerText);
    }

    const validateErrorMessage = useCallback((errorMessageGeneral) => {
        if (errorMessageGeneral === "") {
            handleNextPage();
        }
    });

    // Step 2

    // Weather
    const [weather, setWeather] = useState("");
    const [oldWeatherText, setOldWeatherText] = useState("");
    const refToWeatherInput = useRef(null);
    const refToWeatherCheckbox = useRef(null);

    const refToHiddenWeatherFileInput = useRef(null);
    const refToLabelForWeatherFileInput = useRef(null);
    const [weatherImage, setWeatherImage] = useState([]);
    const [weatherImageName, setWeatherImageName] = useState("");

    // Wildlife

    const [wildlife, setWildlife] = useState("");
    const [oldWildlifeText, setOldWildlifeText] = useState("");
    const refToWildlifeInput = useRef(null);
    const refToWildlifeCheckbox = useRef(null);

    const refToHiddenWildlifeFileInput = useRef(null);
    const refToLabelForWildlifeFileInput = useRef(null);
    const [wildlifeImage, setWildlifeImage] = useState([]);
    const [wildlifeImageName, setWildlifeImageName] = useState("");

    // Activities

    const [activities, setActivities] = useState("");
    const [oldActivitiesText, setOldActivitiesText] = useState("");
    const refToActivitiesInput = useRef(null);
    const refToActivitiesCheckbox = useRef(null);

    const refToHiddenActivitiesFileInput = useRef(null);
    const refToLabelForActivitiesFileInput = useRef(null);
    const [activitiesImage, setActivitiesImage] = useState([]);
    const [activitiesImageName, setActivitiesImageName] = useState("");

    // Location

    const [location, setLocation] = useState("");
    const [oldLocationText, setOldLocationText] = useState("");
    const refToLocationInput = useRef(null);
    const refToLocationCheckbox = useRef(null);

    const refToHiddenLocationFileInput = useRef(null);
    const refToLabelForLocationFileInput = useRef(null);
    const [locationImage, setLocationImage] = useState([]);
    const [locationImageName, setLocationImageName] = useState("");

    // Pictures

    const refToHiddenPicturesFileInput = useRef(null);
    const refToLabelForPicturesFileInput = useRef(null);
    const [picturesImage, setPicturesImage] = useState([]);
    const [picturesImageName, setPicturesImageName] = useState("");

    // Weather
    const handleWeatherCheckboxChange = useCallback(() => {
        if (refToWeatherCheckbox.current.checked) {
            setOldWeatherText(weather);
            setWeather("");
            refToWeatherInput.current.disabled = true;
        } else {
            refToWeatherInput.current.disabled = false;
            setWeather(oldWeatherText);
        }
    }, [
        refToWeatherCheckbox,
        oldWeatherText,
        setOldWeatherText,
        weather,
        setWeather,
    ]);

    const handleWeatherImageClick = useCallback(() => {
        refToHiddenWeatherFileInput.current.click();
    }, [refToHiddenWeatherFileInput]);

    const handleWeatherImageChange = useCallback(() => {
        const weatherImage = refToHiddenWeatherFileInput.current.files;
        setWeatherImageName(weatherImage[0].name);

        validateImage(weatherImage);
    }, [refToHiddenWeatherFileInput, setWeatherImageName]);

    // Wildlife
    const handleWildlifeCheckboxChange = useCallback(() => {
        if (refToWildlifeCheckbox.current.checked) {
            setOldWildlifeText(wildlife);
            setWildlife("");
            refToWildlifeInput.current.disabled = true;
        } else {
            refToWildlifeInput.current.disabled = false;
            setWildlife(oldWildlifeText);
        }
    }, [
        refToWildlifeCheckbox,
        oldWildlifeText,
        setOldWildlifeText,
        wildlife,
        setWildlife,
    ]);

    const handleWildlifeImageClick = useCallback(() => {
        refToHiddenWildlifeFileInput.current.click();
    }, [refToHiddenWildlifeFileInput]);

    const handleWildlifeImageChange = useCallback(() => {
        const wildlifeImage = refToHiddenWildlifeFileInput.current.files;
        setWildlifeImageName(wildlifeImage[0].name);

        validateImage(wildlifeImage);
    }, [refToHiddenWildlifeFileInput, setWildlifeImageName]);

    // Activities
    const handleActivitiesCheckboxChange = useCallback(() => {
        if (refToActivitiesCheckbox.current.checked) {
            setOldActivitiesText(activities);
            setActivities("");
            refToActivitiesInput.current.disabled = true;
        } else {
            refToActivitiesInput.current.disabled = false;
            setActivities(oldActivitiesText);
        }
    }, [
        refToActivitiesCheckbox,
        oldActivitiesText,
        setOldActivitiesText,
        activities,
        setActivities,
    ]);

    const handleActivitiesImageClick = useCallback(() => {
        refToHiddenActivitiesFileInput.current.click();
    }, [refToHiddenActivitiesFileInput]);

    const handleActivitiesImageChange = useCallback(() => {
        const activitiesImage = refToHiddenActivitiesFileInput.current.files;
        setActivitiesImageName(activitiesImage[0].name);

        validateImage(activitiesImage);
    }, [refToHiddenActivitiesFileInput, setActivitiesImageName]);

    // Location
    const handleLocationCheckboxChange = useCallback(() => {
        if (refToLocationCheckbox.current.checked) {
            setOldLocationText(location);
            setLocation("");
            refToLocationInput.current.disabled = true;
        } else {
            refToLocationInput.current.disabled = false;
            setLocation(oldLocationText);
        }
    }, [
        refToLocationCheckbox,
        oldLocationText,
        setOldLocationText,
        location,
        setLocation,
    ]);

    const handleLocationImageClick = useCallback(() => {
        refToHiddenLocationFileInput.current.click();
    }, [refToHiddenLocationFileInput]);

    const handleLocationImageChange = useCallback(() => {
        const locationImage = refToHiddenLocationFileInput.current.files;
        setLocationImageName(locationImage[0].name);

        validateImage(locationImage);
    }, [refToHiddenLocationFileInput, setLocationImageName]);

    // Pictures

    const handlePicturesImageClick = useCallback(() => {
        refToHiddenPicturesFileInput.current.click();
    }, [refToHiddenPicturesFileInput]);

    const handlePicturesImageChange = useCallback(() => {
        const picturesImage = refToHiddenPicturesFileInput.current.files;

        if (picturesImage.length > 5) {
            refToErrorMessageContent.current.innerText =
                "You cannot put more than 5 files in the Pictures field";
            setPicturesImageName("");
        } else {
            const num = picturesImage.length - 1;

            if (picturesImage.length > 1) {
                setPicturesImageName(
                    picturesImage[0].name + " + " + num.toString()
                );
            } else {
                setPicturesImageName(picturesImage[0].name);
            }
            validateImage(picturesImage);
        }
    }, [refToHiddenPicturesFileInput, setPicturesImageName]);

    const validateSecondStep = useCallback(
        (e) => {
            e.preventDefault();
            let isImagesValid = true;

            // Images verification
            if (
                weatherImageName === "" ||
                wildlifeImageName === "" ||
                activitiesImageName === "" ||
                locationImageName === "" ||
                picturesImageName === ""
            ) {
                isImagesValid = false;
            }

            // Text verifications
            let isTextsValid = true;

            isTextsValid =
                isTextsValid &&
                validateTextarea(
                    refToWeatherInput.current,
                    refToWeatherCheckbox.current
                );

            isTextsValid =
                isTextsValid &&
                validateTextarea(
                    refToWildlifeInput.current,
                    refToWildlifeCheckbox.current
                );

            isTextsValid =
                isTextsValid &&
                validateTextarea(
                    refToActivitiesInput.current,
                    refToActivitiesCheckbox.current
                );

            isTextsValid =
                isTextsValid &&
                validateTextarea(
                    refToLocationInput.current,
                    refToLocationCheckbox.current
                );

            if (!isImagesValid) {
                refToErrorMessageContent.current.innerText =
                    "You must put 1 image for each category, and multiple for the Pictures one.";
            }

            if (!isTextsValid) {
                refToErrorMessageContent.current.innerText =
                    "Your texts must have between 200 and 625 characters";
            }

            if (isImagesValid && isTextsValid) {
                refToErrorMessageContent.current.innerText = "";
            }

            if (refToErrorMessageContent.current.innerText === "") {
                handleNextPage();
            }
        },
        [
            weatherImageName,
            wildlifeImageName,
            activitiesImageName,
            locationImageName,
            picturesImageName,
            refToErrorMessageContent,
        ]
    );

    // Step 3

    const refToHiddenOwnershipFileInput = useRef(null);
    const refToLabelForOwnershipFileInput = useRef(null);
    const [ownershipDocument, setOwnershipDocument] = useState([]);
    const [ownershipDocumentName, setOwnershipDocumentName] = useState("");

    const refToErrorMessageDocument = useRef(null);

    const handleOwnershipDocumentClick = useCallback(() => {
        refToHiddenOwnershipFileInput.current.click();
    }, [refToHiddenOwnershipFileInput]);

    const handleOwnershipDocumentChange = useCallback(() => {
        const ownershipDocument = refToHiddenOwnershipFileInput.current.files;
        setOwnershipDocumentName(ownershipDocument[0].name);

        validateFile(ownershipDocument);
    }, [refToHiddenOwnershipFileInput, setOwnershipDocumentName]);

    const postData = async () => {
        var formData = new FormData();

        formData.append("name", islandName);
        formData.append("area", surface);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("country", country);
        formData.append("continent", continent);
        formData.append("weather", weather);
        formData.append("wildlife", wildlife);
        formData.append("activities", activities);
        formData.append("location", location);
        formData.append("price", reservePrice);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);

        formData.append("weatherImg", weatherImage[0]);
        formData.append("wildlifeImg", wildlifeImage[0]);
        formData.append("activitiesImg", activitiesImage[0]);
        formData.append("document", ownershipDocument[0]);
        for (let i = 0; i < picturesImage.length; i++) {
            formData.append("images", picturesImage[i]);
        }


        try {
            let currentUserToken = "";
        if (GetCookie("userToken") !== undefined) {
            currentUserToken = GetCookie("userToken");
        } else {
            currentUserToken = loginContext.userToken;
        }
            const headers = {
                headers: {
                    Authorization: `Bearer ${currentUserToken}`,
                    "Content-Type": 'multipart/form-data'
                }
            }
            const res = await axios.post(config.serverAddress + "/api/islands/sell", formData, headers)
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const validateThirdStep = useCallback((e) => {
        e.preventDefault();
        if (ownershipDocumentName === "") {
            refToErrorMessageDocument.current.innerText =
                "Please put your ownership in the requested field.";
        } else {
            postData();
            // handlersNextPage(pagesCount + 1);
        }
    });

    if (pagesCount === 0) {
        return (
            <div className="selling form-1">
                <form
                    className="selling"
                    onSubmit={(e) => validateFirstStep(e)}
                >
                    <div className="form-steps-selling">
                        <div className="step step-1">
                            <span className="ball filled"></span>
                            <p className="filled">General</p>
                        </div>
                        <div className="step step-2">
                            <span className="ball"></span>
                            <p>Content</p>
                        </div>
                        <div className="step step-3">
                            <span className="ball"></span>
                            <p>Documents</p>
                        </div>
                    </div>
                    <div className="fields">
                        <Input
                            type="text"
                            name="island-name"
                            label="Island Name"
                            value={islandName}
                            setInput={setIslandName}
                            required
                        ></Input>
                        <div className="coordinates">
                            <Input
                                type="text"
                                name="longitude"
                                label="Longitude"
                                value={longitude}
                                setInput={setLongitude}
                                required
                            ></Input>
                            <Input
                                type="text"
                                name="latitude"
                                label="Latitude"
                                value={latitude}
                                setInput={setLatitude}
                                required
                            ></Input>
                        </div>
                        <Input
                            type="text"
                            name="surface"
                            label="Surface"
                            value={surface}
                            setInput={setSurface}
                            required
                        ></Input>
                        <Input
                            type="text"
                            name="country"
                            label="Country"
                            value={country}
                            setInput={setCountry}
                            required
                        ></Input>
                        <Input
                            type="text"
                            name="continent"
                            label="Continent"
                            value={continent}
                            setInput={setContinent}
                            required
                        ></Input>
                        <Input
                            type="text"
                            name="reserve-price"
                            label="Reserve Price"
                            value={reservePrice}
                            setInput={setReservePrice}
                            required
                        ></Input>
                        <Input
                            type="date"
                            name="start-date"
                            label="Start Date"
                            value={startDate}
                            setInput={setStartDate}
                            required
                        ></Input>
                        <Input
                            type="date"
                            name="end-date"
                            label="End Date"
                            value={endDate}
                            setInput={setEndDate}
                            required
                        ></Input>
                    </div>
                    <p ref={refToErrorMessageGeneral} className="error"></p>
                    <button className="cta" type="submit">
                        Next
                    </button>
                </form>
            </div>
        );
    } else if (pagesCount === 1) {
        return (
            <div className="selling form-2">
                <form
                    className="selling"
                    onSubmit={(e) => validateSecondStep(e)}
                >
                    <div className="form-steps-selling">
                        <div className="step step-1">
                            <span className="ball filled"></span>
                            <p className="filled">General</p>
                        </div>
                        <div className="step step-2">
                            <span className="ball filled"></span>
                            <p className="filled">Content</p>
                        </div>
                        <div className="step step-3">
                            <span className="ball"></span>
                            <p>Documents</p>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="ctn weather">
                            <h3>Weather</h3>
                            <div className="flex">
                                <div className="left">
                                    <textarea
                                        name="weather"
                                        value={weather}
                                        placeholder="You are free to write a paragraph about the climate of your island, such as its type, the amount of precipitation or its average temperature during the different seasons. "
                                        onChange={(e) =>
                                            setWeather(e.target.value)
                                        }
                                        ref={refToWeatherInput}
                                    />
                                    <p>200 - 625 characters</p>
                                </div>
                                <div className="right">
                                    <input
                                        type="file"
                                        ref={refToHiddenWeatherFileInput}
                                        name="weatherImageUpload"
                                        onChange={(e) => {
                                            setWeatherImage(e.target.files);
                                            handleWeatherImageChange();
                                        }}
                                        accept=".jpg,.jpeg,.png"
                                        className="image"
                                    />
                                    <div
                                        className="image-bg"
                                        onClick={handleWeatherImageClick}
                                    >
                                        <div className="image-content">
                                            <img
                                                src={SellingUploadImage}
                                                alt="UploadIcon"
                                            />
                                            <p>
                                                Click here to upload the image
                                                of your property that presents
                                                the weather
                                            </p>
                                            <input
                                                type="text"
                                                name="weatherImageText"
                                                ref={
                                                    refToLabelForWeatherFileInput
                                                }
                                                value={weatherImageName}
                                                placeholder=""
                                                className="image-text"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    name="weatherCheckbox"
                                    ref={refToWeatherCheckbox}
                                    onClick={handleWeatherCheckboxChange}
                                />
                                <label htmlFor="weatherCheckbox">
                                    If you don't want to do this description
                                    yourself, we will do it for you.
                                </label>
                            </div>
                        </div>
                        <div className="ctn wildlife">
                            <h3>Wildlife</h3>
                            <div className="flex">
                                <div className="left">
                                    <textarea
                                        name="wildlife"
                                        value={wildlife}
                                        placeholder="You are free to write a paragraph about the climate of your island, such as its type, the amount of precipitation or its average temperature during the different seasons. "
                                        onChange={(e) =>
                                            setWildlife(e.target.value)
                                        }
                                        ref={refToWildlifeInput}
                                    />
                                    <p>200 - 625 characters</p>
                                </div>
                                <div className="right">
                                    <input
                                        type="file"
                                        ref={refToHiddenWildlifeFileInput}
                                        name="wildlifeImageUpload"
                                        onChange={(e) => {
                                            setWildlifeImage(e.target.files);
                                            handleWildlifeImageChange();
                                        }}
                                        accept=".jpg,.jpeg,.png"
                                        className="image"
                                    />
                                    <div
                                        className="image-bg"
                                        onClick={handleWildlifeImageClick}
                                    >
                                        <div className="image-content">
                                            <img
                                                src={SellingUploadImage}
                                                alt="UploadIcon"
                                            />
                                            <p>
                                                Click here to upload the image
                                                of your property that presents
                                                the wildlife
                                            </p>
                                            <input
                                                type="text"
                                                name="wildlifeImageText"
                                                ref={
                                                    refToLabelForWildlifeFileInput
                                                }
                                                value={wildlifeImageName}
                                                placeholder=""
                                                className="image-text"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    name="wildlifeCheckbox"
                                    ref={refToWildlifeCheckbox}
                                    onClick={handleWildlifeCheckboxChange}
                                />
                                <label htmlFor="wildlifeCheckbox">
                                    If you don't want to do this description
                                    yourself, we will do it for you.
                                </label>
                            </div>
                        </div>
                        <div className="ctn activities">
                            <h3>Activities</h3>
                            <div className="flex">
                                <div className="left">
                                    <textarea
                                        name="activities"
                                        value={activities}
                                        placeholder="You are free to write a paragraph about the climate of your island, such as its type, the amount of precipitation or its average temperature during the different seasons. "
                                        onChange={(e) =>
                                            setActivities(e.target.value)
                                        }
                                        ref={refToActivitiesInput}
                                    />
                                    <p>200 - 625 characters</p>
                                </div>
                                <div className="right">
                                    <input
                                        type="file"
                                        ref={refToHiddenActivitiesFileInput}
                                        name="activitiesImageUpload"
                                        onChange={(e) => {
                                            setActivitiesImage(e.target.files);
                                            handleActivitiesImageChange();
                                        }}
                                        accept=".jpg,.jpeg,.png"
                                        className="image"
                                    />
                                    <div
                                        className="image-bg"
                                        onClick={handleActivitiesImageClick}
                                    >
                                        <div className="image-content">
                                            <img
                                                src={SellingUploadImage}
                                                alt="UploadIcon"
                                            />
                                            <p>
                                                Click here to upload the image
                                                of your property that presents
                                                the activities
                                            </p>
                                            <input
                                                type="text"
                                                name="activitiesImageText"
                                                ref={
                                                    refToLabelForActivitiesFileInput
                                                }
                                                value={activitiesImageName}
                                                placeholder=""
                                                className="image-text"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    name="activitiesCheckbox"
                                    ref={refToActivitiesCheckbox}
                                    onClick={handleActivitiesCheckboxChange}
                                />
                                <label htmlFor="activitiesCheckbox">
                                    If you don't want to do this description
                                    yourself, we will do it for you.
                                </label>
                            </div>
                        </div>
                        <div className="ctn location">
                            <h3>Location</h3>
                            <div className="flex">
                                <div className="left">
                                    <textarea
                                        name="location"
                                        value={location}
                                        placeholder="You are free to write a paragraph about the climate of your island, such as its type, the amount of precipitation or its average temperature during the different seasons. "
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                        ref={refToLocationInput}
                                    />
                                    <p>200 - 625 characters</p>
                                </div>
                                <div className="right">
                                    <input
                                        type="file"
                                        ref={refToHiddenLocationFileInput}
                                        name="locationImageUpload"
                                        onChange={(e) => {
                                            setLocationImage(e.target.files);
                                            handleLocationImageChange();
                                        }}
                                        accept=".jpg,.jpeg,.png"
                                        className="image"
                                    />
                                    <div
                                        className="image-bg"
                                        onClick={handleLocationImageClick}
                                    >
                                        <div className="image-content">
                                            <img
                                                src={SellingUploadImage}
                                                alt="UploadIcon"
                                            />
                                            <p>
                                                Click here to upload the image
                                                of your property that presents
                                                the location
                                            </p>
                                            <input
                                                type="text"
                                                name="locationImageText"
                                                ref={
                                                    refToLabelForLocationFileInput
                                                }
                                                value={locationImageName}
                                                placeholder=""
                                                className="image-text"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    name="locationCheckbox"
                                    ref={refToLocationCheckbox}
                                    onClick={handleLocationCheckboxChange}
                                />
                                <label htmlFor="locationCheckbox">
                                    If you don't want to do this description
                                    yourself, we will do it for you.
                                </label>
                            </div>
                        </div>
                        <div className="ctn pictures">
                            <h3>Pictures</h3>
                            <div
                                className="image-bg"
                                onClick={handlePicturesImageClick}
                            >
                                <div className="image-content">
                                    <input
                                        type="file"
                                        ref={refToHiddenPicturesFileInput}
                                        name="picturesImageUpload"
                                        onChange={(e) => {
                                            setPicturesImage(e.target.files);
                                            handlePicturesImageChange();
                                        }}
                                        accept=".jpg,.jpeg,.png"
                                        multiple
                                        className="image"
                                    />
                                    <img
                                        src={SellingUploadImage}
                                        alt="UploadIcon"
                                    />
                                    <p>
                                        Click here to upload more images to
                                        present your property
                                    </p>
                                    <input
                                        type="text"
                                        name="picturesImageText"
                                        ref={refToLabelForPicturesFileInput}
                                        value={picturesImageName}
                                        placeholder=""
                                        className="image-text"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p ref={refToErrorMessageContent} className="error"></p>
                    <div className="buttons">
                        <button
                            className="cta"
                            onClick={() => setPagesCount(pagesCount - 1)}
                        >
                            Back
                        </button>
                        <button className="cta" type="submit">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        );
    } else if (pagesCount === 2) {
        return (
            <div className="selling form-3">
                <form
                    className="selling"
                    onSubmit={(e) => validateThirdStep(e)}
                >
                    <div className="form-steps-selling">
                        <div className="step step-1">
                            <span className="ball filled"></span>
                            <p className="filled">General</p>
                        </div>
                        <div className="step step-2">
                            <span className="ball filled"></span>
                            <p className="filled">Content</p>
                        </div>
                        <div className="step step-3">
                            <span className="ball filled"></span>
                            <p className="filled">Documents</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="left">
                            <p>
                                We invite you to deposit the title deed of the
                                island you wish to sell in the area opposite.
                                The latter must obviously be authentic and in
                                your name, otherwise the auction of your
                                property cannot be set up.
                            </p>
                        </div>
                        <div className="right">
                            <input
                                type="file"
                                ref={refToHiddenOwnershipFileInput}
                                name="ownershipDocumentUpload"
                                onChange={(e) => {
                                    setOwnershipDocument(e.target.files);
                                    handleOwnershipDocumentChange();
                                }}
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="Document"
                            />
                            <div
                                className="document-bg"
                                onClick={handleOwnershipDocumentClick}
                            >
                                <div className="document-content">
                                    <img
                                        src={SellingUploadImage}
                                        alt="UploadIcon"
                                    />
                                    <p>
                                        Click here to upload the ownership of
                                        your island
                                    </p>
                                    <input
                                        type="text"
                                        name="ownershipImageText"
                                        ref={refToLabelForOwnershipFileInput}
                                        value={ownershipDocumentName}
                                        placeholder=""
                                        className="document-text"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p ref={refToErrorMessageDocument} className="error"></p>
                    <div className="buttons">
                        <button
                            className="cta"
                            onClick={() => setPagesCount(pagesCount - 1)}
                        >
                            Back
                        </button>
                        <button className="cta" type="submit">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        );
    } else if (pagesCount === 3) {
        return (
            <div className="congratulations">
                <div className="content">
                    <div className="left">
                        <img src={CongratulationsIcon} alt="" />
                    </div>
                    <div className="right">
                        <h1>Congratulations</h1>
                        <p>
                            Your information, images and documents have just
                            been sent to us. We will check them as soon as
                            possible and keep you informed in order to start the
                            auction in time.{" "}
                        </p>
                        <button className="cta" onClick={() => navigate("/")}>
                            Go To Home Page
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
