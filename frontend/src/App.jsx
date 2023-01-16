import { IndexPage } from "./pages/Index/IndexPage";
import { IslandsPage } from "./pages/Islands/IslandsPage";
import { LoginPage } from "./pages/Connection/Login/LoginPage";
import { SignupPage } from "./pages/Connection/Signup/SignupPage";
import { ForgotPage } from "./pages/Forgot/ForgotPage";
import { SellingPage } from "./pages/Selling/SellingPage/SellingPage";
import { SellingForm } from "./components/forms/Selling/SellingForm";
import { ContactPage } from "./pages/Contact/ContactPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { Header } from "./components/base/Header/Header";
import { Footer } from "./components/base/Footer/Footer";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import { IslandPresentationPage } from "./pages/IslandPresentation/IslandPresentationPage";
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "./assets/scss/style.scss";
import "./App.scss";
import { BiddingPage } from "./pages/Bidding/BiddingPage";

export const LoginContext = createContext({
    isUserLoggedIn: false,
    setIsUserLoggedIn: (auth) => {},
});

export const CookiesContext = createContext({
    isCookiesClicked: false,
    setIsCookiesClicked: (auth) => {},
    isCookiesAccepted: false,
    setIsCookiesAccepted: (auth) => {},
});

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const [isCookiesClicked, setIsCookiesClicked] = useState(false);
    const [isCookiesAccepted, setIsCookiesAccepted] = useState(false);

    return (
        <div className="App">
            <CookiesContext.Provider value={{ isCookiesClicked, setIsCookiesClicked, isCookiesAccepted, setIsCookiesAccepted }}>
            <LoginContext.Provider
                value={{ isUserLoggedIn, setIsUserLoggedIn }}
            >
                <Header />
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="forgot" element={<ForgotPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="islands/*" element={<IslandsPage />} />
                    <Route path="island/*" element={<IslandPresentationPage/>}/>
                    <Route path="bidding" element={<BiddingPage name="Little Whale Cay" endingDate="2023-02-02" currentBid="5000000" treshold="500000"/>}/>
                    <Route path="sell" element={<SellingPage />} />
                    <Route path="sell/form" element={<SellingForm />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route
                        path="presentation"
                        element={<IslandPresentationPage />}
                    />
                </Routes>
                <Footer />
            </LoginContext.Provider>
            </CookiesContext.Provider>
        </div>
    );
}

export default App;
