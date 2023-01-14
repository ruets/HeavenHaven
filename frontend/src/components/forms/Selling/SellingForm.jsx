import { useState, useCallback, useRef } from "react";
import Input from "../../../components/fields/Input/Input";
import "./SellingForm.scss";

export function SellingForm() {
    const [pagesCount, setPagesCount] = useState(0);

    // Step 1

    const [islandName, setIslandName] = useState("");
    const [logitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [surface, setSurface] = useState("");
    const [reservePrice, setReservePrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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

    // Activities

    const [activities, setActivities] = useState("");
    const [oldActivitiesText, setOldActivitiesText] = useState("");
    const refToActivitiesInput = useRef(null);
    const refToActivitiesCheckbox = useRef(null);

    // Location

    const [location, setLocation] = useState("");
    const [oldLocationText, setOldLocationText] = useState("");
    const refToLocationInput = useRef(null);
    const refToLocationCheckbox = useRef(null);

    // Error Message

    const [errorMessageContent, setErrorMessageContent] = useState("");

    const validateDate = useCallback(() => {
        console.log("Have to validate date here");
    });

    // Global functions

    const handleNextPage = useCallback(
        (e) => {
            e.preventDefault();
            setPagesCount(pagesCount + 1);
        },
        [pagesCount, setPagesCount]
    );

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

    if (pagesCount !== 0) {
        return (
            <div className="selling form-1">
                <form className="selling" onSubmit={(e) => handleNextPage(e)}>
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
    } else if (pagesCount !== 1) {
        return (
            <div className="selling form-2">
                <form className="selling" onSubmit={(e) => handleNextPage(e)}>
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
                                        type="text"
                                        name="weatherImageText"
                                        ref={refToLabelForWeatherFileInput}
                                        value={weatherImageName}
                                        placeholder="Click here to upload the image of your property that presents the weather"
                                        className="image-text"
                                        onClick={handleWeatherImageClick}
                                        readOnly
                                    />
                                    <input
                                        type="file"
                                        ref={refToHiddenWeatherFileInput}
                                        name="weatherImageUpload"
                                        onChange={(e) => {
                                            setWeatherImage(e.target.files);
                                            handleWeatherImageChange();
                                        }}
                                        accept=".jpg,.jpeg,.png"
                                        required
                                        className="image"
                                    />
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
                            <div className="left">
                                <h3>Wildlife</h3>
                                <div className="text">
                                    <textarea
                                        name="wildlife"
                                        value={wildlife}
                                        placeholder="You are free to write a paragraph about the fauna and flora of your island, such as the animals and plants that can be seen there. "
                                        onChange={(e) =>
                                            setWildlife(e.target.value)
                                        }
                                        ref={refToWildlifeInput}
                                    />
                                    <p>200 - 625 characters</p>
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
                            <div className="right"></div>
                        </div>
                        <div className="ctn activities">
                            <div className="left">
                                <h3>Activities</h3>
                                <div className="text">
                                    <textarea
                                        name="activities"
                                        value={activities}
                                        placeholder="You are free to write a paragraph about the activities that can be done on your island that might interest buyers. "
                                        onChange={(e) =>
                                            setActivities(e.target.value)
                                        }
                                        ref={refToActivitiesInput}
                                    />
                                    <p>200 - 625 characters</p>
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
                            <div className="right"></div>
                        </div>
                        <div className="ctn location">
                            <div className="left">
                                <h3>Location</h3>
                                <div className="text">
                                    <textarea
                                        name="location"
                                        value={location}
                                        placeholder="Feel free to write a paragraph about the location of your island, how easy it is to get there, how long it takes, the country it is attached to, the beauty of its landscapes. "
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                        ref={refToLocationInput}
                                    />
                                    <p>200 - 625 characters</p>
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
                            <div className="right"></div>
                        </div>
                        <div className="ctn pictures"></div>
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
