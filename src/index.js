import React from "react";
import ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.css';
import App from "./pages/_app";

import "./styles/main.bundle.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
