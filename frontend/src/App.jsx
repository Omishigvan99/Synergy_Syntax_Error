import "./App.css";
import Applayout from "./Applayout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <Applayout></Applayout>
            </Router>
        </>
    );
}

export default App;
