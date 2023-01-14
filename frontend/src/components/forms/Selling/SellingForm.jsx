import { useState, useCallback, useRef } from "react";
import SellingUploadImage from "../../../assets/img/selling-upload-icon.svg";
import Input from "../../../components/fields/Input/Input";
import "./SellingForm.scss";

export function SellingForm() {
    // Global variable
    const [pagesCount, setPagesCount] = useState(0);

    // Global functions
    const handleNextPage = useCallback(() => {
        setPagesCount(pagesCount + 1);
    }, [pagesCount, setPagesCount]);

    function validateImage(image) {
        const maxFileSizeKilo = 8192;
        const fileSizeBytes = image[0].size;
        const fileSizeKilo = Math.round(fileSizeBytes / 1024);
        if (fileSizeKilo >= maxFileSizeKilo) {
            setErrorMessageContent(
                "The " + image.name + " file must be less than 8Mo."
            );
        } else {
            setErrorMessageContent("");
        }
    }

    // Error Messages
    const [errorMessageGeneral, setErrorMessageGeneral] = useState("");
    const [errorMessageContent, setErrorMessageContent] = useState("");

    // Step 1

    const [islandName, setIslandName] = useState("");
    const [logitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [surface, setSurface] = useState("");
    const [reservePrice, setReservePrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const validateDate = useCallback(() => {
        setErrorMessageGeneral(
            "The ending date must be after the starting date"
        );
        console.log(errorMessageGeneral);
    }, [setErrorMessageGeneral, errorMessageGeneral]);

    const validateFirstStep = useCallback(
        (e) => {
            e.preventDefault();
            validateDate();
            if (errorMessageGeneral === "") {
                handleNextPage();
            }
        },
        [errorMessageGeneral, validateDate, handleNextPage]
    );

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
            setErrorMessageContent("You cannot put more than 2 files");
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
            if (
                weatherImageName === "" ||
                wildlifeImageName === "" ||
                activitiesImageName === "" ||
                locationImageName === "" ||
                picturesImageName === ""
            ) {
                setErrorMessageContent(
                    "You must put 1 image for each category, and multiple for the Pictures one."
                );
            }
            if (errorMessageContent === "") {
                handleNextPage();
            }
        },
        [
            weatherImageName,
            wildlifeImageName,
            activitiesImageName,
            locationImageName,
            picturesImageName,
            setErrorMessageContent,
            errorMessageContent,
        ]
    );

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
                                value={logitude}
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
                            <div className="grid">
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
                            <div className="grid">
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
                            <div className="grid">
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
                            <div className="grid">
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
    }
}
