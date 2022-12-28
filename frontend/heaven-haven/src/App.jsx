import { LoginForm } from "./pages/Login/login-form";
import "./assets/css/style.css";
import "./app.scss";

function App() {
    return (
        <div className="App">
            {/* Header with nav elements */}
            <p>Login</p>
            <LoginForm></LoginForm>
            {/* Router Outlet */}
            {/* Footer */}
        </div>
    );
}

export default App;
