import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components"

import App from "./components/App"

const GlobalStyle = createGlobalStyle`
    * {
        font-family: Roboto, Arial, sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #0A0D13;
        color: white;
    }
    
    body, html {
        overflow-x: hidden;
    }
`

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <App />
    </React.StrictMode>,
    document.getElementById("root")
)