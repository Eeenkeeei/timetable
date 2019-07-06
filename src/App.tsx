import React from 'react';
import './App.css';
import {Route, Router, Switch} from "react-router";
import StartPage from "./pages/StartPage";
import {BrowserRouter, Link} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import DefPage from "./pages/DefPage";
import {Button, Menu} from "@material-ui/core";
import {Main} from "./components/Main";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    );
}

export default App;
