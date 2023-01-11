import { IndexPage } from "./pages/Index/IndexPage";
import { LoginPage } from "./pages/Connection/Login/LoginPage";
import { SignupPage } from "./pages/Connection/Signup/SignupPage";
import { ForgotPage } from "./pages/Forgot/ForgotPage";
import { SellingPage } from "./pages/Selling/SellingPage/SellingPage"
import { SellingForm } from "./components/forms/Selling/SellingForm"
import { ContactPage } from "./pages/Contact/ContactPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { Header } from "./components/base/Header/Header";
import { Footer } from "./components/base/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import "./assets/scss/style.scss";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="forgot" element={<ForgotPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="sell" element={<SellingPage />} />
                <Route path="sell/form" element={<SellingForm/>}/>
                <Route path="contact" element={<ContactPage/>}/>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
