import { useCallback } from "react";
import PaypalLogo from "../../assets/img/paypal-logo.png"
import HeartIcon from "../../assets/img/heart-icon.svg"
import MainImage from "../../assets/img/presentationPage-test-img.png";
import { useState, useEffect } from "react";
import "./BiddingPage.scss";

export function BiddingPage(props) {

    const [timeLeft, setTimeLeft] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const minimumBid = parseInt(props.currentBid) + parseInt(props.treshold); 

    const msToTime = useCallback((duration) => {
        var seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return hours + "h " + minutes + "min " + seconds + "s";
      }
      );

    useEffect(() => {
        var timer = setTimeout(() => {
            const endingDate = new Date(Date.parse(props.endingDate.replace(/-/g, '/')));
            let currentDate = new Date();
            const currentTimeLeft = Math.abs(endingDate - currentDate);
            const currentDaysLeft = Math.ceil(currentTimeLeft / (1000 * 60 * 60 * 24)); 
            const timeString = currentDaysLeft + "d " + msToTime(currentTimeLeft);
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
                <div className="grid">
                    <div className="left">
                        <img src={MainImage} alt="" />
                        <button><img src={HeartIcon} alt="" /></button>
                        <p>Payments : <img src={PaypalLogo} alt="" /></p>
                    </div>
                    <div className="right">
                        <div className="info">
                            <p>Current bid : ${props.currentBid}</p>
                            <p>Bidding threshold : ${props.treshold}</p>
                            <p>Minimum bid  : ${minimumBid}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}