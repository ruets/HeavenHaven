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
                <div className="leftPart">
                    <img src={MainImage} alt="" />
                </div>
                <div className="rightPart">
                    <h1>{props.name}</h1>
                    <div className="minimumBid">    
                        <p>Minimum bid</p>
                        <p className="value"> ${minimumBid} </p>
                    </div>
                    <div className="description">
                        <h2> Description </h2>
                        <p>
                        [Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nunc rutrum, leo quis vulputate laoreet, metus nibh efficitur nisl, vitae vehicula tellus elit vitae arcu.
                        Suspendisse blandit neque ligula, eu finibus erat venenatis in. 
                        Praesent semper euismod lacus. 
                        Fusce porta augue at nibh sollicitudin, ut porttitor est sagittis. 
                        Praesent eget turpis molestie dolor congue ullamcorper at a lacus. Mauris scelerisque feugiat metus sed accumsan. 
                        In congue et purus sit amet molestie. Vestibulum porta blandit condimentum. 
                        Proin interdum eu neque in iaculis. Suspendisse egestas, quam vestibulum pellentesque dictum, nunc ex venenatis tortor, et finibus sem tellus vel ante.]
                        </p>
                    </div>
                    <div className="info">
                        <div className="currentBid">
                            <p>Current bid</p>
                            <p className="value">${props.currentBid}</p>
                        </div>
                        <div className="timeLeft">
                        <p>Available until</p>
                        <p className="value">{timeLeft}</p>
                        </div>
                    </div>    
                    <p className="payment">Payment intermediary<img src={PaypalLogo} alt="" /></p>
                    <button type="submit" className="cta">Place a bid</button>
                </div>
            </div>
        );
    }
}