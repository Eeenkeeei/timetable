import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Main from "./components/Main";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    );
}

export default App;
