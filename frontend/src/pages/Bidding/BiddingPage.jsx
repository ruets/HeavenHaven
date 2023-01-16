import { useState, useEffect } from "react";
import "./BiddingPage.scss";

export function BiddingPage(props) {

    const [timeLeft, setTimeLeft] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        var timer = setTimeout(() => {
            const endingDate = new Date(Date.parse(props.endingDate.replace(/-/g, '/')));
            let currentDate = new Date();
            const currentTimeLeft = Math.abs(endingDate - currentDate);
            const currentDaysLeft = Math.ceil(currentTimeLeft / (1000 * 60 * 60 * 24)); 
            const timeString = currentDaysLeft + "d " + currentTimeLeft;
            setTimeLeft(timeString);
            setIsLoading(false);
        }, 1000)

        return function cleanUp() {
            clearTimeout(timer);
        }
    })

    if (isLoading) {
        return <h1>Loading</h1>
    } else {
        return (
            <div className="bidding">
                <div className="title">
                <h1>{props.name}</h1>
                <h3>Time Left : {timeLeft}</h3>
                </div>
    
            </div>
        );
    }
}