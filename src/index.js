import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";


import { AuthProviderWrapper } from "./context/auth.context"; // <== IMPORT

ReactDOM.render(
  
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  ,
  document.getElementById("root")
);

reportWebVitals();