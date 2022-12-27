import { useState } from "react";
import Input from "./components/input";
import "./assets/css/style.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <Input type="text"></Input>
            <Input type="password"></Input>
        </div>
    );
}

export default App;
