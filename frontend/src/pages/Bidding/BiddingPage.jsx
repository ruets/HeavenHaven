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
import HeartIcon from "../../assets/img/heart-icon.svg"
import { useRef } from "react";


export function BiddingPage() {

    // Getting the user context
    const loginContext = useContext(LoginContext);

    if (!(GetCookie("userToken") !== undefined || loginContext.isUserLoggedIn)) {
        return <ForbiddenPage />;
    }

    const location = useLocation();
    const islandId = location.pathname.split('/')[2]

    const refToLikeButton = useRef(null);
    const [likeElement, setLikeElement] = useState(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
  </svg>);

    let islandData = {};
    const [islandDataState, setIslandDataState] = useState({});
    const [minimumBid, setMinimumBid] = useState("")

    const [lastBid, setLastBid] = useState({});

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false);

    const [timeLeft, setTimeLeft] = useState("")

    const [amountInput, setAmountInput] = useState("");
    const [isPaypalButtonDisabled, setIsPaypalButtonDisabled] = useState(true);

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
            if (res.data === null) {
                setMinimumBid((parseInt(islandData.auction.reservePrice)));
            } else {
                setLastBid(res.data);
                setMinimumBid((parseInt(res.data.price) + parseInt(islandData.auction.reservePrice) * 0.05).toString())
            }
        } catch (error) {
            console.error(error);
            setError(true)
        }
    }

    const handleLike = useCallback(() => {
        if (refToLikeButton.current.style.color === "red") {
            setLikeElement(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>)
        } else {
            setLikeElement(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>)
        }
    })

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

    const postBid = async () => {
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
            const res = await axios.post(config.serverAddress + "/api/auction/bid/" + islandDataState.auction.id, {price: amountInput} , headers) 
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }

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

    useEffect(() => {
        if (minimumBid === "") {
            setIsPaypalButtonDisabled(true);
        } else if (amountInput >= minimumBid) {
            setIsPaypalButtonDisabled(false);
        } else {
            setIsPaypalButtonDisabled(true);
        }
    }, [amountInput])

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
                    <img src={islandDataState.mainImg} alt="" className="main" />
                    <button onClick={handleLike} className="like">{likeElement}</button>
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
                            <p className="value">{lastBid.price ? "$" + lastBid.price : "No bid"}</p>
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
                        <Input type="number" name="amount" icon={DollarIcon} label={minimumBid ? "Minimum bid : " + minimumBid : "Minimum bid : " + islandDataState.auction.reservePrice} setInput={setAmountInput}/>
                    </div>
                    <div className="total-cost">
                        <p>Cost of the auction</p>
                        <p className="value">${Math.round((amountInput * 0.05)*100) / 100}</p>
                    </div>
                    <PayPalScriptProvider options={{"client-id": "AfcY6KBXljklDiEzDCU-V6_Tmu1OkxS7jSDeCTHS11w8Q0x22TBa-MZD12je9wg3fGV5w8cYJJHHWiN5"}}>
                    <PayPalButtons
                    disabled={isPaypalButtonDisabled}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(function (details) {
                            alert("Transaction completed by : " + details.payer.name.given_name);
                            postBid();
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