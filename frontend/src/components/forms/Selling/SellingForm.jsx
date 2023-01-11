import { useState, useCallback } from "react";
import Input from "../../../components/fields/Input/Input";
import "./SellingForm.scss";

export function SellingForm() {

    const [islandName, setIslandName] = useState("");
    const [logitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [surface, setSurface] = useState("");
    const [reservePrice, setReservePrice] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <div className="selling-form">
            <form className="selling">
                <div className="form-steps">
                    <div className="step-1">
                        <span className="ball-filled"></span>
                        <p className="filled">General</p>
                    </div>
                    <span className="line-filled"></span>
                    <div className="step-2">
                        <span className="ball"></span>
                        <p>Content</p>
                    </div>
                    <span className="line"></span>
                    <div className="step-3">
                        <span className="ball"></span>
                        <p>Documents</p>
                    </div>
                </div>
                <div className="fields">
                    <Input type="text" name="island-name" label="Island Name" value={islandName} setInput={setIslandName}></Input>
                    <div className="coordinates">
                    <Input type="text" name="longitude" label="Longitude" value={logitude} setInput={setLongitude}></Input>
                    <Input type="text" name="latitude" label="Latitude" value={latitude} setInput={setLatitude}></Input>
                    </div>
                    <Input type="text" name="surface" label="Surface" value={surface} setInput={setSurface}></Input>
                    <Input type="text" name="reserve-price" label="Reserve Price" value={reservePrice} setInput={setReservePrice}></Input>
                    <Input type="date" name="start-date" label="Start Date" value={startDate} setInput={setStartDate}></Input>
                    <Input type="date" name="end-date" label="End Date" value={endDate} setInput={setEndDate}></Input>
                </div>
            </form>
        </div>
    );
}
