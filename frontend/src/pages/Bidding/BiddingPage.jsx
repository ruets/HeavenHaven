import { useCallback } from "react";
import GetCookie from "../../hooks/cookies/getCookie";
import PaypalLogo from "../../assets/img/paypal-logo.png"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import MainImage from "../../assets/img/presentationPage-test-img.png";
import { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../App";
import { ForbiddenPage } from "../ForbiddenPage/ForbiddenPage";
import axios from "axios"
import config from "../../config/config.json"
import { useLocation } from "react-router-dom";
import "./BiddingPage.scss";
import Input from "../../components/fields/Input/Input"
import DollarIcon from "../../assets/img/dollar-icon.svg"


export function BiddingPage() {

    // Getting the user context
    const loginContext = useContext(LoginContext);

    if (!(GetCookie("userToken") !== undefined || loginContext.isUserLoggedIn)) {
        return <ForbiddenPage />;
    }

    const location = useLocation();
    const islandId = location.pathname.split('/')[2]

    let islandData = {};
    const [islandDataState, setIslandDataState] = useState({});
    const [minimumBid, setMinimumBid] = useState("")

    const [lastBid, setLastBid] = useState({});

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false);

    const [timeLeft, setTimeLeft] = useState("")

    const [amountInput, setAmountInput] = useState(0);

    const getIslandData = async () => {
        try {
            const res = await axios.get(config.serverAddress + "/api/islands/" + islandId);
            islandData = res.data;
            setIslandDataState(res.data);
            getBidData(res.data);
        } catch (error) {
            console.error(error);
            setError(true)
        }
    }

    const getBidData = async () => {
        let currentUserToken = "";
        if (GetCookie("userToken") !== undefined) {
            currentUserToken = GetCookie("userToken");
        } else {
            currentUserToken = loginContext.userToken;
        }
        try {
            const headers = {
                headers: { Authorization: `Bearer ${currentUserToken}` }
            }
            const res = await axios.get(config.serverAddress + "/api/auction/lastBid/" + islandData.auction.id, headers);
            setLastBid(res.data);
            setMinimumBid((parseInt(res.data.price) + parseInt(islandData.auction.reservePrice) * 0.05).toString())
        } catch (error) {
            console.error(error);
            setError(true)
        }
    }

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
        getIslandData();
        setInterval(() => {
            const endingDate = new Date(Date.parse(islandData.auction.endDate.replace(/-/g, '/')));
            let currentDate = new Date();
            const currentTimeLeft = Math.abs(endingDate - currentDate);
            const currentDaysLeft = Math.ceil(currentTimeLeft / (1000 * 60 * 60 * 24)); 
            const timeString = currentDaysLeft + "d " + msToTime(currentTimeLeft);
            setTimeLeft(timeString);
            setIsLoading(false);
        }, 1000)
        setAmountInput(minimumBid);
    }, [])

    const paypalStyle = {"layout":"horizontal", "color":"blue", "tagline":"false"}

    if (error) {
        return (
            <h1>Error</h1>
        )
    } else if (isLoading) {
        return <h1>Loading</h1>
    } else {
        return (
            <div className="bidding">
                <div className="leftPart">
                    <img src={MainImage} alt="" />
                </div>
                <div className="rightPart">
                    <h1>{islandDataState.name}</h1>
                    <div className="description">
                        <h2> Description </h2>
                        <p>
                        {islandDataState.location}
                        </p>
                    </div>
                    <div className="info">
                        <div className="currentBid">
                            <p>Current bid</p>
                            <p className="value">${lastBid.price}</p>
                        </div>
                        <div>
                            <p>Pay To Bid </p>
                            <p className="value"> 0.5% </p>
                        </div>
                        <div className="timeLeft">
                        <p>Available until</p>
                        <p className="value">{timeLeft}</p>
                        </div>
                    </div>    
                    <p className="payment">Payment intermediary<img src={PaypalLogo} alt="" /></p>
                    <div className="amount">
                        <Input type="number" name="amount" icon={DollarIcon} label={"Minimum bid : " + minimumBid} value={amountInput} setInput={setAmountInput}/>
                    </div>
                    <div className="total-cost">
                        <p>Cost of the auction</p>
                        <p className="value">${Math.round((amountInput * 0.05)*100) / 100}</p>
                    </div>
                    <PayPalScriptProvider options={{"client-id": "AfcY6KBXljklDiEzDCU-V6_Tmu1OkxS7jSDeCTHS11w8Q0x22TBa-MZD12je9wg3fGV5w8cYJJHHWiN5"}}>
                    <PayPalButtons
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(function (details) {
                            alert("Transaction completed by : " + details.payer.name.given_name)
                        })
                    }}
                    style={paypalStyle}
                    />
                </PayPalScriptProvider>
                </div>
            </div>
        );
    }
}