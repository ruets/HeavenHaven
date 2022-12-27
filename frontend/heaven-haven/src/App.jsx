import { useState } from "react";
import Input from "./components/input";

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
