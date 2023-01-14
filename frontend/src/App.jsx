import { SellingForm } from "./components/forms/Selling/SellingForm";
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
                <Route path="sell/form" element={<SellingForm />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
