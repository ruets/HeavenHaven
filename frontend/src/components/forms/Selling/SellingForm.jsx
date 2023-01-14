import { useState, useCallback, useRef } from "react";
import Input from "../../../components/fields/Input/Input";
import "./SellingForm.scss";

export function SellingForm() {
    const [pagesCount, setPagesCount] = useState(0);

    const [islandName, setIslandName] = useState("");
    const [logitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [surface, setSurface] = useState("");
    const [reservePrice, setReservePrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [weather, setWeather] = useState("");
    const [oldWeatherText, setOldWeatherText] = useState("");
    const refToWeatherInput = useRef(null);
    const refToWeatherCheckbox = useRef(null);

    const validateDate = useCallback(() => {
        console.log("Have to validate date here");
    });

    const handleNextPage = useCallback(
        (e) => {
            e.preventDefault();
            setPagesCount(pagesCount + 1);
        },
        [pagesCount, setPagesCount]
    );

    const handleCheckboxChange = useCallback(() => {
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
                        <div className="weather">
                            <div className="left">
                                <h3>Weather</h3>
                                <input
                                    type="text"
                                    name="weather"
                                    value={weather}
                                    onChange={(e) => setWeather(e.target.value)}
                                    ref={refToWeatherInput}
                                />
                                <input
                                    type="checkbox"
                                    name="weatherCheckbox"
                                    ref={refToWeatherCheckbox}
                                    onClick={handleCheckboxChange}
                                />
                            </div>
                            <div className="right"></div>
                        </div>
                        <div className="wildlife"></div>
                        <div className="activities"></div>
                        <div className="location"></div>
                        <div className="pictures"></div>
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
