import './App.css';
import AppMenu from "./components/AppMenu";
import {BrowserRouter} from "react-router-dom";
import LoginForm from "./components/login/loginForm";
import React from "react";

function App() {
    return (

            <div className="App" >
                <AppMenu/>
            </div>

    );
}

export default App;
